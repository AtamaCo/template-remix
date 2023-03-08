import type { AtamaComponentProps } from '@atamaco/renderer-react';
import type { ReactNode } from 'react';
import { Heading } from '~/components/_foundation/heading';

function HeroFeature({
  children,
  label,
  href,
}: {
  children: ReactNode;
  href?: string;
  label?: string;
}) {
  return (
    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        {children}{' '}
        {href && label ? (
          <a href={href} className="font-semibold text-indigo-600">
            <span className="absolute inset-0" aria-hidden="true"></span>
            {label} <span aria-hidden="true">&rarr;</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

function Cta({ href, children, variant = 'primary' }: CtaButtonProps) {
  if (variant === 'primary') {
    return (
      <a
        href={href}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {children}
      </a>
    );
  }

  if (variant === 'secondary') {
    return (
      <a href={href} className="text-sm font-semibold leading-6 text-gray-900">
        {children} <span aria-hidden="true">→</span>
      </a>
    );
  }

  throw new Error(`Unknown variant: ${variant}`);
}

function CtaGroup({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-6">
      {children}
    </div>
  );
}

interface HeroProps {
  title: string;
  subtitle: string;
  featureText?: string;
  featureHref?: string;
  featureLabel?: string;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
  atama?: AtamaComponentProps;
}

/**
 * A pages hero section
 */
export function Hero({
  title,
  subtitle,
  featureText,
  featureHref,
  featureLabel,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
  atama,
}: HeroProps) {
  const ctas = [
    {
      href: primaryCtaHref,
      children: primaryCtaLabel,
      variant: 'primary',
    },
    {
      href: secondaryCtaHref,
      children: secondaryCtaLabel,
      variant: 'secondary',
    },
  ].filter((cta) => !!cta.href && !!cta.children) as Array<CtaButtonProps>;

  return (
    <div className="relative px-6 lg:px-8" {...atama}>
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#54b062" />
              <stop offset="1" stopColor="#80fffb" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mx-auto max-w-2xl py-28 sm:py-32 lg:py-40">
        {featureText ? (
          <HeroFeature href={featureHref} label={featureLabel}>
            {featureText}
          </HeroFeature>
        ) : null}
        <div className="text-center">
          <Heading level={1} className="text-gray-900">
            {title}
          </Heading>
          <p className="mt-6 text-lg leading-8 text-gray-600">{subtitle}</p>
          {ctas ? (
            <CtaGroup>
              {ctas?.map(({ children, href }) => (
                <Cta key={href} href={href!}>
                  {children}
                </Cta>
              ))}
            </CtaGroup>
          ) : null}
        </div>
      </div>
    </div>
  );
}
