import type { CartBusinessCapability } from '~/services/business-capabilities';
import type { DataFunctionArgs } from '@remix-run/node';
import { getSession } from '~/services/sessions';
import type { ImageData } from './_foundation/image';
import { Link } from '@remix-run/react';
import { Heading } from './_foundation/heading';
import { Image } from './_foundation/image';

export const cartReadActions = {
  'get-cart': {
    input: async (_: any, { request }: DataFunctionArgs) => {
      const session = await getSession(request.headers.get('Cookie'));
      const cartId = await session.get('cartId');

      return {
        cartId: cartId || '',
      };
    },
    output: async (data: Array<CartBusinessCapability>): Promise<CartProps> => {
      const error = data[0] === null || data[0].userErrors;
      return {
        subTotal: error
          ? undefined
          : `${data[0].cart.cost.subtotalAmount.currencyCode} ${data[0].cart.cost.subtotalAmount.amount}`,
        items: error
          ? []
          : data[0].cart.lines.edges.map((edge) => ({
              id: edge.node.variants.edges[0].node.id.replace(
                /gid:\/\/shopify\/ProductVariant\/(.*)/g,
                '$1',
              ),
              title: edge.node.title,
              image: {
                src: edge.node.image.src,
                alt: edge.node.image.alt || '',
              },
              price: `${edge.node.priceRange.maxVariantPrice.currencyCode} ${edge.node.priceRange.maxVariantPrice.amount}`,
              handle: edge.node.handle,
            })),
      };
    },
  },
};

interface CartProps {
  subTotal?: string;
  items?: Array<{
    id: string;
    title: string;
    image: ImageData;
    price: string;
    handle: string;
  }>;
}

export function Cart({ subTotal, items }: CartProps) {
  const checkoutUrl = `https://wndr-demo.myshopify.com/cart/${items
    ?.map((item) => `${item.id}:1`)
    .join(',')}`;

  return (
    <section className="bg-white flex flex-col gap-6 lg:max-w-[80%] m-auto px-8 py-6">
      <Heading level={1} size={1}>
        Cart
      </Heading>
      {!items || items.length === 0 ? (
        <p className="text-center italic font-semibold">
          You haven't added any products to the cart yet.
        </p>
      ) : null}
      {items && items.length > 0 ? (
        <>
          <ul className="flex flex-col gap-4">
            {items?.map((item) => (
              <li key={item.id} className="flex gap-4">
                <Image
                  {...item.image}
                  className="w-40 h-40 object-contain border border-slate-300"
                />
                <Link to={`/product/${item.handle}`} className="grow">
                  {item.title}
                </Link>
                <div>{item.price}</div>
              </li>
            ))}
          </ul>
          <hr />
          <div>
            <dl className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{subTotal}</dd>
            </dl>
            <p>Shipping and taxes calculated at checkout.</p>
          </div>
          <div className="flex justify-end">
            <a
              href={checkoutUrl}
              className="bg-green-500 text-white rounded-md py-4 px-12 hover:bg-green-400 focus:bg-green-400 transition-colors shadow-sm"
            >
              Checkout
            </a>
          </div>
        </>
      ) : null}
    </section>
  );
}

/** contentProperties
{}
*/

/** visualProperties
{}
*/
