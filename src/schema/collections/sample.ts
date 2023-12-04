import { templateFields } from "../../../../components/theme/content/templates";
import { Collection } from "tinacms";
import { slugify } from "../../../../lib/utils";

export const sample: Collection  = {
  label: "Sample",
  name: "sample",
  path: "content/samples",
  format: "mdx",
  ui: {
    router: async ({ document }) => {
      // navigate to the post that was clicked
      return `/${document._sys.filename}`
    },
    filename: {
      // if true, the editor can not edit the filename
      readonly: true,
      // Example of using a custom slugify function
      slugify: values => slugify(values.title || ""),
    },
  },
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: 'New Sample',
      date: new Date().toISOString(),
    }},

  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      required: true,
      templates: templateFields,
      isBody: true,
    },
  ],
}