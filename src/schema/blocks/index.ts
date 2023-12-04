import * as blockComponents from "./_default"
export const blocks:any = { ...blockComponents }

export const getBlockSchemas = () => {
  const schemas = []
  for (const property in blocks) {
    schemas.push(blocks[property].schema.schema)
  }
  return schemas
}