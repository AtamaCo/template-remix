import type { AtamaComponentProps } from '@atamaco/renderer-react';
import { CtaButton } from '~/components/_foundation/cta-button';
import clsx from 'clsx';
import { Heading } from './_foundation/heading';
import { Image } from './_foundation/image';

interface BannerProps {
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  variant?: 'light' | 'dark';
  atama?: AtamaComponentProps;
}

export function Banner({
  image,
  imageAlt,
  title,
  subtitle,
  description,
  ctaLabel,
  ctaHref,
  variant = 'light',
  atama,
}: BannerProps) {
  return (
    <section {...atama} className="relative py-20 lg:py-28 px-8 rounded mb-4">
      <Image
        src={image}
        alt={imageAlt}
        className='object-cover absolute inset-0 w-full h-full rounded'
      />
      <div className="relative bg-black/40 p-10 w-full md:w-1/2">
        <div
          className={clsx('px-12', {
            'text-white': variant === 'light',
            'text-gray-900': variant === 'dark',
          })}
        >
          <p className="text-sm	text-slate-300 uppercase">{subtitle}</p>
          <div className="pt-1 pb-3">
            <Heading level={3}>{title}</Heading>
          </div>
          <p className="pb-6 text-slate-300">{description}</p>
          {ctaLabel && ctaHref ? (
            <div>
              <CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
