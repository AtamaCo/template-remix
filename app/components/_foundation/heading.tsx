import clsx from 'clsx';
import type { ReactNode } from 'react';

const levels = {
  1: ({ children, className }: { children: ReactNode; className: string }) => (
    <h1 className={className}>{children}</h1>
  ),
  2: ({ children, className }: { children: ReactNode; className: string }) => (
    <h2 className={className}>{children}</h2>
  ),
  3: ({ children, className }: { children: ReactNode; className: string }) => (
    <h3 className={className}>{children}</h3>
  ),
  4: ({ children, className }: { children: ReactNode; className: string }) => (
    <h4 className={className}>{children}</h4>
  ),
  5: ({ children, className }: { children: ReactNode; className: string }) => (
    <h5 className={className}>{children}</h5>
  ),
  6: ({ children, className }: { children: ReactNode; className: string }) => (
    <h6 className={className}>{children}</h6>
  ),
};

const sizes = {
  1: 'text-4xl font-bold tracking-tight sm:text-6xl',
  2: 'text-4xl font-bold tracking-tight sm:text-5xl',
  3: 'text-4xl font-bold sm:text-4xl',
  4: 'text-2xl font-bold tracking-tight sm:text-3xl',
  5: 'text-lg font-bold tracking-tight sm:text-2xl',
  6: 'text-base font-bold tracking-tight sm:text-xl',
};

export function Heading({
  children,
  level = 1,
  size,
  className,
}: {
  children: ReactNode;
  className?: string;
  level: keyof typeof levels;
  size?: keyof typeof sizes;
}) {
  const Element = levels[level];

  return (
    <Element className={clsx(sizes[size || level], className)}>
      {children}
    </Element>
  );
}
