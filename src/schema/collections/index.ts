import taxonomies from './taxonomy'
import menus from "./menus"
import settings from "./settings"
import pages from './pages'
import posts from './posts'
import help from './help'
import symbols from './symbols'
import related from './related'

export * as settings from "./settings"

const collections:any = [
  symbols,
  posts,
  pages,
  help,
  taxonomies,
  menus,
  settings,
  related
]

export const getCollection = (name:string) => {
  return collections.find((collection:any) => collection.name === name)
}

export const getCollections = () => {
  return collections
}

export default collections