import type { TinaField } from "tinacms"
import aspectRatio from "./apscect-ratio"

const image: TinaField = {
  type: "object",
  name: "image",
  label: "Image",
  ui: {
    defaultItem: {
      width: 640,
      height: 480,
      aspectRatio: "landscape",
      priority: false
    }
  },
  fields: [
    {
      type: "image",
      name: "src",
      label: "Image"
    },
    {
      type: "string",
      name: "alt",
      label: "Alternative Text",
    },
    {
      type: "number",
      name: "width",
      label: "Width",
    },
    { 
      type: "number",
      name: "height",
      label: "Height",
    },
    ...aspectRatio,
    {
      type: "boolean",
      name: "contain",
      label: "Contain Image",
      description: "If true the entire image will be contained in the aspect ratio above."
    },
    {
      type: "boolean",
      name: "priority",
      label: "Priority",
      description: "If true, the image will no longer lazy load. Use only if this image is above the bottom of the browser on page load."
    }
  ]
}

export default image
export const imageFields = [...image.fields]