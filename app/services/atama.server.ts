import { FetcherAtama } from '@atamaco/fetcher-atama';
import { pageHeaderReadActions } from '~/components/page-header';
import TTLCache from '@isaacs/ttlcache';
import { cartReadActions } from '~/components/cart';
import { productsListReadActions } from '~/components/products-list';
import {
  productDetailReadActions,
  productDetailWriteActions,
} from '~/components/product-detail';
import { AtamaClient } from '@atamaco/remix';

export const fetcher = new FetcherAtama({
  apiKey: process.env.ATAMA_API_KEY as string,
  workspaceId: process.env.ATAMA_WORKSPACE_ID as string,
  url: process.env.ATAMA_API_URL || undefined
});

const ttlCache = new TTLCache({ max: 100, ttl: 300000 });

export const client = new AtamaClient(
  fetcher,
  {
    read: {
      'product-detail': productDetailReadActions,
      'products-list': productsListReadActions,
      'page-header': pageHeaderReadActions,
      cart: cartReadActions,
    },
    write: {
      'product-detail': productDetailWriteActions,
    },
  },
  {
    error: console.error,
    warn: console.warn,
  },
  {
    get: async (key) => ttlCache.get(key),
    set: (key, value) => {
      ttlCache.set(key, value);
    },
    has: (key) => {
      return ttlCache.has(key);
    },
  },
);
