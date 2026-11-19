import { cn } from '@/lib/cn';

/** Visible label for sample portfolio entries and placeholder content. */
export function SampleBadge({ label = 'Sample project', className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-dashed border-current px-2.5 py-0.5 text-[0.75rem] font-semibold leading-5',
        className,
      )}
      title="This is a sample entry used to demonstrate the layout. It will be replaced with real work."
    >
      {label}
    </span>
  );
}
