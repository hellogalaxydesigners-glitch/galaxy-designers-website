import { Seo } from '@/lib/seo';
import { PageIntro } from '@/components/ui/PageIntro';
import { mailtoLink, siteConfig } from '@/content/site.config';

/**
 * ⚠ PLACEHOLDER PRIVACY POLICY
 * A plain-language starting point describing what this website actually does.
 * Have it reviewed by a legal professional before launch (India DPDP Act 2023,
 * UK/EU GDPR and other laws may apply depending on where your clients are).
 */
export default function PrivacyPage() {
  const { contact, legalName } = siteConfig;
  const updated = '19 November 2026';
  return (
    <>
      <Seo title="Privacy Policy" description={`How ${siteConfig.name} collects, uses and protects personal information submitted through this website.`} path="/privacy" />
      <PageIntro crumbs={[{ name: 'Home', path: '/' }, { name: 'Privacy policy', path: '/privacy' }]} title="Privacy policy" lead={`Last updated ${updated}.`} />
      <section className="section-tight bg-white">
        <div className="container-site">
          <div className="prose-site measure grid gap-10 text-slate">
            <p className="rounded-md border border-dashed border-line bg-paper px-5 py-4 text-muted">
              Draft policy – to be reviewed by a legal adviser before the website goes live.
            </p>
            <section>
              <h2 className="type-h3 text-ink">Who we are</h2>
              <p className="mt-3">
                This website is operated by {legalName} (“we”, “us”). You can contact us about privacy at{' '}
                <a className="text-violet-strong underline" href={mailtoLink('Privacy question')}>
                  {contact.email}
                </a>
                .
              </p>
            </section>
            <section>
              <h2 className="type-h3 text-ink">What we collect</h2>
              <ul>
                <li>Details you enter in our forms: name, company, email, phone or WhatsApp number, country, and information about your project or question.</li>
                <li>How you found us: the page you first visited, the referring website and campaign tags (such as utm_source), if present.</li>
                <li>Technical information: your browser type and a one-way hashed version of your IP address, used to prevent spam. We do not store your raw IP address with your enquiry.</li>
                <li>Analytics data, only if you accept analytics cookies (see below).</li>
              </ul>
            </section>
            <section>
              <h2 className="type-h3 text-ink">How we use it</h2>
              <ul>
                <li>To reply to your enquiry and discuss your project.</li>
                <li>To prepare proposals and, if you become a client, deliver our services.</li>
                <li>To understand which pages and channels bring enquiries, so we can improve the website.</li>
                <li>To protect the website against spam and abuse.</li>
              </ul>
              <p className="mt-3">We do not sell your personal information.</p>
            </section>
            <section>
              <h2 className="type-h3 text-ink">Cookies and analytics</h2>
              <p className="mt-3">
                The website works without cookies. If analytics is enabled, we ask for your consent before loading Google Analytics. You can change your choice by
                clearing this site’s data in your browser.
              </p>
            </section>
            <section>
              <h2 className="type-h3 text-ink">Who we share it with</h2>
              <p className="mt-3">
                We use trusted service providers to run this website – for hosting, database storage, email delivery, spam protection and analytics. They process data
                only on our instructions. We may also use a customer relationship management (CRM) tool to manage enquiries.
              </p>
            </section>
            <section>
              <h2 className="type-h3 text-ink">How long we keep it</h2>
              <p className="mt-3">
                We keep enquiries for as long as needed to respond and follow up, and for up to 24 months afterwards unless you become a client or ask us to delete
                them sooner.
              </p>
            </section>
            <section>
              <h2 className="type-h3 text-ink">Your rights</h2>
              <p className="mt-3">
                You can ask to see, correct or delete the personal information we hold about you, or object to how we use it. Email{' '}
                <a className="text-violet-strong underline" href={mailtoLink('Privacy request')}>
                  {contact.email}
                </a>{' '}
                and we will respond within 30 days.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
