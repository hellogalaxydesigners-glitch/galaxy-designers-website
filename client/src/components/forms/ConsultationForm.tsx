/**
 * Consultation request. The visitor suggests up to three dates and a time of day
 * in their own time zone; the request is saved, the team is notified by email,
 * and the visitor can also send it straight to WhatsApp.
 * When a booking tool (Cal.com, Calendly) is chosen later, it can replace or sit beside this form.
 */
import { useEffect, useId, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import {
  MEETING_OPTIONS,
  SERVICE_OPTIONS,
  TIME_WINDOW_OPTIONS,
  consultationFormSchema,
  labelFor,
  type ConsultationFormInput,
  type ConsultationFormValues,
  type ServiceValue,
} from '@galaxy/shared';
import { Field, describedBy, TextInput, Textarea, Select, CountryOptions, Honeypot, ErrorSummary } from './fields';
import { Turnstile } from './Turnstile';
import { FormSuccess } from './FormSuccess';
import { useEnquirySubmit, useRevalidateOnChange } from './useEnquirySubmit';
import { Button, ButtonExternal } from '@/components/ui/Button';
import { mailtoLink, siteConfig, whatsappLink } from '@/content/site.config';
import { allTimeZones, convertTime, guessCountryFromTimeZone, offsetLabel, visitorTimeZone } from '@/lib/locale';

const WINDOW_START: Record<string, number> = { morning: 9, afternoon: 12, evening: 16 };
const WINDOW_END: Record<string, number> = { morning: 12, afternoon: 16, evening: 20 };

function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function prettyDate(value: string) {
  const [y, m, d] = value.split('-').map(Number);
  if (!y) return value;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
}

export function ConsultationForm({ initialService }: { initialService?: ServiceValue }) {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const [summaryFocus, setSummaryFocus] = useState(0);
  const [summary, setSummary] = useState<{ id: string; message: string }[]>([]);
  const [mounted, setMounted] = useState(false);
  const businessTz = siteConfig.contact.businessTimeZone;

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setError,
    setValue,
    getValues,
    getFieldState,
    watch,
    formState: { errors },
  } = useForm<ConsultationFormInput, unknown, ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      timeZone: 'UTC',
      meetingType: 'video',
      service: '' as ServiceValue,
      preferredSlots: [{ date: '', window: 'morning' }],
      notes: '',
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'preferredSlots' });
  const { state, submit, honeypotRef, onTurnstileToken, turnstileReset } = useEnquirySubmit<ConsultationFormInput>({
    type: 'consultation',
    setError,
  });
  useRevalidateOnChange({ watch, trigger, getFieldState });

  // Browser-only defaults: the visitor's own time zone and likely country.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (initialService && !getFieldState('service').isDirty) setValue('service', initialService);
  }, [initialService, getFieldState, setValue]);

  const timeZones = useMemo(() => {
    if (!mounted) return ['UTC'];
    const list = allTimeZones();
    const own = visitorTimeZone();
    return list.includes(own) ? list : [own, ...list];
  }, [mounted]);

  // Select the visitor's time zone once the full list is on the page.
  useEffect(() => {
    if (!mounted) return;
    if (!getFieldState('timeZone').isDirty) setValue('timeZone', visitorTimeZone());
    const guess = guessCountryFromTimeZone();
    if (guess && !getValues('country')) setValue('country', guess);
  }, [mounted, getFieldState, getValues, setValue]);
  const minDate = useMemo(() => {
    if (!mounted) return undefined;
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return isoDate(d);
  }, [mounted]);

  const values = watch();
  const tz = values.timeZone || 'UTC';

  const whatsappSummary = (reference?: string) =>
    [
      `Hi Galaxy Designers, I'd like to schedule a consultation${reference ? ` (ref ${reference})` : ''}.`,
      `Name: ${values.fullName}${values.companyName ? `, ${values.companyName}` : ''}`,
      `Topic: ${labelFor(SERVICE_OPTIONS, values.service)}`,
      `Call type: ${labelFor(MEETING_OPTIONS, values.meetingType)}`,
      `My time zone: ${tz}`,
      `Preferred: ${(values.preferredSlots ?? [])
        .filter((s) => s.date)
        .map((s) => `${prettyDate(s.date)} ${labelFor(TIME_WINDOW_OPTIONS, s.window).toLowerCase()}`)
        .join('; ')}`,
    ].join('\n');

  if (state.status === 'success') {
    return (
      <FormSuccess title="Consultation request received" reference={state.reference} whatsappMessage={whatsappSummary(state.reference)}>
        <p className="mt-4 text-slate">
          We’ll confirm a time by email{values.phone ? ' or WhatsApp' : ''}, shown in your time zone ({tz}).
        </p>
      </FormSuccess>
    );
  }

  type Name = keyof ConsultationFormInput;
  const err = (k: Name) => (errors[k] as { message?: string } | undefined)?.message;
  const a11y = (k: Name, hint = false) => ({ id: fid(k), ...describedBy(fid(k), { hint, error: err(k) }) });

  const ORDER: Name[] = ['fullName', 'companyName', 'email', 'phone', 'country', 'service', 'meetingType', 'timeZone', 'preferredSlots', 'notes'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showSummary = (errs: Record<string, any>) => {
    const list = ORDER.filter((k) => errs[k]?.message).map((k) => ({ id: fid(k), message: errs[k].message as string }));
    const slots = errs.preferredSlots;
    if (Array.isArray(slots)) {
      slots.forEach((e, i) => {
        if (e?.date?.message) list.push({ id: fid(`slot-${i}-date`), message: `Option ${i + 1}: ${e.date.message}` });
      });
    }
    for (const [k, v] of Object.entries(errs)) {
      const m = /^preferredSlots\.(\d+)\.date$/.exec(k);
      if (m) list.push({ id: fid(`slot-${m[1]}-date`), message: `Option ${+m[1] + 1}: ${(v as { message: string }).message}` });
    }
    setSummary(list);
    setSummaryFocus((n) => n + 1);
  };
  const submitting = state.status === 'submitting';
  const needsPhone = values.meetingType === 'whatsapp' || values.meetingType === 'phone';

  return (
    <form
      noValidate
      onSubmit={handleSubmit(
        async (data) => {
          setSummary([]);
          const res = await submit(data as unknown as ConsultationFormInput, { service: data.service });
          if (!res.ok) showSummary(Object.fromEntries(Object.entries(res.fieldErrors ?? {}).map(([k, v]) => [k, { message: v }])));
        },
        (errs) => showSummary(errs),
      )}
      className="relative grid gap-6 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <ErrorSummary errors={summary} message={state.status === 'error' ? state.message : undefined} focusKey={summaryFocus} />
        {state.status === 'error' && !Object.keys(errors).length && (
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonExternal href={whatsappLink(whatsappSummary())} variant="outline-light">
              Send on WhatsApp instead
            </ButtonExternal>
            <ButtonExternal href={mailtoLink('Consultation request')} variant="outline-light">
              Email us instead
            </ButtonExternal>
          </div>
        )}
      </div>
      <Honeypot ref={honeypotRef} name="company_website" />

      <Field id={fid('fullName')} label="Full name" required error={err('fullName')}>
        <TextInput {...a11y('fullName')} autoComplete="name" invalid={!!err('fullName')} {...register('fullName')} />
      </Field>
      <Field id={fid('companyName')} label="Company name" error={err('companyName')}>
        <TextInput {...a11y('companyName')} autoComplete="organization" {...register('companyName')} />
      </Field>
      <Field id={fid('email')} label="Email" required error={err('email')}>
        <TextInput {...a11y('email')} type="email" inputMode="email" autoComplete="email" invalid={!!err('email')} {...register('email')} />
      </Field>
      <Field
        id={fid('phone')}
        label="Phone / WhatsApp"
        required={needsPhone}
        hint={needsPhone ? 'Needed for a WhatsApp or phone call.' : undefined}
        error={err('phone')}
      >
        <TextInput {...a11y('phone', needsPhone)} type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 415 555 0100" invalid={!!err('phone')} {...register('phone')} />
      </Field>
      <Field id={fid('country')} label="Country" required error={err('country')}>
        <Select {...a11y('country')} autoComplete="country" placeholder="Select your country" invalid={!!err('country')} {...register('country')}>
          <CountryOptions />
        </Select>
      </Field>
      <Field id={fid('service')} label="What would you like to discuss?" required error={err('service')}>
        <Select {...a11y('service')} placeholder="Select a topic" invalid={!!err('service')} {...register('service')}>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.value === 'other' ? 'Something else / not sure yet' : o.label}
            </option>
          ))}
        </Select>
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="text-[0.9375rem] font-semibold text-ink">
          How would you like to meet?<span className="text-danger" aria-hidden> *</span>
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {MEETING_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-[#c9cddb] bg-white px-4 py-3.5 text-[0.9375rem] has-[:checked]:border-violet-strong has-[:checked]:bg-violet/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-violet/40"
            >
              <input type="radio" value={o.value} className="size-4 accent-violet-strong" {...register('meetingType')} />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        id={fid('timeZone')}
        label="Your time zone"
        required
        hint={`Detected from your device. Our team works in ${businessTz.replace('_', ' ')}${mounted ? ` (${offsetLabel(businessTz)})` : ''}.`}
        error={err('timeZone')}
        className="sm:col-span-2"
      >
        <Select {...a11y('timeZone', true)} invalid={!!err('timeZone')} {...register('timeZone')}>
          {timeZones.map((z) => (
            <option key={z} value={z}>
              {z.replace(/_/g, ' ')} {mounted ? `(${offsetLabel(z)})` : ''}
            </option>
          ))}
        </Select>
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="text-[0.9375rem] font-semibold text-ink">
          Preferred dates and times<span className="text-danger" aria-hidden> *</span>
        </legend>
        <p className="type-small mt-1 text-muted">Suggest up to three options in your time zone. We’ll confirm one.</p>
        {typeof errors.preferredSlots?.message === 'string' && (
          <p id={fid('preferredSlots')} tabIndex={-1} className="type-small mt-2 font-medium text-danger">
            {errors.preferredSlots.message}
          </p>
        )}
        <ol className="mt-4 grid gap-4">
          {fields.map((f, i) => {
            const slot = values.preferredSlots?.[i];
            const dateErr = Array.isArray(errors.preferredSlots) ? errors.preferredSlots[i]?.date?.message : undefined;
            const showConversion = mounted && slot?.date && slot.window && tz !== businessTz;
            return (
              <li key={f.id} className="rounded-md border border-line bg-paper/60 p-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                  <div>
                    <label htmlFor={fid(`slot-${i}-date`)} className="text-sm font-semibold text-ink">
                      Option {i + 1}: date
                    </label>
                    <TextInput
                      id={fid(`slot-${i}-date`)}
                      type="date"
                      min={minDate}
                      className="mt-1.5"
                      invalid={!!dateErr}
                      aria-invalid={dateErr ? true : undefined}
                      aria-describedby={dateErr ? fid(`slot-${i}-err`) : undefined}
                      {...register(`preferredSlots.${i}.date` as const)}
                    />
                  </div>
                  <div>
                    <label htmlFor={fid(`slot-${i}-window`)} className="text-sm font-semibold text-ink">
                      Time of day
                    </label>
                    <Select id={fid(`slot-${i}-window`)} className="mt-1.5" {...register(`preferredSlots.${i}.window` as const)}>
                      {TIME_WINDOW_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  {fields.length > 1 && (
                    <Button variant="outline-light" onClick={() => remove(i)} className="h-12" icon={<Trash2 aria-hidden className="size-4" />}>
                      Remove<span className="sr-only"> option {i + 1}</span>
                    </Button>
                  )}
                </div>
                {dateErr && (
                  <p id={fid(`slot-${i}-err`)} className="type-small mt-2 font-medium text-danger">
                    {dateErr}
                  </p>
                )}
                {showConversion && (
                  <p className="type-small mt-2 text-muted">
                    That is {convertTime(slot.date, WINDOW_START[slot.window], tz, businessTz)} – {convertTime(slot.date, WINDOW_END[slot.window], tz, businessTz)} for our team.
                  </p>
                )}
              </li>
            );
          })}
        </ol>
        {fields.length < 3 && (
          <Button
            variant="outline-light"
            className="mt-4"
            onClick={() => append({ date: '', window: 'afternoon' })}
            icon={<Plus aria-hidden className="size-4" />}
          >
            Add another option
          </Button>
        )}
      </fieldset>

      <Field id={fid('notes')} label="Anything we should know beforehand?" error={err('notes')} className="sm:col-span-2">
        <Textarea {...a11y('notes')} rows={4} {...register('notes')} />
      </Field>

      <div className="sm:col-span-2">
        <Turnstile onToken={onTurnstileToken} resetKey={turnstileReset} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button size="lg" type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            'Request consultation'
          )}
        </Button>
        <p className="type-small text-muted">We’ll confirm the time by email.</p>
      </div>
    </form>
  );
}
