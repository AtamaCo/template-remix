import type { ReactNode } from 'react';

import { forwardRef } from 'react';
import {
  ThreeColumnsGrid,
  ThreeColumnsGridItem,
} from '../_foundation/three-column-grid';

interface LandingPageProps {
  header: ReactNode;
  top: ReactNode;
  'top-left': ReactNode;
  'top-middle': ReactNode;
  'top-right': ReactNode;
  bottom: ReactNode;
}

export const LandingPage = forwardRef<HTMLDivElement, LandingPageProps>(
  (
    {
      header,
      top,
      'top-left': topLeft,
      'top-middle': topMiddle,
      'top-right': topRight,
      bottom,
    },
    ref,
  ) => {
    return (
      <div className="relative" ref={ref}>
        <div data-atama-placement="Header">{header}</div>
        <main>
          <div className="max-w-6xl mx-auto grid gap-4">
            <div data-atama-placement="Top">{top}</div>
            <ThreeColumnsGrid>
              <ThreeColumnsGridItem data-atama-placement="Top Left">
                {topLeft}
              </ThreeColumnsGridItem>
              <ThreeColumnsGridItem data-atama-placement="Top Middle">
                {topMiddle}
              </ThreeColumnsGridItem>
              <ThreeColumnsGridItem data-atama-placement="Top Right">
                {topRight}
              </ThreeColumnsGridItem>
            </ThreeColumnsGrid>
            <div data-atama-placement="Bottom">{bottom}</div>
          </div>
        </main>
      </div>
    );
  },
);

LandingPage.displayName = 'LandingPage';
