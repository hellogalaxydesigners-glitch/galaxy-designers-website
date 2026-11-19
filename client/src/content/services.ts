/**
 * SERVICES
 * Each entry produces a service page at /services/<slug>, a row in the
 * services overview, a point on the homepage orbit and a sitemap entry.
 * Order here = order on the site.
 */
import type { Service } from './types';

export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  /* Creative half (violet)                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: 'website-development',
    title: 'Website Development',
    shortTitle: 'Websites',
    side: 'creative',
    glyph: 'website',
    enquiryValue: 'website-development',
    summary: 'Fast, search-friendly websites that explain what you do and turn visitors into enquiries.',
    keyBenefits: [
      'Designed around your buyers and how they decide',
      'Built for speed, accessibility and search from day one',
      'Easy for your team to update after launch',
    ],
    intro: [
      'Your website is often the first serious conversation a buyer has with your business. We design and build websites that make that conversation clear: what you offer, who it is for, why you are credible and what to do next.',
      'Every site is custom-designed and developed with modern frameworks, so it loads quickly, ranks well and stays easy to maintain as your business grows.',
    ],
    idealFor: [
      'Companies whose current site no longer reflects the business',
      'Manufacturers and B2B firms that need to win enquiries from new markets',
      'Startups launching a product or raising investment',
      'Professional service firms that rely on credibility and referrals',
    ],
    deliverables: [
      { title: 'Content structure and messaging', description: 'Page plan, user journeys and copy guidance so every page has a clear job.' },
      { title: 'Custom UI design', description: 'Desktop and mobile designs in your brand, reviewed with you before development.' },
      { title: 'Responsive development', description: 'Hand-built front end that works on every screen size and browser.' },
      { title: 'Technical SEO', description: 'Clean markup, metadata, structured data, sitemaps and fast Core Web Vitals.' },
      { title: 'Enquiry and lead capture', description: 'Forms, WhatsApp and call actions connected to your inbox or CRM.' },
      { title: 'Content management', description: 'An editing setup that suits your team, from a headless CMS to simple content files.' },
    ],
    approach: [
      { title: 'Understand the audience', description: 'We start with who buys from you, what they need to know and which pages matter most.' },
      { title: 'Structure before style', description: 'Sitemap, wireframes and key messages are agreed before visual design begins.' },
      { title: 'Design and build in increments', description: 'You review real pages early on a staging link, not just static images.' },
      { title: 'Launch and measure', description: 'We handle hosting, analytics and search setup, then review performance after launch.' },
    ],
    technologies: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'WordPress (when it fits)'],
    faqs: [
      { question: 'How long does a website take?', answer: 'Most business websites take between four and ten weeks, depending on the number of pages, content readiness and integrations. We give you a timeline after the discovery call.' },
      { question: 'Will I be able to edit the website myself?', answer: 'Yes. We set up editing that matches how often you update content – from a full CMS to simple structured content files – and show your team how to use it.' },
      { question: 'Do you write the content?', answer: 'We can. We provide content structure and guidance as standard, and can write or refine copy as part of the project.' },
      { question: 'Can you redesign our existing site without losing search rankings?', answer: 'Yes. We map existing URLs, set up redirects and preserve important metadata so search visibility carries over.' },
    ],
    relatedCategories: ['websites', 'ui-ux'],
    seo: {
      title: 'Website Development Company | Custom Business Websites',
      description: 'Custom website design and development for startups, manufacturers and growing businesses in India, the UK, US, Canada and Australia. Fast, SEO-ready and built to generate enquiries.',
    },
  },
  {
    slug: 'graphic-design',
    title: 'Creative & Graphic Design',
    shortTitle: 'Graphic design',
    side: 'creative',
    glyph: 'graphic',
    enquiryValue: 'graphic-design',
    summary: 'Brand identities, packaging and marketing design that make your business look as good as it is.',
    keyBenefits: [
      'A consistent identity across every touchpoint',
      'Print-ready and digital files your team can reuse',
      'Brand guidelines that keep future work on-brand',
    ],
    intro: [
      'Strong design builds trust before anyone reads a word. We create identities and marketing material that make your business look established, consistent and easy to recognise.',
      'From a new logo to a full brand system, every piece is designed to work across your website, social channels, sales material and print.',
    ],
    idealFor: [
      'New businesses that need an identity from scratch',
      'Established companies whose branding has become inconsistent',
      'Product brands preparing packaging or a launch',
      'Sales teams that need professional presentations and brochures',
    ],
    deliverables: [
      { title: 'Logo and identity systems', description: 'Logo suites, colour, typography and visual language.' },
      { title: 'Brand guidelines', description: 'A practical guide so anyone can produce on-brand work.' },
      { title: 'Marketing collateral', description: 'Brochures, catalogues, sales decks, flyers and trade-show material.' },
      { title: 'Packaging and labels', description: 'Packaging concepts and print-ready artwork.' },
      { title: 'Social media design', description: 'Templates and campaign creatives for every platform.' },
      { title: 'Presentation design', description: 'Investor, sales and company decks that are clear and persuasive.' },
    ],
    approach: [
      { title: 'Brief and research', description: 'We learn your positioning, audience and competitors before sketching anything.' },
      { title: 'Concept directions', description: 'You see focused creative routes with the reasoning behind each.' },
      { title: 'Refine', description: 'We develop the chosen direction with structured rounds of feedback.' },
      { title: 'Deliver the system', description: 'Final files in every format you need, plus guidelines and templates.' },
    ],
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma'],
    faqs: [
      { question: 'How many concepts will I see?', answer: 'Typically two or three focused directions for identity work. We agree the number at the start so expectations are clear.' },
      { question: 'Will I own the final designs?', answer: 'Yes. On final payment you receive full ownership of the delivered artwork and source files.' },
      { question: 'Can you work with our existing brand?', answer: 'Absolutely. Much of our design work extends an existing identity into new material.' },
    ],
    relatedCategories: ['branding', 'ui-ux', 'marketing'],
    seo: {
      title: 'Graphic Designing Services | Branding, Logo & Marketing Design',
      description: 'Graphic designing services for brand identity, logos, packaging, brochures, presentations and social media creatives. Professional design for businesses in India and worldwide.',
    },
  },
  {
    slug: 'ugc-video-production',
    title: 'UGC & Video Production',
    shortTitle: 'UGC & video',
    side: 'creative',
    glyph: 'video',
    enquiryValue: 'ugc-video',
    summary: 'Authentic UGC-style content and polished brand videos made for social feeds, ads and product pages.',
    keyBenefits: [
      'Formats planned for each platform from the start',
      'Scripts written around a clear hook and message',
      'Multiple cuts and versions for testing',
    ],
    intro: [
      'Video is where attention is, but only content that feels native to the feed gets watched. We plan, script and produce user-generated-style content and brand videos designed for how people actually scroll.',
      'Every project starts with the message and the platform, then works back to the shoot – so you get content that is built to perform, not just to look good.',
    ],
    idealFor: [
      'E-commerce and D2C brands running paid social',
      'Product companies that need demos and explainers',
      'Businesses building a presence on Instagram, YouTube or LinkedIn',
      'Brands that need a steady flow of fresh creative for ads',
    ],
    deliverables: [
      { title: 'UGC-style videos', description: 'Creator-led reviews, unboxings, testimonials-style and how-to content.' },
      { title: 'Short-form social video', description: 'Reels, Shorts and TikTok-format edits with captions.' },
      { title: 'Product and explainer videos', description: 'Clear, well-paced videos that show how a product works.' },
      { title: 'Scripts and storyboards', description: 'Hooks, scripts and shot lists agreed before production.' },
      { title: 'Editing and motion graphics', description: 'Editing, subtitles, sound design and animated titles.' },
      { title: 'Ad variations', description: 'Alternate hooks, lengths and aspect ratios for testing.' },
    ],
    approach: [
      { title: 'Message and platform', description: 'We define the audience, the single key message and where the video will run.' },
      { title: 'Script and plan', description: 'Hooks, scripts, storyboards and talent or creator briefs.' },
      { title: 'Produce', description: 'Shoot with creators or our production partners, or animate where that suits better.' },
      { title: 'Edit and version', description: 'Final edits in every aspect ratio, with variations ready for testing.' },
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'],
    faqs: [
      { question: 'Do you provide creators for UGC content?', answer: 'We can source and brief creators that suit your audience, or work with creators you already use.' },
      { question: 'Which formats do you deliver?', answer: 'Vertical 9:16, square 1:1, 4:5 and horizontal 16:9 as needed, with and without captions.' },
      { question: 'Can you produce content for international markets?', answer: 'Yes. We plan language, presenters and cultural references around the market the content is for.' },
    ],
    relatedCategories: ['video-ugc', 'marketing'],
    seo: {
      title: 'UGC Video Production & Brand Video Services',
      description: 'UGC-style videos, short-form social content, product explainers and ad creatives for e-commerce and growing brands. Scripted, produced and edited for every platform.',
    },
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing & Advertising',
    shortTitle: 'Digital marketing',
    side: 'creative',
    glyph: 'marketing',
    enquiryValue: 'digital-marketing',
    summary: 'Search, social and paid campaigns tied to measurable business goals, with reporting you can understand.',
    keyBenefits: [
      'Campaigns built around leads and sales, not vanity metrics',
      'Tracking set up properly before money is spent',
      'Plain-language reports with clear next steps',
    ],
    intro: [
      'Good marketing starts with knowing exactly what success looks like. We plan and run digital marketing that is tied to enquiries, sales and pipeline – and we set up the tracking to prove what is working.',
      'Because we also build websites and creative, campaigns, landing pages and content are planned together rather than handed between suppliers.',
    ],
    idealFor: [
      'B2B companies that need a steady flow of qualified leads',
      'E-commerce brands scaling paid acquisition',
      'Businesses entering new regions or markets',
      'Companies that have tried ads before without clear results',
    ],
    deliverables: [
      { title: 'Search engine optimisation', description: 'Technical, on-page and content SEO with keyword strategy.' },
      { title: 'Paid search and social ads', description: 'Google Ads, Meta, LinkedIn and YouTube campaigns.' },
      { title: 'Landing pages', description: 'Focused pages designed and tested for conversion.' },
      { title: 'Analytics and tracking', description: 'GA4, conversion tracking and dashboards set up correctly.' },
      { title: 'Social media management', description: 'Content calendars, publishing and community management.' },
      { title: 'Email and automation', description: 'Nurture sequences and newsletters connected to your CRM.' },
    ],
    approach: [
      { title: 'Audit and goals', description: 'We review what exists and agree measurable targets.' },
      { title: 'Strategy and tracking', description: 'Channels, budget split, messaging and measurement are planned together.' },
      { title: 'Launch and test', description: 'Campaigns go live with deliberate tests of audiences, offers and creative.' },
      { title: 'Report and improve', description: 'Regular reports in plain language and a clear plan for the next cycle.' },
    ],
    technologies: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Google Analytics 4', 'Google Tag Manager', 'Search Console', 'HubSpot'],
    faqs: [
      { question: 'What budget do I need for ads?', answer: 'It depends on your market and goals. We recommend a starting budget after reviewing your industry, competition and targets on a call.' },
      { question: 'How soon will I see results?', answer: 'Paid campaigns can produce data within weeks; SEO typically builds over several months. We set expectations for each channel at the start.' },
      { question: 'Do you lock clients into long contracts?', answer: 'No. We prefer to earn ongoing work through results and agree terms that suit the engagement.' },
    ],
    relatedCategories: ['marketing', 'video-ugc', 'websites'],
    seo: {
      title: 'Digital Marketing Agency | SEO, Google Ads & Social Media',
      description: 'Digital marketing agency for SEO, Google Ads, social media advertising, landing pages and analytics. Campaigns focused on leads and sales for businesses in India and internationally.',
    },
  },

  /* ------------------------------------------------------------------ */
  /* Engineering half (blue)                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile apps',
    side: 'engineering',
    glyph: 'mobile',
    enquiryValue: 'mobile-app',
    summary: 'iOS and Android apps for customers, field teams and operations, designed and built end to end.',
    keyBenefits: [
      'One codebase for iOS and Android where it makes sense',
      'Interfaces tested with real users before launch',
      'App store submission and release handled for you',
    ],
    intro: [
      'A good app removes effort for the people using it. We design and develop mobile applications for customers, staff and partners – from the first prototype to the app stores and beyond.',
      'We usually build cross-platform apps that share one codebase across iOS and Android, which reduces cost and keeps both versions in step. When a project needs native code, we use it.',
    ],
    idealFor: [
      'Startups launching an app-first product',
      'Businesses that want a customer app for ordering, booking or loyalty',
      'Companies digitising field work, inspections or deliveries',
      'Teams replacing paper or spreadsheet processes with a mobile tool',
    ],
    deliverables: [
      { title: 'Product discovery', description: 'Feature priorities, user flows and a clear first-release scope.' },
      { title: 'UX and UI design', description: 'Clickable prototypes tested before development begins.' },
      { title: 'Cross-platform development', description: 'iOS and Android apps built with React Native or Flutter.' },
      { title: 'Backend and APIs', description: 'Secure APIs, admin panels and integrations with your systems.' },
      { title: 'Store release', description: 'App Store and Google Play setup, submission and release management.' },
      { title: 'Support and updates', description: 'Monitoring, OS updates and new features after launch.' },
    ],
    approach: [
      { title: 'Define the first release', description: 'We focus the first version on the features that matter most.' },
      { title: 'Prototype and test', description: 'Interactive prototypes are tested with real users before code is written.' },
      { title: 'Build in sprints', description: 'You get regular test builds on your own phone throughout development.' },
      { title: 'Launch and iterate', description: 'Store release, analytics and a roadmap for the next version.' },
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Node.js', 'Firebase', 'Supabase', 'PostgreSQL'],
    faqs: [
      { question: 'Should we build native or cross-platform?', answer: 'For most business apps, cross-platform gives the best balance of cost, speed and quality. We recommend native only when the app relies heavily on device-specific features.' },
      { question: 'Do you publish the app to the stores?', answer: 'Yes. We prepare store listings, handle submission and manage releases under your developer accounts.' },
      { question: 'Who owns the source code?', answer: 'You do. Source code and accounts are transferred to you as agreed in the contract.' },
    ],
    relatedCategories: ['mobile-apps', 'ui-ux'],
    seo: {
      title: 'Mobile App Development Company | iOS & Android Apps',
      description: 'Mobile app development for iOS and Android: product discovery, UX design, React Native and Flutter development, APIs and app store release for startups and businesses worldwide.',
    },
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development',
    shortTitle: 'Web apps',
    side: 'engineering',
    glyph: 'webapp',
    enquiryValue: 'web-app',
    summary: 'Custom portals, dashboards and SaaS products that replace spreadsheets and connect your operations.',
    keyBenefits: [
      'Software shaped around your process, not the other way round',
      'Secure, scalable architecture from the first release',
      'Integrations with the tools you already use',
    ],
    intro: [
      'When off-the-shelf software does not fit, teams fall back on spreadsheets, email and workarounds. We build custom web applications that match how your business actually runs – customer portals, internal tools, dashboards and SaaS products.',
      'We design the data model and user experience together, so the software is both reliable underneath and simple for people to use.',
    ],
    idealFor: [
      'Manufacturers and distributors managing dealers, orders or quotations',
      'Operations teams running critical work on spreadsheets',
      'Founders building a SaaS product',
      'Businesses that need a secure portal for customers or partners',
    ],
    deliverables: [
      { title: 'Requirements and architecture', description: 'User roles, workflows, data model and technical plan.' },
      { title: 'UX for complex workflows', description: 'Interfaces that make dense information easy to work with.' },
      { title: 'Full-stack development', description: 'Front end, APIs, databases and authentication.' },
      { title: 'Integrations', description: 'ERP, CRM, payment, accounting and messaging integrations.' },
      { title: 'Dashboards and reporting', description: 'Live data views, exports and role-based reports.' },
      { title: 'Hosting and DevOps', description: 'Cloud hosting, backups, monitoring and deployment pipelines.' },
    ],
    approach: [
      { title: 'Map the process', description: 'We document how work happens today and where it breaks down.' },
      { title: 'Design the system', description: 'Data model, roles and screens are agreed before development.' },
      { title: 'Ship in phases', description: 'The most valuable workflows go live first, then we expand.' },
      { title: 'Operate and evolve', description: 'Monitoring, support and continuous improvement after launch.' },
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'REST & GraphQL APIs', 'AWS', 'Docker'],
    faqs: [
      { question: 'Can you integrate with our ERP or accounting software?', answer: 'Usually, yes – provided the system offers an API or data export. We review integration options during discovery.' },
      { question: 'How do you keep our data secure?', answer: 'We follow established practices: role-based access, encryption in transit, secure authentication, regular backups and least-privilege infrastructure.' },
      { question: 'Can we start small?', answer: 'Yes. We often begin with one high-value workflow, prove it in use, then build from there.' },
    ],
    relatedCategories: ['web-apps', 'automation-ai', 'ui-ux'],
    seo: {
      title: 'Custom Web Application Development | Portals, Dashboards & SaaS',
      description: 'Custom web application development: customer portals, internal tools, dashboards and SaaS products built with React, Node.js and PostgreSQL. Secure, scalable and integrated with your systems.',
    },
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    shortTitle: 'Automation',
    side: 'engineering',
    glyph: 'automation',
    enquiryValue: 'automation',
    summary: 'Workflows that move data between your tools automatically, so your team stops copying and pasting.',
    keyBenefits: [
      'Less manual data entry and fewer errors',
      'Faster responses to customers and leads',
      'Processes that run the same way every time',
    ],
    intro: [
      'Most teams lose hours every week re-typing information between email, spreadsheets, CRMs and accounting tools. We find those repetitive steps and automate them, so work moves on without someone pushing it.',
      'We use proven automation platforms where they fit and custom code where they do not – and we document everything so your team understands what runs and why.',
    ],
    idealFor: [
      'Sales teams that copy leads between forms, email and CRM',
      'Operations and finance teams producing reports by hand',
      'Businesses sending repetitive quotes, invoices or follow-ups',
      'Companies connecting several SaaS tools that do not talk to each other',
    ],
    deliverables: [
      { title: 'Process audit', description: 'A map of repetitive tasks and a prioritised list of what to automate.' },
      { title: 'Workflow automation', description: 'Automations built in tools such as Make, Zapier or n8n.' },
      { title: 'Custom integrations', description: 'Code-based integrations where no-code tools fall short.' },
      { title: 'Document generation', description: 'Automatic quotes, invoices, reports and certificates.' },
      { title: 'Notifications and alerts', description: 'Email, WhatsApp and Slack alerts triggered by real events.' },
      { title: 'Documentation and handover', description: 'Clear records of each automation and how to maintain it.' },
    ],
    approach: [
      { title: 'Find the friction', description: 'We shadow the process and measure where time goes.' },
      { title: 'Prioritise', description: 'We start with automations that save the most time for the least risk.' },
      { title: 'Build and test', description: 'Each automation is tested with real data before it goes live.' },
      { title: 'Monitor', description: 'Error alerts and logs make sure nothing fails silently.' },
    ],
    technologies: ['n8n', 'Make', 'Zapier', 'Node.js', 'Python', 'Google Workspace', 'Microsoft 365', 'WhatsApp Business API'],
    faqs: [
      { question: 'Which processes can be automated?', answer: 'Any repeatable process with clear rules and digital inputs – lead routing, reporting, document creation, data syncing, reminders and more.' },
      { question: 'Will automation replace our staff?', answer: 'Our aim is to remove repetitive work so your team can focus on judgement, customers and growth.' },
      { question: 'What happens if an automation breaks?', answer: 'We build in error handling and alerts, and offer support plans so issues are fixed quickly.' },
    ],
    relatedCategories: ['automation-ai', 'web-apps'],
    seo: {
      title: 'Business Automation Services | Workflow & Process Automation',
      description: 'Business automation services that connect your tools and remove manual work: CRM, email, WhatsApp, reporting and document automation using n8n, Make, Zapier and custom integrations.',
    },
  },
  {
    slug: 'ai-integration',
    title: 'AI Integration & AI Solutions',
    shortTitle: 'AI integration',
    side: 'engineering',
    glyph: 'ai',
    enquiryValue: 'ai-integration',
    summary: 'Practical AI features – assistants, document processing and smart search – built into your existing work.',
    keyBenefits: [
      'Focused on specific, measurable business tasks',
      'Your data handled securely and responsibly',
      'Human review built in where accuracy matters',
    ],
    intro: [
      'AI is useful when it is pointed at a clear problem. We help businesses identify where AI can genuinely save time or improve service, then build it into the tools and workflows your team already uses.',
      'That might be an assistant that answers questions from your own documents, a system that reads incoming orders and drafts quotations, or automated summaries of customer conversations.',
    ],
    idealFor: [
      'Teams handling large volumes of documents, emails or enquiries',
      'Businesses with knowledge spread across files and people',
      'Customer support teams answering repeat questions',
      'Product companies adding AI features for their users',
    ],
    deliverables: [
      { title: 'AI opportunity assessment', description: 'Where AI fits, expected value and risks – before any build.' },
      { title: 'Knowledge assistants', description: 'Chat assistants grounded in your own documents and data.' },
      { title: 'Document processing', description: 'Extracting structured data from PDFs, emails and forms.' },
      { title: 'AI in your workflows', description: 'Classification, drafting and summaries inside existing tools.' },
      { title: 'AI product features', description: 'AI capabilities designed into your app or SaaS product.' },
      { title: 'Evaluation and guardrails', description: 'Testing for accuracy, privacy safeguards and human review steps.' },
    ],
    approach: [
      { title: 'Pick the right problem', description: 'We identify tasks where AI is reliable enough to help.' },
      { title: 'Prototype with your data', description: 'A small working proof tested against real examples.' },
      { title: 'Integrate', description: 'The working solution is connected to your systems with proper safeguards.' },
      { title: 'Measure and refine', description: 'We track accuracy and usage, and improve over time.' },
    ],
    technologies: ['OpenAI API', 'Anthropic Claude API', 'Google Gemini', 'LangChain', 'Vector databases', 'Python', 'Node.js'],
    faqs: [
      { question: 'Is our data safe when using AI?', answer: 'We design solutions so your data is handled under appropriate agreements and access controls, and we avoid sending sensitive information where it is not needed.' },
      { question: 'Do we need a lot of data to start?', answer: 'Often not. Many useful solutions work with the documents and records you already have.' },
      { question: 'How do you handle AI mistakes?', answer: 'We test against real examples, add checks, and keep a human in the loop for decisions where accuracy is critical.' },
    ],
    relatedCategories: ['automation-ai', 'web-apps'],
    seo: {
      title: 'AI Integration Services | Practical AI Solutions for Business',
      description: 'AI integration services: knowledge assistants, document processing, AI-powered workflows and AI product features, built securely around your business data and tools.',
    },
  },
];

export const servicesBySide = {
  creative: services.filter((s) => s.side === 'creative'),
  engineering: services.filter((s) => s.side === 'engineering'),
};

export function getService(slug: string | undefined) {
  return services.find((s) => s.slug === slug);
}

export function serviceForEnquiryValue(value: string | undefined) {
  return services.find((s) => s.enquiryValue === value);
}
