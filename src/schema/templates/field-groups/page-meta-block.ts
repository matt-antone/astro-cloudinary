import type { TinaField } from "tinacms"
// import categories from '../../../content/taxonomies/categories.json' assert { type: 'json' }

// const categoryOptions = categories.value.map( cat => {
//   return {
//     label: cat,
//     value: cat
//   }
// } )

const featured: TinaField =   {
  type: "object",
  name: "featuredImg",
  label: "Featured Image",
  required: false,
  description: "Add some images for SEM use.",
  ui: {
    itemProps: (item) => {
      return { label: `${ item.alt ? item.alt : "New Image" }`}
    },
  },
  fields: [
    {
      label: "Source",
      name: "src",
      type: "image",
      required: false,
    },
    {
      label: "Alternative Text",
      name: "alt",
      type: "string",
      required: false,
    }
  ]
}

const excerpt: TinaField = {
  type: "string",
  label: "Description",
  name: "description",
  description: "Used on archive pages and for SEO. This description is displayed in search engine results.",
  ui: {
    component: "textarea",
  }
}

const pageTemplate: TinaField = {
  type: "string",
  name: "_template",
  label: "Template",
  ui: {
    component: () => { return null }
  }
}


export const metaBlock = [
  featured,
  excerpt,
  pageTemplate,
]