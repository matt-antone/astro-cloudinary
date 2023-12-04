import type { Template } from "tinacms";
import embeds from "../../../templates/embeds";
import { headingSchema } from "../../../templates/field-groups/heading";
import { blockStyleSchema } from "../../../templates/field-groups/block-styles";
import { defaultContent } from "./default";

export const schema: Template = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/Content.png",
    defaultItem: defaultContent
  },
  fields: [
    headingSchema,
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: embeds.fields,
    },
    ...blockStyleSchema,
  ],
};
