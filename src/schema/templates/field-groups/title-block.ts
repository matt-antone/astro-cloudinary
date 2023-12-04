import type { TinaField } from "tinacms"


const published: TinaField =   {
  type: "boolean",
  label: "Published",
  name: "published",
}

const date: TinaField =   {
  type: "datetime",
  label: "Posted Date",
  name: "date",
  required: true,
  ui: {
    dateFormat: "MMMM DD YYYY",
    timeFormat: "hh:mm A",
  },
}

const title: TinaField =  {
  type: "string",
  label: "Title",
  name: "title",
  required: true,
  description: "Title displayed in an H1 element on this page.",
}

const metaTitle: TinaField =  {
  type: "string",
  label: "Meta Title",
  name: "metaTitle",
  required: false,
  description: "Title in the tab. Also used for SEO.",
}

export const titleBlock = [
  published,
  title,
  metaTitle,
  date,
]
