import type { TinaField } from "tinacms"

const text: TinaField = {
  label: "Text",
  name: "text",
  type: "string",
  required: false,
}

const level: TinaField = {
  label: "Heading Level",
  name: "level",
  type: "string",
  required: false,
  options: [
    {
      label: "h1",
      value: "1",
    },
    {
      label: "h2",
      value: "2",
    },
    {
      label: "h3",
      value: "3",
    },
    {
      label: "h4",
      value: "4",
    },
    {
      label: "h5",
      value: "5",
    },
    {
      label: "h6",
      value: "6",
    },
  ]
}

const size: TinaField = {
  label: "Heading Size",
  name: "size",
  type: "string",
  ui: {
    // default: "Default",
    component: "select"
  },
  options: [
    {
      label: "Default",
      value: "default",
    },
    {
      label: "Large",
      value: "large",
    },
    {
      label: "Larger",
      value: "larger",
    },
    {
      label: "Largest",
      value: "largest",
    },
  ],
  required: false,
}

export const headingTheme = {

}

export const headingSchema: TinaField = {
  label: "Heading",
  name: "heading",
  type: "object",
  fields: [
    text,
    level,
    size,
  ]
}

export default headingSchema