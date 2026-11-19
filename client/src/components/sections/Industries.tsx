import { homeContent } from '@/content/home';

export function Industries() {
  const { heading, intro, list } = homeContent.industries;
  return (
    <section aria-labelledby="industries-heading" className="section bg-white">
      <div className="container-site">
        <h2 id="industries-heading" className="type-h2 max-w-[18ch] text-ink">
          {heading}
        </h2>
        <p className="type-lead mt-5 max-w-[56ch] text-muted">{intro}</p>
        <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <li key={item.name} className="border-b border-line py-7 sm:pr-8 lg:py-9">
              <h3 className="text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] text-ink [font-stretch:118%] sm:text-[1.75rem]">
                {item.name}
              </h3>
              <p className="type-small mt-2 max-w-[38ch] text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
