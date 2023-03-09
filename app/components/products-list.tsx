import type { GetProductsBusinessCapabilityResponse } from '~/services/business-capabilities';
import { Link } from '@remix-run/react';
import { Image } from './_foundation/image';

export const productsListReadActions = {
  'get-products': {
    input: async () => {
      return {};
    },
    output: async (
      data: Array<GetProductsBusinessCapabilityResponse>,
    ): Promise<ProductListProps> => {
      return {
        title: 'Products',
        products: data[0].success.products.products.map((product) => {
          return {
            href: `/product/${product.node.handle}`,
            title: product.node.title,
            price: `${product.node.priceRange.maxVariantPrice.currencyCode} ${product.node.priceRange.maxVariantPrice.amount}`,
            imageSrc: product.node.image.src,
            imageAlt: product.node.image.alt || '',
          };
        }),
      };
    },
  },
};

interface ProductProps {
  title: string;
  href: string;
  price: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
}

function Product({
  title,
  subtitle,
  href,
  price,
  imageSrc,
  imageAlt,
}: ProductProps) {
  return (
    <article className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={href}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              {title}
            </Link>
          </h3>
          {subtitle ? (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          ) : null}
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>
    </article>
  );
}

interface ProductListProps {
  title: string;
  noProductsMessage?: string;
  products?: Array<ProductProps>;
}

export function ProductsList({
  title,
  products,
  noProductsMessage,
}: ProductListProps) {
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto pb-10 px-8 lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        {products && products.length === 0 && noProductsMessage ? (
          <p className="text-center italic py-4">{noProductsMessage}</p>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <Product
              key={product.title}
              title={product.title}
              subtitle={product.subtitle}
              href={product.href}
              price={product.price}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** contentProperties
{}
*/

/** visualProperties
{}
*/
