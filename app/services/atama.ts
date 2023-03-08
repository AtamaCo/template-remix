import type { V2_HtmlMetaDescriptor } from '@remix-run/server-runtime';
import type { CXExperience } from '@atamaco/cx-core';
import { PageHeader } from '~/components/page-header';
import { Hero } from '~/components/hero';
import { Page } from '~/components/blueprints/page';
import { Banner } from '~/components/banner';
import { CallToAction } from '~/components/call-to-action';
import { Cart } from '~/components/cart';
import { ProductsList } from '~/components/products-list';
import { ProductDetail } from '~/components/product-detail';
import { Card } from '~/components/card';
import { LandingPage } from '~/components/blueprints/landing-page';

export const layouts = {
  page: Page,
  'landing-page': LandingPage,
};

export const components = {
  'product-detail': ProductDetail,
  'products-list': ProductsList,
  'page-header': PageHeader,
  CallToAction,
  hero: Hero,
  Banner,
  cart: Cart,
  Card,
};

export interface MetaData {
  seoTitle: string;
  seoDescription: string;
}

export interface Session {
  newsletterSignup: boolean;
}

export function metaFn({
  data,
}: {
  data: CXExperience<MetaData>;
}): V2_HtmlMetaDescriptor[] {
  if (!data) {
    return [];
  }

  return [
    {
      title: data.meta?.seoTitle || '',
    },
    {
      name: 'description',
      content: data.meta?.seoDescription || '',
    },
  ];
}
