import type { Collection } from "tinacms";
import slugify from "slugify";
import { landingPageTemplate } from "../templates/pages/landing-page";
import { pageTemplate } from "../templates/pages/page";
import { listPageTemplate } from "../templates/pages/list";
import { faqTemplate } from "../templates/pages/faqPage";
import { blocksPageTemplate } from "../templates/pages/blocks-page";

export const pages: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: false,
      // Example of using a custom slugify function
      slugify: values => slugify(values.title),
    },
    router: async ({ document }) => {
      // navigate to the post that was clicked
      if(document._sys.filename === 'home'){
        return `/`
      }
      return `/${document._sys.relativePath.replace('.mdx','')}`
    },
  },
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: 'New Page',
      date: new Date().toISOString(),
      indexPage: true,
    }
  },
  // fields: [
  //   ...titleBlock
  // ],
  templates: [
    pageTemplate,
    landingPageTemplate,
    listPageTemplate,
    faqTemplate,
    blocksPageTemplate,
  ]
};

export default pages