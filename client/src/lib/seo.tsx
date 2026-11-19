/**
 * Page metadata (title, description, canonical, Open Graph, structured data).
 *
 * - During the build, each page is rendered to static HTML and the values set
 *   by <Seo> are collected through SeoContext and written into <head>, so
 *   search engines and social networks see complete metadata without JS.
 * - In the browser, <Seo> updates document.head when the route changes.
 */
import { createContext, useContext, useEffect } from 'react';
import { siteConfig } from '@/content/site.config';

export interface SeoProps {
  /** Page title. " | Galaxy Designers" is appended unless `rawTitle` is set. */
  title: string;
  rawTitle?: boolean;
  description: string;
  /** Path of the page, e.g. /services/ai-integration */
  path: string;
  /** Social share image path or URL (1200×630). Defaults to /og/default.jpg */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  /** Structured data objects (schema.org) */
  jsonLd?: Record<string, unknown>[];
  noindex?: boolean;
}

export interface SeoCollector {
  data: SeoProps | null;
}

export const SeoContext = createContext<SeoCollector | null>(null);

const DEFAULT_IMAGE = '/og/default.jpg';

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function fullTitle(p: Pick<SeoProps, 'title' | 'rawTitle'>) {
  return p.rawTitle ? p.title : `${p.title} | ${siteConfig.name}`;
}

/** Normalises the canonical path: no trailing slash except the home page. */
function canonicalPath(path: string) {
  const clean = path.split(/[?#]/)[0] || '/';
  return clean !== '/' ? clean.replace(/\/+$/, '') : '/';
}

interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  content?: string;
}

function buildTags(p: SeoProps): HeadTag[] {
  const url = absoluteUrl(canonicalPath(p.path));
  const image = absoluteUrl(p.image ?? DEFAULT_IMAGE);
  const title = fullTitle(p);
  const tags: HeadTag[] = [
    { tag: 'meta', attrs: { name: 'description', content: p.description } },
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: siteConfig.name } },
    { tag: 'meta', attrs: { property: 'og:type', content: p.type ?? 'website' } },
    { tag: 'meta', attrs: { property: 'og:title', content: title } },
    { tag: 'meta', attrs: { property: 'og:description', content: p.description } },
    { tag: 'meta', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: p.imageAlt ?? `${siteConfig.name}` } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'en_GB' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: p.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ];
  if (p.noindex) tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, follow' } });
  if (siteConfig.integrations.googleSiteVerification) {
    tags.push({ tag: 'meta', attrs: { name: 'google-site-verification', content: siteConfig.integrations.googleSiteVerification } });
  }
  for (const obj of p.jsonLd ?? []) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      // Escape "<" so JSON can never close the script tag.
      content: JSON.stringify(obj).replace(/</g, '\\u003c'),
    });
  }
  return tags;
}

const escapeAttr = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Serialises metadata to HTML for the prerender step. */
export function renderHeadToString(p: SeoProps): string {
  const lines = [`<title>${escapeAttr(fullTitle(p))}</title>`];
  for (const t of buildTags(p)) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
      .join(' ');
    lines.push(t.tag === 'script' ? `<script ${attrs} data-seo>${t.content}</script>` : `<${t.tag} ${attrs} data-seo>`);
  }
  return lines.join('\n    ');
}

/** Replaces managed head tags in the live document (client-side navigation). */
function applyToDocument(p: SeoProps) {
  document.title = fullTitle(p);
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  for (const t of buildTags(p)) {
    const el = document.createElement(t.tag);
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    el.setAttribute('data-seo', '');
    if (t.content) el.textContent = t.content;
    document.head.appendChild(el);
  }
}

export function Seo(props: SeoProps) {
  const collector = useContext(SeoContext);
  if (collector) collector.data = props; // server render: collect synchronously

  const key = JSON.stringify(props);
  useEffect(() => {
    applyToDocument(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}

/* ------------------------------------------------------------------------- */
/* Structured data helpers                                                    */
/* ------------------------------------------------------------------------- */

export function organizationJsonLd() {
  const { contact, social } = siteConfig;
  const sameAs = Object.values(social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/brand/logo-primary-on-light.svg'),
    description: siteConfig.description,
    email: contact.email,
    telephone: contact.phoneE164,
    ...(contact.address ? { address: contact.address } : {}),
    areaServed: ['IN', 'US', 'GB', 'CA', 'AU', 'Worldwide'],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: absoluteUrl('/'),
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
