import type { MetaData } from '~/services/atama';
import { client } from '~/services/atama.server';
import { metaFn } from '~/services/atama';
import { useLoaderData, Links, useCatch } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/server-runtime';
import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { Render } from '~/components/render';
import { findComponentByComponentType } from '@atamaco/cx-core';

export const loader = async (loaderArgs: LoaderArgs) => {
  return client.loadPaths<MetaData>(loaderArgs, [
    loaderArgs.request,
    'product/$handle',
  ]);
};

export async function action(actionArgs: ActionArgs) {
  return client.action(actionArgs, 'product/$handle');
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const productDetailComponent = findComponentByComponentType(
    data,
    'product-detail',
  );

  if (!productDetailComponent) {
    return metaFn({ data });
  }

  const contentProperties = productDetailComponent?.contentProperties as {
    title: string;
    description: string;
  };

  return [
    {
      title: contentProperties?.title,
    },
    {
      name: 'description',
      content: contentProperties?.description,
    },
  ];
};

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <>
        <Links />
        <div>
          <h2>We couldn't find the page you are looking!</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Links />
      <div>
        <h2>There was an error rendering the page.</h2>
      </div>
    </>
  );
}

export default function LandingPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Render data={data} />
    </>
  );
}
