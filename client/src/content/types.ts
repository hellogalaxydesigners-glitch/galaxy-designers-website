/**
 * Content types. Every piece of editable content on the site follows one of
 * these shapes, so the pages never need to change when content does.
 * These map directly onto CMS collections if you add a CMS later.
 */
import type { ServiceValue } from '@galaxy/shared';

/** The two halves of the brand mark: violet (creative) and blue (engineering). */
export type Side = 'creative' | 'engineering';

export type GlyphId =
  | 'website'
  | 'mobile'
  | 'webapp'
  | 'automation'
  | 'ai'
  | 'graphic'
  | 'video'
  | 'marketing';

export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Short label used in navigation and the hero orbit */
  shortTitle: string;
  side: Side;
  glyph: GlyphId;
  /** Value sent to the enquiry form when someone enquires from this page */
  enquiryValue: ServiceValue;
  /** One-line summary for listings */
  summary: string;
  /** Up to four short benefit statements shown in the overview */
  keyBenefits: string[];
  /** Opening paragraph(s) on the service page */
  intro: string[];
  /** Who this is for */
  idealFor: string[];
  /** What the client receives */
  deliverables: { title: string; description: string }[];
  /** Service-specific way of working (4 steps) */
  approach: { title: string; description: string }[];
  /** Typical tools and technologies. Optional. */
  technologies?: string[];
  faqs: Faq[];
  /** Portfolio categories shown as related work on this service page */
  relatedCategories: PortfolioCategoryId[];
  seo: { title: string; description: string };
}

export type PortfolioCategoryId =
  | 'websites'
  | 'mobile-apps'
  | 'web-apps'
  | 'ui-ux'
  | 'branding'
  | 'marketing'
  | 'video-ugc'
  | 'automation-ai';

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  label: string;
}

export interface ProjectImage {
  /** Path inside /public, e.g. /portfolio/my-project/cover */
  src: string;
  alt: string;
  /** Width / height ratio of the source image (used to reserve space and avoid layout shift) */
  width: number;
  height: number;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short line shown under the title in listings */
  tagline: string;
  /** First category is the primary one */
  categories: PortfolioCategoryId[];
  /** Optional – leave undefined if the client prefers not to be named */
  clientName?: string;
  industry: string;
  /** Country or region of the client. Optional. */
  location?: string;
  /** Short description used in cards and meta descriptions */
  description: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  liveUrl?: string;
  technologies: string[];
  services: ServiceValue[];
  /** e.g. '2026-03'. Optional. */
  completedOn?: string;
  /** Highlight on the homepage */
  featured?: boolean;
  /**
   * TRUE for sample entries created to demonstrate the layout.
   * Sample projects carry a visible "Sample project" label everywhere.
   * Delete them or set to false once replaced with real work.
   */
  isSample: boolean;
  caseStudy: {
    overview: string;
    requirement: string;
    problem: string;
    solution: string[];
    approach: { title: string; description: string }[];
    /** Only add verified results. Leave empty to hide the section. */
    results?: { label: string; value: string; note?: string }[];
  };
}

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  /** Project slug this testimonial relates to (optional) */
  project?: string;
  /** TRUE until replaced with a genuine, approved testimonial */
  isPlaceholder: boolean;
}
