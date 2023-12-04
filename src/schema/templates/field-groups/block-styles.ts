import type { TinaField } from "tinacms"

const blockId: TinaField = {
  label: "Block ID",
  name: "blockId",
  type: "string",
}

const blockClass: TinaField = {
  label: "Block Class",
  name: "blockClass",
  type: "string",
}

const containerClass: TinaField = {
  label: "Container Class",
  name: "containerClass",
  type: "string",
}

export const blockStyleSchema = [
  blockId,
  blockClass,
  containerClass,
]

export default blockStyleSchema