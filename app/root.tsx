import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} from '@remix-run/react';

import stylesheet from '~/styles/tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export default function App() {
  const transition = useTransition();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {transition.type === 'normalLoad' ? (
          <div className="flex flex-col items-center justify-center absolute backdrop-blur-sm inset-0 z-50 mt-28">
            <svg
              className="animate-spin -ml-1 mr-3 h-8 w-8 text-zinc-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : null}
        <footer className="bg-gray-100 py-8">
          <div className="max-w-6xl mx-auto text-slate-400 px-8 lg:px-0">
            &copy; {new Date().getFullYear()} / Atama Technologies, Inc.
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
