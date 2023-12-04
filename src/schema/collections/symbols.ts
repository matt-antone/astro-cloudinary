import type { Collection } from "tinacms";
import { titleBlock } from "../templates/field-groups/title-block";
import { metaBlock } from "../templates/field-groups/meta-block";
import image from "../templates/field-groups/image";
import { templateFields } from "../templates/embeds";
// import franchises from "../../../content/taxonomies/franchises.json" assert { type: "json" }
// import quadrants from "../../../content/taxonomies/quadrants.json" assert { type: "json" }
// import timePeriods from "../../../content/taxonomies/time-periods.json" assert { type: "json" }
import taxonomies from "../../../content/settings/taxonomies.json" assert { type: "json" };

const featuredImg = { ...image }
featuredImg.name = "featuredImg"
featuredImg.label = "Featured Image"

export const pages: Collection = {
  label: "Symbols",
  name: "symbol",
  path: "content/symbols",
  format: "md",
  ui: {
    filename: {
      // if true, the editor can not edit the filename
      readonly: true,
      // Example of using a custom slugify function
      slugify: values => {
        return `${values?.title?.toLowerCase().replace(/ /g, '-')}`
      },
    },
    router: ({ document }) => {
      // navigate to the post that was clicked
      return `/${document._sys.filename}`
    },
  },
  // isBody: false,
  defaultItem: () => {
    return {
      // Return a default title and the current date as the default date
      title: 'New Symbol',
      date: new Date().toISOString(),
    }
  },
  fields: [
    ...titleBlock,
    {
      type: "object",
      name: "taxonomy",
      label: "Taxonomy",
      fields: taxonomies.list.map( tax => {
        switch (tax._template) {
          case 'presetField':
            return {
              type: "string",
              name: tax.name,
              label: tax.label,
              options: tax?.options?.map( o => {
                return {
                  label: o,
                  value: o,  
                }
              }) || [],
            }
          case 'tagsField':
            return {
              type: "string",
              name: tax.name,
              label: tax.label,
              list: true,
              ui: {
                component: "tags"
              }
            }
          default:
            return {
              type: "string",
              name: tax.name,
              label: tax.label,
            }
        }
      }),
    },
    {
      type: "string",
      name: "designers",
      label: "Designers",
      list: true,
    },
    {
      type: "string",
      name: "memory_alpha_url",
      label: "Memory Alpha url",
    },
    {
      type: "rich-text",
      name: "primary_reference",
      label: "Primary Reference"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
    ...metaBlock,
  ],
};

export default pages