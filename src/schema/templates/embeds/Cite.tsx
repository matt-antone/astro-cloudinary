import type { Template } from 'tinacms'
import * as React from 'react';

export interface ICiteProps {
  name: string
}

export function Cite (props: ICiteProps) {
  return props.name ? (
    <cite>
      { props.name }
    </cite>
  ) : null;
}

export const citeFields: Template= {
  name: "Cite",
  label: "Cite",
  fields: [
    {
      type: "string",
      name: "text",
      label: "Text",
    },
    {
      type: "string",
      name: "url",
      label: "Url",
    }
  ],
}