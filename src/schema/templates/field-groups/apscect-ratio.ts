import type { TinaField } from "tinacms"

const ar: TinaField = {
  type: "string",
  name: "aspectRatio",
  label: "Aspect Ratio",
  options: [
    {
      label: "Square",
      value: "square",
    },
    {
      label: "Portrait",
      value: "portrait",
    },
    {
      label: "Landscape",
      value: "landscape",
    },
    {
      label: "Letterbox",
      value: "letterbox",
    }
  ]
}

const contain: TinaField = {
  type: "boolean",
  name: "contain",
  label: "Contain Image",
  description: "If true the entire image will be contained in the aspect ratio above. If false the image will fill the aspect ratio and be cropped. "
}

const aspectRatio = [
  ar,
]

export default aspectRatio