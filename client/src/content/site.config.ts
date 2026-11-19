/**
 * ============================================================================
 *  GALAXY DESIGNERS – CENTRAL SITE CONFIGURATION
 * ============================================================================
 *  Every contact detail, link and integration setting lives here.
 *  Change a value once and it updates across the whole website.
 *
 *  Values marked  ⚠ PLACEHOLDER  must be replaced before going live.
 *  The production build prints a warning while any placeholder remains.
 * ============================================================================
 */

const env = import.meta.env;

export const siteConfig = {
  name: 'Galaxy Designers',
  legalName: 'Galaxy Designers', // ⚠ PLACEHOLDER – registered company name, if different
  tagline: 'Design. Develop. Automate. Grow.',
  description:
    'Galaxy Designers is a digital agency that designs and builds websites, mobile apps, web applications, business automation and AI solutions, with creative, video and marketing services for growing businesses in India and worldwide.',

  /**
   * Public address of the website, used for canonical links, the sitemap and
   * social previews. ⚠ PLACEHOLDER until the domain is registered.
   * Can also be set with the VITE_SITE_URL environment variable.
   */
  url: (env?.VITE_SITE_URL as string | undefined) || 'https://www.your-domain.com',

  contact: {
    /** Main enquiries inbox shown on the site */
    email: 'hello.galaxydesigners@gmail.com',
    /** Phone number exactly as it should be displayed */
    phoneDisplay: '+91 70031 33066',
    /** Same number in international format (used for tel: links) */
    phoneE164: '+917003133066',
    /** WhatsApp number, digits only with country code, no "+" */
    whatsappNumber: '917003133066',
    /** Message pre-filled when a visitor taps a WhatsApp button */
    whatsappMessage: "Hi Galaxy Designers, I'd like to discuss a project.",
    /** How the business location is described. ⚠ PLACEHOLDER – add a city or full address if you want one shown. */
    locationDisplay: 'Based in India, working with clients worldwide',
    /** Full postal address for the Contact page and structured data. Leave empty to hide. */
    address: '',
    /** Time zone your team works in – used to explain consultation times. */
    businessTimeZone: 'Asia/Kolkata',
    /** Typical reply time shown next to forms. Keep it honest. */
    responseTime: 'We reply to every enquiry within one business day.',
  },

  /**
   * Social profiles. Leave a value empty ('') and that icon is hidden.
   * Add the full profile URL once each profile exists.
   */
  social: {
    linkedin: '',
    instagram: '',
    behance: '',
    dribbble: '',
    x: '',
    youtube: '',
    facebook: '',
  },

  integrations: {
    /** Google Analytics 4 measurement ID (G-XXXXXXX). Analytics only loads when set and after visitor consent. */
    gaMeasurementId: (env?.VITE_GA_ID as string | undefined) || '',
    /** Google Search Console verification token (content of the meta tag). */
    googleSiteVerification: (env?.VITE_GOOGLE_SITE_VERIFICATION as string | undefined) || '',
    /** Cloudflare Turnstile site key. Spam challenge only appears when set (server needs TURNSTILE_SECRET_KEY too). */
    turnstileSiteKey: (env?.VITE_TURNSTILE_SITE_KEY as string | undefined) || '',
    /** Base URL of the enquiry API. Empty = same domain as the website (recommended). */
    apiBaseUrl: (env?.VITE_API_URL as string | undefined) || '',
  },

  features: {
    /**
     * Show the placeholder testimonials (clearly labelled as placeholders).
     * Set to false before launch if you have no real testimonials yet –
     * the section then hides itself.
     */
    showPlaceholderTestimonials: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Helpers that build links from the config */
export function whatsappLink(message: string = siteConfig.contact.whatsappMessage) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export const mailtoLink = (subject?: string) =>
  `mailto:${siteConfig.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
export const telLink = () => `tel:${siteConfig.contact.phoneE164}`;

/** Lists any placeholder values still in use (printed by the production build). */
export function findPlaceholders(): string[] {
  const issues: string[] = [];
  if (siteConfig.url.includes('your-domain')) issues.push('siteConfig.url (or VITE_SITE_URL)');
  if (siteConfig.contact.email.includes('your-domain')) issues.push('contact.email');
  if (/^\+?9?1?0+$/.test(siteConfig.contact.phoneE164.replace(/\D/g, '').replace(/^91/, '0'))) issues.push('contact.phoneE164 / phoneDisplay');
  if (/^910+$/.test(siteConfig.contact.whatsappNumber)) issues.push('contact.whatsappNumber');
  return issues;
}
