/**
 * Serves optimised WebP images in three widths (640, 1024, 1600).
 * Files are produced by `npm run images` as <name>-640.webp, <name>-1024.webp, <name>-1600.webp.
 * Width/height reserve space so the page does not jump while images load.
 */
import type { ProjectImage } from '@/content/types';
import { cn } from '@/lib/cn';

export const IMAGE_WIDTHS = [640, 1024, 1600] as const;

interface Props {
  image: ProjectImage;
  /** CSS sizes attribute, e.g. "(min-width: 1024px) 60vw, 100vw" */
  sizes: string;
  className?: string;
  /** Load immediately (above-the-fold images only) */
  priority?: boolean;
  /** Override alt (use "" for decorative duplicates) */
  alt?: string;
}

export function ResponsiveImage({ image, sizes, className, priority = false, alt }: Props) {
  const srcSet = IMAGE_WIDTHS.map((w) => `${image.src}-${w}.webp ${w}w`).join(', ');
  return (
    <img
      src={`${image.src}-1024.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt ?? image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={cn('h-full w-full object-cover', className)}
    />
  );
}
