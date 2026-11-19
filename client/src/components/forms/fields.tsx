/**
 * Accessible form building blocks shared by every enquiry form.
 * Each field is linked to its label, hint and error message for screen readers.
 */
import { forwardRef, useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { COUNTRY_CODES, PRIORITY_COUNTRIES, countryName } from '@galaxy/shared';
import { cn } from '@/lib/cn';
import { useMounted } from '@/lib/useMounted';

const controlBase =
  'block w-full rounded-md border bg-white px-4 text-[1rem] text-ink transition-colors placeholder:text-muted/70 focus:border-violet-strong focus:outline-none focus:ring-2 focus:ring-violet/25 disabled:bg-paper';

const controlState = (invalid?: boolean) => (invalid ? 'border-danger' : 'border-[#c9cddb] hover:border-[#9ea3b8]');

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ id, label, required, hint, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.9375rem] font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden>
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? (
        <p id={`${id}-hint`} className="type-small mt-1.5 text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="type-small mt-2 flex items-start gap-1.5 font-medium text-danger">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** aria attributes that connect a control to its hint and error */
export function describedBy(id: string, opts: { hint?: boolean; error?: string }) {
  const ids = [opts.hint && `${id}-hint`, opts.error && `${id}-error`].filter(Boolean).join(' ');
  return {
    'aria-invalid': opts.error ? (true as const) : undefined,
    'aria-describedby': ids || undefined,
  };
}

type InputProps = ComponentPropsWithoutRef<'input'> & { invalid?: boolean };
export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput({ invalid, className, ...rest }, ref) {
  return <input ref={ref} className={cn(controlBase, controlState(invalid), 'h-12', className)} {...rest} />;
});

type TextareaProps = ComponentPropsWithoutRef<'textarea'> & { invalid?: boolean };
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ invalid, className, ...rest }, ref) {
  return <textarea ref={ref} className={cn(controlBase, controlState(invalid), 'min-h-36 py-3 leading-relaxed', className)} {...rest} />;
});

type SelectProps = ComponentPropsWithoutRef<'select'> & { invalid?: boolean; placeholder?: string };
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ invalid, className, placeholder, children, ...rest }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(controlBase, controlState(invalid), 'h-12 appearance-none pr-10', className)}
        {...rest}
      >
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted">
        <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});

/** Country options – priority markets first, then A–Z. */
export function CountryOptions() {
  // Country names come from the browser (Intl) and can differ slightly from the
  // build server's, so the full list is rendered once the page is interactive.
  const mounted = useMounted();
  if (!mounted) return null;
  const priority = PRIORITY_COUNTRIES.map((c) => ({ code: c, name: countryName(c) }));
  const rest = COUNTRY_CODES.filter((c) => !(PRIORITY_COUNTRIES as readonly string[]).includes(c))
    .map((c) => ({ code: c, name: countryName(c) }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <optgroup label="Common">
        {priority.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </optgroup>
      <optgroup label="All countries">
        {rest.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </optgroup>
    </>
  );
}

/**
 * Hidden field that people never see or fill in. Automated bots usually do,
 * which lets the server discard their submissions.
 */
export const Honeypot = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(function Honeypot(props, ref) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input ref={ref} type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
});

/** Lists every error at the top of the form after a failed submit and takes focus. */
export function ErrorSummary({ errors, message, focusKey }: { errors: { id: string; message: string }[]; message?: string; focusKey: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focusKey > 0) ref.current?.focus();
  }, [focusKey]);
  if (!errors.length && !message) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="rounded-md border-2 border-danger bg-[#fdf2f4] p-5 outline-none">
      <p className="font-semibold text-ink">{message ?? 'Check the following and try again:'}</p>
      {errors.length > 0 && (
        <ul className="type-small mt-3 grid gap-1.5">
          {errors.map((e) => (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  const el = document.getElementById(e.id);
                  el?.focus();
                  el?.scrollIntoView({ block: 'center' });
                }}
                className="font-medium text-danger underline underline-offset-2"
              >
                {e.message}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
