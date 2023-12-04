import site from "../templates/pages/site"
import contactInfo from "../templates/field-groups/contact-info"
import theme from "../templates/pages/theme"
import taxonomies from "../templates/pages/taxonomy"
import slugify from "slugify"

const settings = {
  name: 'settings',
  label: 'Settings',
  path: 'content/settings',
  format: 'json',
  templates: [
    site,
    contactInfo,
    theme,
    // locations,
    taxonomies,
  ],
}

export default settings