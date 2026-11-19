/** Main navigation. Services are added automatically from services.ts. */
export const mainNav = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;

export const footerNav = {
  company: [
    { label: 'About us', to: '/about' },
    { label: 'Our work', to: '/work' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy policy', to: '/privacy' },
  ],
  start: [
    { label: 'Start a project', to: '/start-a-project' },
    { label: 'Request a quotation', to: '/start-a-project?type=quote' },
    { label: 'Schedule a consultation', to: '/consultation' },
  ],
} as const;
