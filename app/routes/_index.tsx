import { useLoaderData } from '@remix-run/react';
import type { MetaData } from '~/services/atama';
import { client } from '~/services/atama.server';

import { metaFn } from '~/services/atama';
import type { LoaderArgs } from '@remix-run/node';
import { Render } from '~/components/render';

export const loader = async (args: LoaderArgs) => {
  return client.loader<MetaData>(args, '/index');
};

export const meta = metaFn;

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Render data={data} />
    </>
  );
}
