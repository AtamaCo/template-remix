import type { MetaData } from '~/services/atama';
import { client } from '~/services/atama.server';
import { metaFn } from '~/services/atama';
import { useLoaderData, Links, useCatch } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/server-runtime';
import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { Render } from '~/components/render';

export const loader = async (args: LoaderArgs) => {
  return client.loader<MetaData>(args);
};

export async function action(args: ActionArgs) {
  return client.action(args);
}

export const meta: V2_MetaFunction<typeof loader> = metaFn;

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
