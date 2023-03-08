import type { ReactNode } from 'react';

import { forwardRef } from 'react';

interface PageProps {
  header: ReactNode;
  main: ReactNode;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ header, main }, ref) => {
    return (
      <div className="relative" ref={ref}>
        <div data-atama-placement="Header">{header}</div>
        <main>
          <div className="max-w-6xl mx-auto grid gap-4">
            <div data-atama-placement="Main">{main}</div>
          </div>
        </main>
      </div>
    );
  },
);

Page.displayName = 'Page';

/** metadataPropertyConfiguration
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "#/blueprint/metadata/landingPage",
  "type": "object",
  "title": "The root schema",
  "description": "The root schema comprises the entire JSON document.",
  "examples": [
    {
      "seoTitle": "Lorem ipsum",
      "seoDescription": "Lorem ipsum dolor sit amet."
    }
  ],
  "required": [
    "seoTitle",
    "seoDescription"
  ],
  "properties": {
    "seoTitle": {
      "$id": "#/properties/seoTitle",
      "type": "string",
      "title": "Title",
      "description": "The title of the page",
      "minLength": 3
    },
    "seoDescription": {
      "$id": "#/properties/seoDescription",
      "type": "string",
      "title": "Description",
      "description": "The description of the page",
      "minLength": 3
    }
  },
  "additionalProperties": true
}
*/
