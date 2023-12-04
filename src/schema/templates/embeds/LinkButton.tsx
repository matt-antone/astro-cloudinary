import type { Template } from 'tinacms'
import * as React from 'react';

type LinkButtonProps = {
    text: string,
    href: string,
    bgColor?: string,
}

const LinkButton = (props: LinkButtonProps) => {
  const {text,href,bgColor = 'bg-content'} = props;
  return text && href ? (
    <div className="text-left pb-4">
      <a href={href} target={ href.includes('http') ? 'new' : 'self' } className={`${bgColor || ''} py-2 px-4 inline-block text-lg rounded-sm text-black border no-underline text-center`}>
        { text } 
      </a>
    </div>
  ) : null;
};

export default LinkButton;

export const linkButtonFields: Template= {
  name: "LinkButton",
  label: "Link Button",
  fields: [
    {
      type: "string",
      name: "text",
      label: "Text",
    },
    {
      type: "string",
      name: "href",
      label: "Href",
    },
    {
      type: "string",
      name: "bgColor",
      label: "Background Color",
      options: [
        { label: "Transparent", value: "bg-transparent" },
        { label: "Black", value: "bg-black" },
        { label: "White", value: "bg-white" },
        { label: "Lime", value: "bg-lime" },
        { label: "Orange", value: "bg-orange" },
        { label: "Lemon", value: "bg-lemon" },
        { label: "Light", value: "bg-light" },
        { label: "Dark", value: "bg-dark" },
        { label: "Primary", value: "bg-primary" },
        { label: "Secondary", value: "bg-secondary" },
        { label: "Accent", value: "bg-accent" },
        { label: "Success", value: "bg-success" },
        { label: "Info", value: "bg-info" },
        { label: "Warning", value: "bg-warning" },
        { label: "Danger", value: "bg-danger" },
      ],
    }
  ],
}