import { Collection } from "tinacms";
import image from "../field-groups/image";
import { slugify } from "../../lib/utils";
import { loanTemplate } from "./templates/loan";

const featuredImg = {...image}
featuredImg.name = "featuredImg"
featuredImg.label = "Featured Image"

export const loans: Collection = {
  label: "Personal Loans",
  name: "personal",
  path: "content/personal-loans",
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
      return `/personal-loans/${document._sys.filename}`
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
    loanTemplate
  ]
  // fields: [
  //   ...titleBlock,
  //   {
  //     type: "rich-text",
  //     name: "body",
  //     label: "Body",
  //     isBody: true,
  //     templates: templateFields,
  //   },
  //   ...metaBlock,
  // ],
};

export default loans