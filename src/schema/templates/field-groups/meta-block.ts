import type { TinaField,wrapFieldsWithMeta } from "tinacms"

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
      label: "Title",
      name: "title",
      type: "string",
      required: false,
    },
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
  label: "Excerpt",
  name: "excerpt",
  description: "Used on archive pages and for SEO. This description is displayed in search engine results.",
  ui: {
    component: "textarea",
  }
}

const taxonomy: TinaField = {
  label: "Taxonomy",
  name: "taxonomy",
  type: "object",
  ui: {
    // component: wrapFieldsWithMeta()
  },
  // ui: {
  //   component: wrapFieldsWithMeta(({ field, input, meta }) => {
  //     return (
  //       <div>
  //         <input
  //           name="saturation"
  //           id="saturation"
  //           type="range"
  //           min="0"
  //           max="10"
  //           step=".1"
  //           // This will pass along props.input.onChange to set our form values as this input changes.
  //           {...input}
  //         />
  //         <br />
  //         Value: {input.value}
  //       </div>
  //     )
  //   })
  // },
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
  // categories,
  // tags,
  pageTemplate,
]