import type { Collection } from "tinacms";
import { titleBlock } from "../templates/field-groups/title-block";
import { metaBlock } from "../templates/field-groups/post-meta-block";
import image from "../templates/field-groups/image";
import slugify from "slugify";
import { helpTemplate } from "../templates/pages/help"
import { faqTemplate } from "../templates/pages/faqPage";

const featuredImg = {...image}
featuredImg.name = "featuredImg"
featuredImg.label = "Featured Image"

export const help: Collection = {
  label: "Help",
  name: "help",
  path: "content/help",
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
      return `/loan-help/${document._sys.filename}`
    },
  },
  // isBody: false,
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: 'New Post',
      date: new Date().toISOString(),
    }},
    templates: [
      helpTemplate,
      faqTemplate
    ]
};

export default help