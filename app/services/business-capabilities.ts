interface ProductBusinessCapability {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    maxVariantPrice: {
      amount: number,
      currencyCode: string,
    },
    minVariantPrice: {
      amount: number,
      currencyCode: string,
    },
  };
  image: {
    alt: string | null,
    src: string,
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        sku: string;
      }
    }>,
  }
}

export interface GetProductBusinessCapabilityResponse {
  success: {
    product: ProductBusinessCapability,
  };
  error: object;
}

export interface GetProductsBusinessCapabilityResponse {
  success: {
    products: {
      products: Array<{
        node: ProductBusinessCapability,
      }>,
    },
  };
  error: object;
}

export interface CreateCartBusinessCapabilityResponse {
  success: {
    id: string,
    totalQuanity: number,
    cost: object,
    lines: object,
  },
  error: object,
}

export interface AddToCartBusinessCapabilityResponse {
  data: {

  },
  error: object,
}

export interface CartBusinessCapability {
  cart: {
    id: string,
    totalQuantity: number,
    cost: {
      subtotalAmount: {
        amount: number,
        currencyCode: string,
      },
      totalAmount: {
        amount: number,
        currencyCode: string,
      },
    },
    lines: {
      edges: Array<{
        node: ProductBusinessCapability
      }>;
    },
  },
  userErrors: object,
}