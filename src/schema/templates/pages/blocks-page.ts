import type { Template } from "tinacms";
import { titleBlock } from "../field-groups/title-block";
import { metaBlock } from "../field-groups/post-meta-block";
import { getBlockSchemas } from "../../blocks";

export const blocksPageTemplate: Template = {
  name: 'blocksPage',
  label: 'Blocks Page',
  fields: [
    ...titleBlock,
    {
      type: "boolean",
      name: "showPageTitle",
      label: "Show Page Title",
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: false,
      },
      templates: getBlockSchemas(),
    },
    {
      type: "boolean",
      name: "indexPage",
      label: "Index this page",
    },
    ...metaBlock,
  ],
}