/**
 * HOMEPAGE CONTENT
 * Edit headlines and copy here. Layout lives in src/pages/HomePage.tsx.
 */

export const homeContent = {
  hero: {
    kicker: 'Design. Develop. Automate. Grow.',
    headline: 'We turn ideas into digital experiences.',
    supporting:
      'Galaxy Designers helps ambitious businesses build powerful digital experiences through websites, applications, intelligent automation, AI integration and creative marketing solutions.',
    primaryCta: { label: 'Start a project', to: '/start-a-project' },
    secondaryCta: { label: 'Explore our work', to: '/work' },
    /** Labels around the orbit illustration */
    creativeLabel: 'Creative',
    engineeringLabel: 'Engineering',
  },

  services: {
    heading: 'Two disciplines, one team',
    intro:
      'Most agencies are either creative or technical. We bring both under one roof, so your brand, website, software and marketing are planned together and work together.',
    creative: {
      title: 'Creative & growth',
      description: 'How your business looks, sounds and reaches people.',
    },
    engineering: {
      title: 'Engineering & intelligence',
      description: 'The software and systems that run behind it.',
    },
  },

  portfolio: {
    heading: 'Selected work',
    intro: 'A look at the kind of projects we take on, from industrial websites to AI-assisted operations.',
  },

  whyUs: {
    heading: 'Why businesses choose Galaxy Designers',
    intro:
      'We are a partner for the whole digital picture, not a supplier for one task. That changes how projects are planned, built and supported.',
    points: [
      { title: 'Creative thinking', description: 'Ideas grounded in your audience and market, not in passing trends.' },
      { title: 'Business-focused solutions', description: 'Every decision is measured against enquiries, sales or time saved.' },
      { title: 'Modern technology', description: 'Current, well-supported frameworks chosen for speed, security and longevity.' },
      { title: 'Custom development', description: 'Built for your process and brand instead of bent to fit a template.' },
      { title: 'AI-powered innovation', description: 'Practical AI where it saves real time, with safeguards where accuracy matters.' },
      { title: 'Reliable communication', description: 'One point of contact, regular updates and straight answers in your time zone.' },
      { title: 'End-to-end delivery', description: 'Strategy, design, development, launch and marketing from one accountable team.' },
    ],
  },

  process: {
    heading: 'How we work',
    intro: 'A clear process with decisions made early and progress you can see at every stage.',
    steps: [
      { title: 'Discovery & consultation', description: 'We learn your goals, audience, constraints and what success looks like.' },
      { title: 'Strategy & planning', description: 'Scope, structure, technology and timeline are agreed in a written plan.' },
      { title: 'Design & development', description: 'We design and build in stages, sharing working versions for feedback.' },
      { title: 'Testing & refinement', description: 'Functional, device, performance and accessibility testing before launch.' },
      { title: 'Launch & delivery', description: 'We deploy, hand over access and documentation, and train your team.' },
      { title: 'Ongoing support', description: 'Maintenance, improvements and growth support after go-live.' },
    ],
  },

  industries: {
    heading: 'Industries we work with',
    intro:
      'Our process adapts to the way each industry buys, sells and operates. These are the sectors we are set up to support.',
    list: [
      { name: 'Manufacturing', description: 'Capability websites, dealer portals and quotation automation.' },
      { name: 'Logistics', description: 'Tracking apps, customer portals and operations dashboards.' },
      { name: 'E-commerce', description: 'Online stores, UGC content and performance marketing.' },
      { name: 'Healthcare', description: 'Accessible booking journeys and patient communication.' },
      { name: 'Education', description: 'Course platforms, admissions sites and student apps.' },
      { name: 'Real Estate', description: 'Project launch campaigns, landing pages and lead routing.' },
      { name: 'Professional Services', description: 'Credibility-led websites and client portals.' },
      { name: 'Startups', description: 'MVPs, product design, pitch material and launch.' },
      { name: 'Retail', description: 'Brand identity, store marketing and loyalty apps.' },
    ],
  },

  testimonials: {
    heading: 'What clients say',
  },

  finalCta: {
    headline: "Let's build something great together.",
    supporting:
      'Have an idea, a business challenge or a project in mind? Let’s discuss how Galaxy Designers can help you move forward.',
    primary: { label: 'Start a project', to: '/start-a-project' },
    secondary: { label: 'Schedule a consultation', to: '/consultation' },
  },
} as const;
