import type { Template } from "tinacms";
import embeds from "../../../templates/embeds"
import { headingSchema } from "../../../templates/field-groups/heading";
import { blockStyleSchema } from "../../../templates/field-groups/block-styles";
import { defaultGrid } from "./default";

export const schema: Template = {
  label: "Grid",
  name: "grid",
  ui: {
    previewSrc: "/blocks/grid.png",
    defaultItem: defaultGrid
  },
  fields: [
    headingSchema,
    {
      label: "Columns",
      name: "columnData",
      type: "object",
      list: true,
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string",
        },
        {
          label: "Content",
          name: "content",
          type: "rich-text",
          templates: embeds.fields,
        }
      ],
    },
    {
      label: "Grid items per row",
      name: "gridItems",
      type: "string",
      ui: {
        defaultValue: "2",
      },
      options: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "3",
          value: "3"
        },
        {
          label: "4",
          value: "4"
        },
      ],
    },
    ...blockStyleSchema
  ],
};
