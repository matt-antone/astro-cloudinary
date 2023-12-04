import type { Collection } from "tinacms";
import { titleBlock } from "../templates/field-groups/title-block";
import { metaBlock } from "../templates/field-groups/post-meta-block";
import image from "../templates/field-groups/image";
import embeds from "../templates/embeds";
import slugify from "slugify";

const featuredImg = {...image}
featuredImg.name = "featuredImg"
featuredImg.label = "Featured Image"

export const related: Collection = {
  label: "Related",
  name: "related",
  path: "content/related",
  format: "json",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: true,
      // Example of using a custom slugify function
      slugify: values => slugify(values.title || ""),
    },
    router: async ({ document }) => {
      // navigate to the post that was clicked
      return `/blog/${document._sys.filename}`
    },
  },
  // isBody: false,
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: 'New Post',
      date: new Date().toISOString(),
    }},
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
    },
    {
      type: "string",
      name: "file",
      label: "File Name",
    },
    {
      type: "object",
      name: "related",
      label: "Related",
      list: true,
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
        },
        {
          type: "string",
          name: "id",
          label: "Path",
        },
        {
          type: "object",
          name: "featuredImg",
          label: "Featured Image",
          fields: [
            {
              name: "src",
              label: "Image",
              type: "image",
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string",
            },
            {
              name: "title",
              label: "Title",
              type: "string",
            }
          ],
        }
      ]
    }
  ],
};

export default related