import { withPreview } from '@atamaco/preview-react';
import { AtamaRenderer } from '@atamaco/renderer-react';

import { components, layouts } from '~/services/atama';

const RenderPreview = withPreview(AtamaRenderer, 'https://composer.atama.app');

/**
 * Render the preview
 */
export function Preview() {
  return <RenderPreview layouts={layouts} components={components} />;
}
