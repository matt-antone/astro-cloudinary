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

const taxonomy: TinaField = {
  label: "Taxonomy",
  name: "taxonomy",
  type: "object",
  fields: [
    {
      label: "Categories",
      name: "categories",
      type: "string",
      list: true,
      // options: categoryOptions
    }
  ],
}

const categories: TinaField = {
  type: "string",
  name: "categories",
  label: "Categories",
  list: true,
}

const tags: TinaField = {
  type: "string",
  name: "tags",
  label: "Tags",
  list: true,
  ui: {
    component: "tags",
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

const indexPage: TinaField = {
  type: "boolean",
  name: "indexPage",
  label: "Index this page",
}


export const metaBlock = [
  featured,
  excerpt,
  categories,
  tags,
  pageTemplate,
  // indexPage
]