import type { Template } from "tinacms";
import { titleBlock } from "../field-groups/title-block";
import { metaBlock } from "../field-groups/post-meta-block";
import { templateFields } from "../embeds";

export const formTemplate: Template = {
  name: 'formPage',
  label: 'Form Page',
  fields: [ 
    ...titleBlock,
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: templateFields
    },
    ...metaBlock,
  ],
}