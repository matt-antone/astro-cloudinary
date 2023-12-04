import type { Template } from "tinacms";
import headingSchema from "../../../templates/field-groups/heading";
import defaultTestimonialBlock from "./default";

export const schema: Template = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: defaultTestimonialBlock,
  },
  fields: [
    headingSchema,
    {
      type: "string",
      ui: {
        component: "textarea",
      },
      label: "Quote",
      name: "quote",
    },
    {
      type: "rich-text",
      label: "Author",
      name: "author",
    },
  ],
};
