/**
 * The hero illustration: the logo's split circle drawn as an orbit.
 * The violet half carries the creative services, the blue half the
 * engineering services. Each point links to its service page.
 * One draw-in animation runs on load; nothing moves afterwards.
 */
import { Link } from 'react-router';
import { servicesBySide } from '@/content/services';
import { homeContent } from '@/content/home';
import { BrandMark } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

const R = 30; // ring radius in % of the box
const CX = 50;
const CY = 50;

const point = (deg: number, r = R) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY - r * Math.sin(rad) };
};

const arc = (from: number, to: number, sweep: 0 | 1, r = R) => {
  const a = point(from, r);
  const b = point(to, r);
  return `M${a.x.toFixed(3)} ${a.y.toFixed(3)} A${r} ${r} 0 0 ${sweep} ${b.x.toFixed(3)} ${b.y.toFixed(3)}`;
};

// Angles in degrees (0 = right, 90 = top)
const CREATIVE_ANGLES = [128, 158, 202, 232];
const ENGINEERING_ANGLES = [52, 22, -22, -52];

export function OrbitHero({ compact = false, className }: { compact?: boolean; className?: string }) {
  const nodes = [
    ...servicesBySide.creative.map((s, i) => ({ s, deg: CREATIVE_ANGLES[i], side: 'creative' as const })),
    ...servicesBySide.engineering.map((s, i) => ({ s, deg: ENGINEERING_ANGLES[i], side: 'engineering' as const })),
  ];

  return (
    <div className={cn('relative aspect-square w-full select-none', className)}>
      {/* Soft glow behind the ring – the only gradient in the hero */}
      <div
        aria-hidden
        className="absolute inset-[18%] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle at 35% 50%, rgba(123,92,255,0.45), transparent 60%), radial-gradient(circle at 65% 50%, rgba(47,107,255,0.45), transparent 60%)' }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {/* Outer guide ring */}
        <circle cx={CX} cy={CY} r={R + 12} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.25" />
        {/* Inner dashed orbit */}
        <circle cx={CX} cy={CY} r={R - 10} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.25" strokeDasharray="0.6 1.4" />
        {/* The two halves, with the same gap as the logo */}
        <path
          d={arc(94, 266, 0)}
          pathLength={100}
          className="orbit-arc"
          style={{ ['--len' as string]: 100 }}
          fill="none"
          stroke="#7B5CFF"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d={arc(86, -86, 1)}
          pathLength={100}
          className="orbit-arc"
          style={{ ['--len' as string]: 100, animationDelay: '0.15s' }}
          fill="none"
          stroke="#2F6BFF"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {/* The G's crossbar, echoed as a short line into the centre */}
        <path d={`M${CX - R} ${CY} H${CX - 8}`} stroke="rgba(123,92,255,0.35)" strokeWidth="0.25" />
        <path d={`M${CX + 8} ${CY} H${CX + R}`} stroke="rgba(47,107,255,0.35)" strokeWidth="0.25" />

        {compact &&
          nodes.map(({ s, deg, side }, i) => {
            const p = point(deg);
            return (
              <circle
                key={s.slug}
                cx={p.x}
                cy={p.y}
                r={1.6}
                fill={side === 'creative' ? '#7B5CFF' : '#2F6BFF'}
                stroke="#0A0F2C"
                strokeWidth="0.6"
                className="orbit-node"
                style={{ animationDelay: `${0.7 + i * 0.07}s` }}
              />
            );
          })}
      </svg>

      <BrandMark className="absolute top-1/2 left-1/2 size-[13%] -translate-x-1/2 -translate-y-1/2" />

      {!compact && (
        <>
          <ul className="contents">
            {nodes.map(({ s, deg, side }, i) => {
              const p = point(deg);
              const left = side === 'creative';
              return (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className={cn(
                      'group orbit-label absolute flex items-center gap-2.5 rounded-full py-1 text-[0.8125rem] font-medium xl:gap-3 xl:text-[0.9375rem] text-white/80 hover:text-white focus-visible:text-white',
                      left ? 'flex-row-reverse' : 'flex-row',
                    )}
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      transform: `translate(${left ? 'calc(-100% + 0.5rem)' : '-0.5rem'}, -50%)`,
                      animationDelay: `${0.7 + i * 0.07}s`,
                    }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'relative size-4 shrink-0 rounded-full border-[3px] border-ink transition-transform duration-200 group-hover:scale-125',
                        left ? 'bg-violet' : 'bg-blue',
                      )}
                    />
                    <span className="whitespace-nowrap underline-offset-4 group-hover:underline">{s.shortTitle}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p aria-hidden className="type-meta absolute bottom-[4%] left-[18%] text-lavender">
            {homeContent.hero.creativeLabel}
          </p>
          <p aria-hidden className="type-meta absolute right-[18%] bottom-[4%] text-sky">
            {homeContent.hero.engineeringLabel}
          </p>
        </>
      )}
    </div>
  );
}
