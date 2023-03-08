import type { AtamaComponentProps } from '@atamaco/renderer-react';
import type { DataFunctionArgs } from '@remix-run/node';
import { Link } from '@remix-run/react';
import type { CartBusinessCapability } from '~/services/business-capabilities';
import { getSession } from '~/services/sessions';

interface PageHeaderProps {
  quantity?: number;
  atama?: AtamaComponentProps;
}

export const pageHeaderReadActions = {
  'get-cart': {
    input: async (_: any, { request }: DataFunctionArgs) => {
      const session = await getSession(request.headers.get('Cookie'));
      const cartId = await session.get('cartId');

      return {
        cartId: cartId || '',
      };
    },
    output: async (
      data: Array<CartBusinessCapability>,
    ): Promise<PageHeaderProps> => {
      return {
        quantity:
          data[0] === null || data[0].userErrors
            ? 0
            : data[0].cart.totalQuantity,
      };
    },
  },
};

/**
 * The header of a page
 */
export function PageHeader({ quantity, atama }: PageHeaderProps) {
  return (
    <header
      className="max-w-6xl mx-auto py-8 sticky top-0 backdrop-blur-md z-20 px-8 lg:px-0 h-28"
      {...atama}
    >
      <div className="flex">
        <Link to="/" className="font-bold">
          Atama Demo
        </Link>
        <nav className="pl-12 grow">
          <Link to="/products">Products</Link>
        </nav>
        <aside>
          <Link to="/cart" className="relative block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {quantity && quantity > 0 ? (
              <div className="rounded-full flex items-center justify-center text-white text-center text-sm bg-green-600 bg-opacity-90 absolute w-full h-full -right-2/4 -top-2/4">
                {quantity}
              </div>
            ) : null}
          </Link>
        </aside>
      </div>
    </header>
  );
}

/** contentProperties
{}
*/

/** visualProperties
{}
*/
