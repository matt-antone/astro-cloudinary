import type { Collection } from "tinacms";

const categories: Collection = {
  label: "Taxonomies",
  name: "taxonomies",
  path: "content/taxonomies",
  format: "json",
  fields: [
    {
      name: "value",
      label: "Items",
      type: "string",
      list: true,
    },
  ],
  ui: {
    global: true,
  },
}

export default categories