import type {
  GetProductBusinessCapabilityResponse,
  AddToCartBusinessCapabilityResponse,
  CreateCartBusinessCapabilityResponse,
} from '~/services/business-capabilities';
import { Form, useTransition } from '@remix-run/react';
import { commitSession, getSession } from '~/services/sessions';
import type { DataFunctionArgs } from '@remix-run/server-runtime';
import { fetcher } from '~/services/atama.server';
import { Button } from './_foundation/button';
import { Image } from './_foundation/image';
import { Heading } from './_foundation/heading';

export interface ProductDetailProps {
  id: string;
  handle: string;
  title: string;
  price: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const productDetailReadActions = {
  'get-product': {
    input: async (data: ProductDetailProps, dataFnArgs: DataFunctionArgs) => {
      if (dataFnArgs.params.handle) {
        return {
          handle: dataFnArgs.params.handle as string,
        };
      }

      return {
        handle: data.handle,
      };
    },
    output: async (
      data: Array<GetProductBusinessCapabilityResponse>,
    ): Promise<ProductDetailProps> => {
      return {
        id: data[0].success.product.variants.edges[0].node.id,
        handle: data[0].success.product.handle,
        title: data[0].success.product.title,
        description: data[0].success.product.description,
        price: `${data[0].success.product.priceRange.maxVariantPrice.currencyCode} ${data[0].success.product.priceRange.maxVariantPrice.amount}`,
        imageSrc: data[0].success.product.image.src,
        imageAlt: data[0].success.product.image.alt || '',
      };
    },
  },
};

export const productDetailWriteActions = {
  'add-to-cart': {
    input: async (
      data: { productId: string; cartId: string },
      { request }: DataFunctionArgs,
    ) => {
      const session = await getSession(request.headers.get('Cookie'));
      let cartId = await session.get('cartId');

      if (!cartId) {
        const result = await fetcher.action<
          {},
          Array<CreateCartBusinessCapabilityResponse>
        >({
          actionId: 'create_cart',
          input: {},
          slug: 'product/$handle',
        });
        cartId = result[0].success.id;
      }

      return {
        productId: data.productId,
        cartId,
      };
    },
    output: async (
      data: Array<AddToCartBusinessCapabilityResponse>,
      request: Request,
      inputData: { productId: string; cartId: string },
    ) => {
      const session = await getSession(request.headers.get('Cookie'));

      session.set('cartId', inputData.cartId);

      return [
        data[0],
        {
          headers: {
            'Set-Cookie': await commitSession(session),
          },
        },
      ];
    },
  },
};

export function ProductDetail({
  id,
  description,
  price,
  title,
  imageSrc,
  imageAlt,
}: ProductDetailProps) {
  const transition = useTransition();

  return (
    <article className="relative flex flex-col md:flex-row justify-stretch gap-12 py-6 px-8 lg:px-0">
      <div className="max-w-1/2">
        <Image src={imageSrc} alt={imageAlt} className="object-contain" />
      </div>
      <div className="flex flex-col gap-2">
        <Heading level={1} size={3}>
          {title}
        </Heading>
        <p>{price}</p>
        <div>{description}</div>
        <Form method="post">
          <input type="hidden" name="actionKey" value="add-to-cart" />
          <input type="hidden" name="componentType" value="product-detail" />
          <input type="hidden" name="productId" value={id} />
          <Button type="submit" disabled={transition.state === 'submitting'}>
            Add to cart
          </Button>
        </Form>
      </div>
    </article>
  );
}

/** contentProperties
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "type": "object",
  "examples": [
    {
      "title": "Lorem ipsum",
      "price": "$35",
      "description": "Lorem ipsum dolor sit amet"
    }
  ],
  "required": [
    "title",
    "price",
    "description",
    "imageSrc",
    "imageAlt"
  ],
  "properties": {
    "title": {
      "type": "string",
      "title": "Title"
    },
    "price": {
      "type": "string",
      "title": "Price"
    },
    "description": {
      "type": "string",
      "title": "Description"
    },
    "imageSrc": {
      "type": "string",
      "title": "Image Source"
    },
    "imageAlt": {
      "type": "string",
      "title": "Image Alt"
    }
  },
  "additionalProperties": true
}
*/

/** visualProperties
{}
*/
