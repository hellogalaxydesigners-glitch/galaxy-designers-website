/**
 * POST /api/enquiries – receives every website form.
 * Flow: validate → spam checks → save → respond with a reference → notify (in the background).
 */
import { Router, type Request } from 'express';
import { enquiryPayloadSchema, type EnquiryFailure, type EnquirySuccess, type ParsedEnquiry } from '@galaxy/shared';
import type { EnquiryRecord, EnquiryStore } from '../storage';
import { checkSpam } from '../lib/spam';
import { emptyToNull, hashIp, makeReference } from '../lib/util';
import { notifyNewEnquiry } from '../integrations/notify';

function toRecord(p: ParsedEnquiry, req: Request, flagged: boolean): EnquiryRecord {
  const t = p.tracking;
  const base = {
    reference: makeReference(),
    type: p.type,
    status: flagged ? ('spam_suspected' as const) : ('new' as const),
    fullName: p.data.fullName,
    companyName: emptyToNull(p.data.companyName),
    email: p.data.email.toLowerCase(),
    phone: emptyToNull(p.data.phone),
    country: emptyToNull(p.data.country),
    sourcePage: emptyToNull(t.sourcePage),
    landingPage: emptyToNull(t.landingPage),
    referrer: emptyToNull(t.referrer),
    relatedProject: emptyToNull(t.relatedProject),
    utmSource: emptyToNull(t.utmSource),
    utmMedium: emptyToNull(t.utmMedium),
    utmCampaign: emptyToNull(t.utmCampaign),
    utmTerm: emptyToNull(t.utmTerm),
    utmContent: emptyToNull(t.utmContent),
    ipHash: hashIp(req.ip),
    userAgent: emptyToNull(req.get('user-agent')?.slice(0, 400)),
    createdAt: new Date().toISOString(),
  };

  switch (p.type) {
    case 'project':
    case 'quote':
      return {
        ...base,
        service: p.data.service,
        budgetCurrency: p.data.budgetCurrency,
        budgetAmount: emptyToNull(p.data.budgetAmount),
        timeline: p.data.timeline,
        message: p.data.description,
        websiteUrl: emptyToNull(p.data.websiteUrl),
        details: {},
      };
    case 'contact':
      return {
        ...base,
        service: null,
        budgetCurrency: null,
        budgetAmount: null,
        timeline: null,
        message: p.data.message,
        websiteUrl: null,
        details: {},
      };
    case 'consultation':
      return {
        ...base,
        service: p.data.service,
        budgetCurrency: null,
        budgetAmount: null,
        timeline: null,
        message: emptyToNull(p.data.notes),
        websiteUrl: null,
        details: {
          timeZone: p.data.timeZone,
          meetingType: p.data.meetingType,
          preferredSlots: p.data.preferredSlots,
        },
      };
  }
}

/** Turns validation issues into { field: message } for the form. */
function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const path = issue.path.filter((p) => p !== 'data').join('.');
    if (path && !out[path]) out[path] = issue.message;
  }
  return out;
}

export function enquiriesRouter(store: EnquiryStore | null) {
  const router = Router();

  router.post('/', async (req, res) => {
    const fail = (status: number, body: Omit<EnquiryFailure, 'ok'>) => res.status(status).json({ ok: false, ...body } satisfies EnquiryFailure);

    const parsed = enquiryPayloadSchema.safeParse(req.body);
    if (!parsed.success) {
      return fail(422, {
        error: 'Some fields need attention. Check the highlighted fields and try again.',
        fieldErrors: fieldErrors(parsed.error.issues),
      });
    }
    const payload = parsed.data;

    const text = [payload.data.fullName, 'message' in payload.data ? payload.data.message : '', 'description' in payload.data ? payload.data.description : '', 'notes' in payload.data ? payload.data.notes : ''].join(' ');
    const verdict = await checkSpam({ ...payload.spam, ip: req.ip, text });

    if (verdict.kind === 'silent-drop') {
      console.warn(`[enquiries] dropped likely bot submission (${verdict.reason})`);
      // Answer like a normal success so bots learn nothing. Nothing is stored.
      return res.status(200).json({ ok: true, reference: makeReference() } satisfies EnquirySuccess);
    }
    if (verdict.kind === 'reject') return fail(400, { error: verdict.message });

    if (!store) {
      return fail(503, {
        error: 'Our enquiry system is temporarily unavailable. Please email or WhatsApp us instead – the details are on this page.',
      });
    }

    let saved;
    try {
      saved = await store.insert(toRecord(payload, req, verdict.kind === 'flag'));
    } catch (err) {
      console.error('[enquiries] could not save enquiry:', (err as Error).message);
      return fail(500, {
        error: 'We could not save your enquiry because of a server problem. Please try again in a minute, or email or WhatsApp us.',
      });
    }

    console.info(`[enquiries] saved ${saved.reference} (${saved.type}${saved.status === 'spam_suspected' ? ', flagged' : ''})`);
    res.status(201).json({ ok: true, reference: saved.reference } satisfies EnquirySuccess);

    // Notifications run after the visitor has their confirmation.
    void notifyNewEnquiry(store, saved);
  });

  return router;
}
