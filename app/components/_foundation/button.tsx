import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({
  children,
  ...rest
}: { children: ReactNode } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>) {
  return (
    <button
      {...rest}
      className={clsx(
        'px-6 py-2 bg-green-500 transition-colors rounded-md text-white shadow-sm',
        {
          'cursor-not-allowed opacity-50': rest.disabled,
          'hover:bg-green-400 focus:bg-green-400': !rest.disabled,
        },
      )}
    >
      {children}
    </button>
  );
}
