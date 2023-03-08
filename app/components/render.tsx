import { AtamaRenderer } from '@atamaco/renderer-react';
import { layouts, components } from '~/services/atama';

/**
 * Render experience data
 */
export function Render({
  data,
}: {
  data: Parameters<typeof AtamaRenderer>[0]['data'];
}) {
  return (
    <AtamaRenderer layouts={layouts} components={components} data={data} />
  );
}
