/**
 * PORTFOLIO
 * ---------------------------------------------------------------------------
 * Every entry creates a card on /work, an entry in the filters and search,
 * a case-study page at /work/<slug> and a sitemap entry.
 *
 * ⚠ ALL ENTRIES BELOW ARE SAMPLES (isSample: true).
 *   The brands are fictional and the images are generated mockups. They show
 *   how the portfolio will look. Replace them with real projects before launch.
 *
 * To add a real project:
 *   1. Put images in client/portfolio-source/<slug>/ named cover.jpg, 01.jpg, 02.jpg …
 *      (16:10 landscape, at least 1600 px wide, works best)
 *   2. Run `npm run images` – creates optimised WebP files in public/portfolio/<slug>/
 *   3. Copy one entry below, change the details and set isSample: false
 *   4. Only add `results` you can verify.
 * ---------------------------------------------------------------------------
 */
import type { PortfolioCategory, PortfolioCategoryId, Project } from './types';

export const portfolioCategories: PortfolioCategory[] = [
  { id: 'websites', label: 'Websites' },
  { id: 'mobile-apps', label: 'Mobile Applications' },
  { id: 'web-apps', label: 'Web Applications' },
  { id: 'ui-ux', label: 'UI/UX Design' },
  { id: 'branding', label: 'Branding & Graphics' },
  { id: 'marketing', label: 'Marketing Campaigns' },
  { id: 'video-ugc', label: 'Video & UGC' },
  { id: 'automation-ai', label: 'Automation & AI' },
];

/** Image helper – all generated sample images are 1600×1000 */
const img = (slug: string, name: string, alt: string, caption?: string) => ({
  src: `/portfolio/${slug}/${name}`,
  alt,
  width: 1600,
  height: 1000,
  caption,
});

export const projects: Project[] = [
  {
    slug: 'halden-forge-industrial-website',
    title: 'Halden Forge',
    tagline: 'A corporate website that helps an industrial manufacturer win export enquiries',
    categories: ['websites', 'ui-ux'],
    industry: 'Manufacturing',
    location: 'India',
    description:
      'Sample case study: a multi-language corporate website for a forged-components manufacturer, built to present capabilities clearly to international procurement teams.',
    cover: img('halden-forge-industrial-website', 'cover', 'Halden Forge website home page shown in a desktop browser, with a dark hero image of forged steel components'),
    gallery: [
      img('halden-forge-industrial-website', '01', 'Capabilities page listing forging, machining and testing services with specifications', 'Capabilities are organised the way procurement teams compare suppliers.'),
      img('halden-forge-industrial-website', '02', 'Website shown on a tablet and phone with the request-for-quote form', 'A short request-for-quote form replaces a generic contact page.'),
    ],
    technologies: ['React', 'TypeScript', 'Headless CMS', 'Tailwind CSS'],
    services: ['website-development', 'graphic-design'],
    featured: true,
    isSample: true,
    caseStudy: {
      overview:
        'Halden Forge (a fictional brand used for this sample) manufactures forged and machined components for automotive and heavy-equipment customers. The business wanted to grow export sales, but its website was a brochure that did not answer the questions overseas buyers ask.',
      requirement:
        'A professional website that presents certifications, capabilities and capacity clearly, works for buyers in several countries and generates qualified requests for quotation.',
      problem:
        'Key information – materials, tolerances, certifications and capacity – was buried in PDFs. There was no clear way to request a quote, and the site was slow on mobile networks.',
      solution: [
        'A capabilities section structured around how procurement teams evaluate suppliers.',
        'Certification and quality pages with downloadable documents.',
        'A short, guided request-for-quote form that captures drawings and volumes.',
        'Fast, image-optimised pages that load well on mobile connections.',
      ],
      approach: [
        { title: 'Buyer interviews', description: 'Questions from sales and procurement shaped the page structure.' },
        { title: 'Industrial visual language', description: 'Dark, precise layouts with real factory photography and technical detail.' },
        { title: 'Performance first', description: 'Responsive images and minimal JavaScript for quick loading worldwide.' },
      ],
    },
  },
  {
    slug: 'tidepath-logistics-tracking-app',
    title: 'Tidepath',
    tagline: 'A shipment-tracking app for a regional logistics company',
    categories: ['mobile-apps', 'ui-ux'],
    industry: 'Logistics',
    description:
      'Sample case study: an iOS and Android app that gives business customers live shipment status, proof of delivery and instant support.',
    cover: img('tidepath-logistics-tracking-app', 'cover', 'Three phone screens of the Tidepath app showing a shipment list, live tracking map and delivery confirmation'),
    gallery: [
      img('tidepath-logistics-tracking-app', '01', 'Shipment detail screen with a timeline of pickup, transit and delivery events', 'Every shipment shows a plain-language timeline.'),
      img('tidepath-logistics-tracking-app', '02', 'Proof-of-delivery screen with signature and photo, next to a notification preview', 'Proof of delivery is available the moment a parcel is signed for.'),
    ],
    technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Push notifications'],
    services: ['mobile-app', 'web-app'],
    featured: true,
    isSample: true,
    caseStudy: {
      overview:
        'Tidepath (a fictional brand used for this sample) moves freight for retailers and manufacturers. Its customer service team spent much of the day answering “where is my shipment?” calls.',
      requirement:
        'A mobile app for business customers to track shipments, download proof of delivery and raise issues without calling.',
      problem:
        'Tracking data existed in the operations system but was not available to customers in a usable form, so every status question became a phone call.',
      solution: [
        'Live shipment list with search and filters by status and date.',
        'Event timeline and map view for each consignment.',
        'Proof of delivery with signature and photo.',
        'Push notifications for delays and deliveries.',
      ],
      approach: [
        { title: 'Customer journey mapping', description: 'We mapped the questions customers call about and designed screens to answer them.' },
        { title: 'Cross-platform build', description: 'One React Native codebase for iOS and Android.' },
        { title: 'Integration layer', description: 'An API that reads from the existing operations system without changing it.' },
      ],
    },
  },
  {
    slug: 'ledgerline-dealer-portal',
    title: 'Ledgerline',
    tagline: 'A dealer ordering portal that replaces spreadsheets and email orders',
    categories: ['web-apps', 'ui-ux'],
    industry: 'Distribution',
    description:
      'Sample case study: a web application where dealers place orders, check stock and download invoices, with a back-office dashboard for the sales team.',
    cover: img('ledgerline-dealer-portal', 'cover', 'Ledgerline dashboard with order totals, a stock table and a chart of monthly orders'),
    gallery: [
      img('ledgerline-dealer-portal', '01', 'New order screen with product search, quantities and a running order summary', 'Dealers build orders from live stock and agreed pricing.'),
      img('ledgerline-dealer-portal', '02', 'Back-office order queue with statuses and approval actions', 'The sales team approves and tracks orders in one queue.'),
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API'],
    services: ['web-app', 'automation'],
    featured: true,
    isSample: true,
    caseStudy: {
      overview:
        'Ledgerline (a fictional brand used for this sample) distributes building products through a network of dealers. Orders arrived by email, phone and WhatsApp and were re-typed into the accounting system.',
      requirement:
        'A secure portal where dealers can place orders against their own pricing, see stock and access invoices – and a dashboard for the internal team.',
      problem:
        'Manual re-entry caused delays and errors, and dealers had no visibility of stock or order status.',
      solution: [
        'Dealer accounts with individual price lists and credit limits.',
        'Order builder with live stock and order history.',
        'Approval workflow and status updates for the sales team.',
        'Invoice and statement downloads.',
      ],
      approach: [
        { title: 'Process mapping', description: 'We documented the order-to-invoice flow with the sales and accounts teams.' },
        { title: 'Data model first', description: 'Products, price lists and dealers were modelled before screens were designed.' },
        { title: 'Phased rollout', description: 'Launched with a pilot group of dealers before opening to all.' },
      ],
    },
  },
  {
    slug: 'kindred-clinic-booking-ux',
    title: 'Kindred Clinic',
    tagline: 'A calmer, faster appointment booking experience for a healthcare provider',
    categories: ['ui-ux', 'websites'],
    industry: 'Healthcare',
    description:
      'Sample case study: research-led redesign of an online appointment flow for a multi-specialty clinic, focused on clarity and accessibility.',
    cover: img('kindred-clinic-booking-ux', 'cover', 'Kindred Clinic booking flow screens showing specialty selection, doctor profiles and time slots'),
    gallery: [
      img('kindred-clinic-booking-ux', '01', 'Wireframes and user flow diagram for the booking journey', 'The booking journey was reduced to four clear steps.'),
      img('kindred-clinic-booking-ux', '02', 'Accessible component library with colour contrast and type scale', 'A component library documents accessible patterns for future work.'),
    ],
    technologies: ['Figma', 'User research', 'Design system', 'WCAG 2.2'],
    services: ['website-development', 'graphic-design'],
    isSample: true,
    caseStudy: {
      overview:
        'Kindred Clinic (a fictional brand used for this sample) offers several specialties across two locations. Many patients abandoned online booking and called reception instead.',
      requirement:
        'Redesign the online booking journey so patients of all ages can book confidently on any device.',
      problem:
        'The existing flow asked for too much information up front, used medical jargon and was difficult to use with a screen reader.',
      solution: [
        'A four-step flow: specialty, doctor, time, details.',
        'Plain-language labels and helpful guidance at each step.',
        'Accessible components meeting WCAG 2.2 AA.',
        'A reusable design system for the clinic’s digital products.',
      ],
      approach: [
        { title: 'Usability testing', description: 'Observed patients booking on the old flow to find where they struggled.' },
        { title: 'Prototype iterations', description: 'Tested clickable prototypes and refined them between rounds.' },
        { title: 'Accessibility review', description: 'Checked contrast, focus order and screen-reader behaviour.' },
      ],
    },
  },
  {
    slug: 'saffron-and-sage-brand-identity',
    title: 'Saffron & Sage',
    tagline: 'Identity and packaging for a direct-to-consumer tea brand',
    categories: ['branding', 'marketing'],
    industry: 'Food & Beverage / E-commerce',
    description:
      'Sample case study: brand identity, packaging system and launch creatives for a premium loose-leaf tea brand selling online.',
    cover: img('saffron-and-sage-brand-identity', 'cover', 'Saffron & Sage brand board with logo, colour palette and tea tin packaging'),
    gallery: [
      img('saffron-and-sage-brand-identity', '01', 'Packaging range of tea tins in different colours for each blend', 'A colour-coded packaging system makes each blend easy to find.'),
      img('saffron-and-sage-brand-identity', '02', 'Social media launch posts using the brand illustrations', 'Launch creatives extend the identity to social channels.'),
    ],
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
    services: ['graphic-design', 'digital-marketing'],
    featured: true,
    isSample: true,
    caseStudy: {
      overview:
        'Saffron & Sage (a fictional brand used for this sample) sells single-estate teas directly to consumers. The founders needed a brand that felt premium without feeling distant.',
      requirement: 'A complete identity, a packaging system for eight blends and creatives for an online launch.',
      problem:
        'The product was excellent but looked like many other tea brands, making it hard to justify a premium price online.',
      solution: [
        'A wordmark and monogram with a warm, distinctive palette.',
        'A packaging system where colour and pattern identify each blend.',
        'Brand guidelines and social templates for the in-house team.',
      ],
      approach: [
        { title: 'Positioning workshop', description: 'Defined personality, audience and price positioning with the founders.' },
        { title: 'Three creative routes', description: 'Explored distinct directions before refining one.' },
        { title: 'System thinking', description: 'Designed the packaging to scale to new blends without redesign.' },
      ],
    },
  },
  {
    slug: 'brightnest-homes-lead-campaign',
    title: 'Brightnest Homes',
    tagline: 'A lead generation campaign and landing pages for a residential developer',
    categories: ['marketing', 'websites'],
    industry: 'Real Estate',
    description:
      'Sample case study: paid search and social campaign with dedicated landing pages for a new residential project launch.',
    cover: img('brightnest-homes-lead-campaign', 'cover', 'Brightnest Homes landing page with project highlights, next to a set of social ad creatives'),
    gallery: [
      img('brightnest-homes-lead-campaign', '01', 'Grid of ad creatives in square and vertical formats', 'Ad creatives were produced in every placement size.'),
      img('brightnest-homes-lead-campaign', '02', 'Campaign reporting dashboard with leads by channel', 'A shared dashboard shows leads by channel and cost.'),
    ],
    technologies: ['Google Ads', 'Meta Ads', 'GA4', 'Google Tag Manager', 'Landing pages'],
    services: ['digital-marketing', 'website-development', 'graphic-design'],
    isSample: true,
    caseStudy: {
      overview:
        'Brightnest Homes (a fictional brand used for this sample) was launching a residential project and needed site-visit bookings from serious buyers rather than casual browsers.',
      requirement: 'A launch campaign across search and social with landing pages, tracking and lead routing to the sales team.',
      problem: 'Previous campaigns sent traffic to a general website, generating many low-quality leads and no clear view of which channels worked.',
      solution: [
        'Dedicated landing pages for each audience segment.',
        'Search and social campaigns with audience testing.',
        'Conversion tracking and instant lead alerts to sales via WhatsApp and email.',
        'A weekly report with leads, cost per lead and site-visit bookings.',
      ],
      approach: [
        { title: 'Audience definition', description: 'Defined buyer segments and the message for each.' },
        { title: 'Measurement first', description: 'Tracking and CRM routing were live before the campaign launched.' },
        { title: 'Weekly optimisation', description: 'Budget moved towards the audiences producing site visits.' },
      ],
    },
  },
  {
    slug: 'loomcraft-ugc-video-series',
    title: 'Loomcraft',
    tagline: 'A UGC video series for an apparel e-commerce brand',
    categories: ['video-ugc', 'marketing'],
    industry: 'Retail / E-commerce',
    description:
      'Sample case study: scripted creator-style videos, try-on hauls and short product demos for paid social and product pages.',
    cover: img('loomcraft-ugc-video-series', 'cover', 'Row of vertical video frames from the Loomcraft UGC series with captions'),
    gallery: [
      img('loomcraft-ugc-video-series', '01', 'Storyboard with hook, demonstration and call-to-action frames', 'Every video starts with a storyboard built around the first three seconds.'),
      img('loomcraft-ugc-video-series', '02', 'Videos shown in 9:16, 4:5 and 1:1 aspect ratios', 'Each concept was delivered in every aspect ratio.'),
    ],
    technologies: ['Premiere Pro', 'After Effects', 'CapCut'],
    services: ['ugc-video', 'digital-marketing'],
    isSample: true,
    caseStudy: {
      overview:
        'Loomcraft (a fictional brand used for this sample) sells handloom-inspired everyday clothing online. Its ads used studio photography that looked out of place in social feeds.',
      requirement: 'A monthly batch of UGC-style videos for ads, plus short clips for product pages.',
      problem: 'Polished studio creative was being skipped in feeds, and the team had no steady supply of new video to test.',
      solution: [
        'Creator-led try-on and styling videos with clear hooks.',
        'Three hook variations per concept for testing.',
        'Captioned edits in 9:16, 4:5 and 1:1.',
      ],
      approach: [
        { title: 'Hook library', description: 'Built a bank of opening lines based on customer reviews.' },
        { title: 'Creator briefing', description: 'Short, clear briefs that kept content authentic but on-message.' },
        { title: 'Modular editing', description: 'Edits structured so hooks and endings can be swapped quickly.' },
      ],
    },
  },
  {
    slug: 'quotient-ai-quotation-automation',
    title: 'Quotient',
    tagline: 'AI-assisted quotation automation for an industrial supplier',
    categories: ['automation-ai', 'web-apps'],
    industry: 'Manufacturing',
    description:
      'Sample case study: a workflow that reads emailed enquiries, extracts product requirements with AI and drafts quotations for review.',
    cover: img('quotient-ai-quotation-automation', 'cover', 'Workflow diagram connecting email inbox, AI extraction, pricing rules and a draft quotation'),
    gallery: [
      img('quotient-ai-quotation-automation', '01', 'Review screen showing an extracted enquiry next to the original email', 'The team reviews every extracted enquiry before a quote is sent.'),
      img('quotient-ai-quotation-automation', '02', 'Generated quotation PDF with line items and terms', 'Approved drafts become branded quotation PDFs.'),
    ],
    technologies: ['n8n', 'Node.js', 'LLM API', 'PostgreSQL', 'PDF generation'],
    services: ['automation', 'ai-integration', 'web-app'],
    featured: true,
    isSample: true,
    caseStudy: {
      overview:
        'Quotient (a fictional brand used for this sample) supplies industrial consumables. Its sales team received hundreds of enquiries by email, each needing a manually prepared quotation.',
      requirement: 'Reduce the manual work in preparing quotations without losing accuracy or control.',
      problem:
        'Enquiries arrived in many formats – emails, PDFs and spreadsheets – and preparing each quote involved looking up products and prices by hand.',
      solution: [
        'Automatic intake of enquiries from a shared inbox.',
        'AI extraction of products, quantities and delivery details into a structured form.',
        'Pricing rules applied automatically to create a draft quotation.',
        'A review screen where staff approve or edit every draft before it is sent.',
      ],
      approach: [
        { title: 'Real examples first', description: 'Built and tested against a set of past enquiries.' },
        { title: 'Human in the loop', description: 'Nothing is sent to customers without staff approval.' },
        { title: 'Transparent logs', description: 'Every step is logged so issues are easy to trace.' },
      ],
    },
  },
];

/* ------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* ------------------------------------------------------------------------- */

export function getProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug);
}

export function categoryLabel(id: PortfolioCategoryId) {
  return portfolioCategories.find((c) => c.id === id)?.label ?? id;
}

export const featuredProjects = projects.filter((p) => p.featured);

export function projectsInCategories(categories: PortfolioCategoryId[], excludeSlug?: string) {
  return projects.filter((p) => p.slug !== excludeSlug && p.categories.some((c) => categories.includes(c)));
}

/** Related projects: shared categories first, then shared services, then anything else. */
export function relatedProjects(project: Project, limit = 3) {
  const score = (p: Project) =>
    p.categories.filter((c) => project.categories.includes(c)).length * 2 +
    p.services.filter((s) => project.services.includes(s)).length;
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Simple, forgiving search across title, tagline, industry, technologies and categories. */
export function searchProjects(list: Project[], query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return list;
  return list.filter((p) => {
    const haystack = [
      p.title,
      p.tagline,
      p.industry,
      p.clientName ?? '',
      p.description,
      ...p.technologies,
      ...p.categories.map(categoryLabel),
    ]
      .join(' ')
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}
