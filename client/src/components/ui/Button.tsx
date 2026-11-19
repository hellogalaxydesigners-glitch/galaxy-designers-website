import { Link } from 'react-router';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline-dark' | 'outline-light' | 'light';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  /** Violet button – the main call to action on light or dark backgrounds */
  primary: 'bg-violet-strong text-white hover:bg-[#5a38e8]',
  /** Outline button for dark backgrounds */
  'outline-dark': 'border border-white/30 text-white hover:border-white/70 hover:bg-white/5',
  /** Outline button for light backgrounds */
  'outline-light': 'border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink/[0.03]',
  /** White button for dark bands */
  light: 'bg-white text-ink hover:bg-lavender',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonLinkProps = CommonProps & { to: string; state?: unknown } & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className'>;

/** Internal link styled as a button */
export function ButtonLink({ to, variant = 'primary', size = 'md', icon, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      {children}
    </Link>
  );
}

type ExternalProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className'>;

/** External link (WhatsApp, email, phone) styled as a button */
export function ButtonExternal({ href, variant = 'primary', size = 'md', icon, className, children, ...rest }: ExternalProps) {
  const isWeb = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}

type NativeButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

export function Button({ variant = 'primary', size = 'md', icon, className, children, type = 'button', ...rest }: NativeButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}
