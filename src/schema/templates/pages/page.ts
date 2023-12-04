import { titleBlock } from "../field-groups/title-block";
import { metaBlock } from "../field-groups/page-meta-block";
import embeds from "../embeds";
import type { Template, TinaField } from "tinacms";

const body:TinaField = {
  type: "rich-text",
  name: "body",
  label: "Content",
  isBody: true,
  templates: embeds.fields
}

export const pageTemplate: Template = {
  name: 'contentPage',
  label: 'Content Page',
  fields: [
    ...titleBlock,
    body,
    ...metaBlock,
  ],
}