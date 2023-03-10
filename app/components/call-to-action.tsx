import type { AtamaComponentProps } from '@atamaco/renderer-react';
import { CtaButton } from './_foundation/cta-button';
import { Heading } from './_foundation/heading';

interface CallToActionProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  atama: AtamaComponentProps;
}

export function CallToAction({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  atama,
}: CallToActionProps) {
  return (
    <section {...atama} className="py-4">
      <div className="flex flex-col md:flex-row gap-12 items-center px-8 py-10 bg-zinc-100 border-2 border-zinc-200 rounded">
        <div className="grow flex flex-col gap-2">
          <Heading level={4}>{title}</Heading>
          <p className="text-lg">{subtitle}</p>
        </div>
        <div>
          <CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
        </div>
      </div>
    </section>
  );
}
