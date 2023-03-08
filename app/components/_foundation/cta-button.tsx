import { Link } from '@remix-run/react';
import type { RemixLinkProps } from '@remix-run/react/dist/components';
import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CtaButtonProps {
  children: ReactNode;
  href: string;
}

export function CtaButton({
  children,
  href,
  ...rest
}: CtaButtonProps & Omit<RemixLinkProps, 'className' | 'to'>) {
  return (
    <Link
      to={href || '#'}
      {...rest}
      className={clsx(
        'px-6 py-2 bg-green-500 transition-colors rounded-md text-white shadow-sm whitespace-nowrap',
        {
          'hover:bg-green-400 focus:bg-green-400': true,
        },
      )}
    >
      {children} →
    </Link>
  );
}
