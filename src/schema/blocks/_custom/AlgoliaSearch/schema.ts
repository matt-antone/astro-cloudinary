import type { Template } from "tinacms";
import { headingSchema } from "../../../../schema/templates/field-groups/heading";
import { blockStyleSchema } from "../../../../schema/templates/field-groups/block-styles";

export const schema:Template = {
  name: "algolia",
  label: "Algolia Search",
  ui: {
    previewSrc: "/blocks/Content.png",
    defaultItem: {
      index: 'posts',
      alignment: "default",
      textAlign: "left",
      prose: "prose prose-white prose-lg",
      theme: "default",
    }
  },
  fields: [
    headingSchema,
    {
      type: "string",
      name: "index",
      label: "Algolia Index",
      description: "Select an index to show.",
      // ui: {
      //   defaultItem: "posts",
      // },
      // options: [
      //   {
      //     value: "posts",
      //     label: "Posts"
      //   },
      //   {
      //     value: "all",
      //     label: "All Content"
      //   },
      // ]
    },
    {
      type: "string",
      name: "elementClass",
      label: "List Class Attribute",
      description: "This is a class attribute of the post container. You can use Tailwind classes here to modify the layout."
    },
    {
      type: "string",
      name: "itemClass",
      label: "Item Class Attribute",
      description: "This is a class attribute of the post. You can use Tailwind classes here to modify the post layout."
    },
    {
      type: "number",
      name: "qty",
      label: "Number of posts",
      description: "Defaults to 10 if empty"
    },
    {
      type: "boolean",
      name: "showPagination",
      label: "Show Pagination",
    },
    {
      type: "string",
      name: "itemLayout",
      label: "Item Layout",
      options: [
          "Default",
          "Card",
          "Post"
      ]
    },
    ...blockStyleSchema,
  ],
};