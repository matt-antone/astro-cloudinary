import theme from '../../content/settings/theme.json' assert { type: 'json' }

// Get a list of colors from the colors set in Tina
export const getColorNames = () => {
  return Object.keys(theme.colors).map( k => {
    return k
  } )
}

// Returns hex colors or tailwind classes (if prefix is included) 
// in a Tina string field options array
export const getTinaTailwindColorOptions = (prefix = '') => {
  return getColorNames().map( (c:string) => {
    return { label: c, value: prefix.length > 0 ? `${prefix}${c.toLowerCase()}` : null}
  })
}