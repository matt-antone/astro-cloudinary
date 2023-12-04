import type { Template } from "tinacms";
import { titleBlock } from "../field-groups/title-block";
import { metaBlock } from "../field-groups/post-meta-block";
import embeds from "../embeds";

export const faqTemplate: Template = {
  name: 'faqPage',
  label: 'FAQ Page',
  fields: [
    ...titleBlock,
    {
      type: "object",
      name: "faqs",
      label: "Questions",
      list: true,
      ui: {
        itemProps: item => {
          return { label: item?.question || "New Question"}
        }
      },
      fields: [
        {
          type: "string",
          name: "question",
          label: "Question",
        },
        {
          type: "rich-text",
          name: "answer",
          label: "Answer",
        },

      ]
    },
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