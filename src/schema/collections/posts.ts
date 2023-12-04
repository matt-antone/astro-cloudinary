import type { Collection } from "tinacms";
import { titleBlock } from "../templates/field-groups/title-block";
import { metaBlock } from "../templates/field-groups/post-meta-block";
import image from "../templates/field-groups/image";
import embeds from "../templates/embeds";
import slugify from "slugify";

const featuredImg = {...image}
featuredImg.name = "featuredImg"
featuredImg.label = "Featured Image"

export const posts: Collection = {
  label: "Blog",
  name: "post",
  path: "content/blog",
  format: "mdx",
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
    ...titleBlock,
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: embeds.fields,
    },
    ...metaBlock,
  ],
};

export default posts