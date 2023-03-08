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
  contrast?: boolean;
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
  contrast = true,
  atama,
}: BannerProps) {
  return (
    <section {...atama} className="py-4">
      <div className="relative py-24 lg:py-40">
        <Image
          src={image}
          alt={imageAlt}
          className={clsx(
            'object-cover absolute inset-0 w-full h-full rounded',
            {
              'contrast-50': contrast,
            },
          )}
        />
        <div className="relative">
          <div
            className={clsx('px-12', {
              'text-white': variant === 'light',
              'text-gray-900': variant === 'dark',
            })}
          >
            <p className="text-lg">{subtitle}</p>
            <div className="pt-1 pb-3">
              <Heading level={3}>{title}</Heading>
            </div>
            <p className="pb-6">{description}</p>
            {ctaLabel && ctaHref ? (
              <div>
                <CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
