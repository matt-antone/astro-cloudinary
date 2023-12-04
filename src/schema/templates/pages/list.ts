import { titleBlock } from "../field-groups/title-block";
import { metaBlock } from "../field-groups/post-meta-block";
import embeds from "../embeds";
import type { Template } from "tinacms";

export const listPageTemplate: Template = {
  name: 'listPage',
  label: 'List Page',
  fields: [
    ...titleBlock,
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: embeds.fields
    },
    {
      type: "boolean",
      name: "indexPage",
      label: "Index this page",
    },
    ...metaBlock,
  ],
}