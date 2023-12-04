import type { Template } from "tinacms";
import { titleBlock } from "../field-groups/title-block";
import { metaBlock } from "../field-groups/post-meta-block";
import embeds from "../embeds";

export const helpTemplate: Template = {
  name: 'helpPage',
  label: 'Help Page',
  fields: [
    ...titleBlock,
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: embeds.fields,
    },
    {
      type: "boolean",
      name: "indexPage",
      label: "Index this page",
    },
    ...metaBlock,
  ],
}