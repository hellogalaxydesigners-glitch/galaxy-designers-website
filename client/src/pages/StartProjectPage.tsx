import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { SERVICE_VALUES, type ServiceValue } from '@galaxy/shared';
import { getProject } from '@/content/projects';
import { Seo, breadcrumbJsonLd } from '@/lib/seo';
import { PageIntro } from '@/components/ui/PageIntro';
import { ProjectEnquiryForm } from '@/components/forms/ProjectEnquiryForm';
import { ContactAside } from '@/components/forms/ContactAside';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Start a project', path: '/start-a-project' },
];

const NEXT_STEPS = [
  { title: 'We read your brief', text: 'A member of the team reviews it and may reply with a few questions.' },
  { title: 'A short call', text: 'We discuss goals, constraints and options at a time that suits your time zone.' },
  { title: 'Your proposal', text: 'You receive a clear scope, timeline and cost – with no obligation.' },
];

export default function StartProjectPage() {
  const [params] = useSearchParams();
  // URL options (?type=quote&service=web-app&ref=project-slug) are applied in the browser,
  // so the pre-rendered page always matches the default form.
  const [opts, setOpts] = useState<{ type: 'project' | 'quote'; service?: ServiceValue; ref?: string }>({ type: 'project' });
  useEffect(() => {
    const service = params.get('service');
    const ref = params.get('ref');
    setOpts({
      type: params.get('type') === 'quote' ? 'quote' : 'project',
      service: service && (SERVICE_VALUES as string[]).includes(service) ? (service as ServiceValue) : undefined,
      ref: ref && getProject(ref) ? ref : undefined,
    });
  }, [params]);

  const quote = opts.type === 'quote';
  const refProject = getProject(opts.ref);

  return (
    <>
      <Seo
        title="Start a Project – Request a Proposal"
        description="Tell Galaxy Designers about your website, app, automation, AI, design or marketing project. We reply within one business day with next steps."
        path="/start-a-project"
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <PageIntro
        crumbs={crumbs}
        title={quote ? 'Request a quotation' : 'Start a project'}
        lead={
          quote
            ? 'Share what you need and we’ll come back with questions, an approach and a cost estimate.'
            : 'Tell us about your idea or challenge. It takes about two minutes, and we reply within one business day.'
        }
      />

      <section aria-label="Enquiry form" className="section-tight bg-paper">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-lg border border-line bg-white p-6 sm:p-10">
              {refProject && (
                <p className="type-small mb-6 rounded-md bg-paper px-4 py-3 text-slate">
                  Enquiring about a project like <strong className="text-ink">{refProject.title}</strong>. We’ll include this with your message.
                </p>
              )}
              <ProjectEnquiryForm key={opts.type} type={opts.type} initialService={opts.service} relatedProject={opts.ref} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <ContactAside>
              <div>
                <h2 className="type-h4 text-ink">What happens next</h2>
                <ol className="mt-4 grid gap-5">
                  {NEXT_STEPS.map((s, i) => (
                    <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">{i + 1}</span>
                      <div>
                        <h3 className="font-semibold text-ink">{s.title}</h3>
                        <p className="type-small mt-1 text-muted">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </ContactAside>
          </div>
        </div>
      </section>
    </>
  );
}
