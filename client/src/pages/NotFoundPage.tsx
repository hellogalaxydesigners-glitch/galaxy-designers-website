import { Link } from 'react-router';
import { Seo } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/Button';
import { services } from '@/content/services';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for could not be found." path="/404" noindex />
      <section className="on-dark bg-ink text-white">
        <div className="container-site section">
          <p className="type-meta text-lavender">Error 404</p>
          <h1 className="type-h1 mt-5 max-w-[18ch]">We couldn’t find that page.</h1>
          <p className="type-lead mt-6 max-w-[52ch] text-white/75">
            The link may be out of date or the page may have moved. Try one of these instead.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to="/" size="lg">Go to the home page</ButtonLink>
            <ButtonLink to="/work" size="lg" variant="outline-dark">See our work</ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="outline-dark">Contact us</ButtonLink>
          </div>
          <h2 className="type-meta mt-16 text-white/60">Services</h2>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="block border-b border-white/10 py-3 text-white/85 hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
