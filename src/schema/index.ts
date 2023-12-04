import { getBlockSchemas } from "./blocks"
import { getCollections } from "./collections"

export default {
  blocks: getBlockSchemas(),
  collections: getCollections(),
}