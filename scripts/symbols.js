/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import lib from './lib.js'
import dotenv from 'dotenv'
dotenv.config();

const buildPosts = async function (indexName = 'unnamed') {
  const data = await lib.getTinaQuery(query);
  console.log(data)
  if(data?.symbolConnection){
    const { symbolConnection: { edges } } = data
    console.log(
      'building algolia index'
    )
    lib.buildAlgoliaIndex(indexName, edges)  
  }
}

export default buildPosts

const query = `

query GetSymbols {
  symbolConnection(first: 1000, filter: {published: {eq: true}}) {
    edges {
      node {
        published
        title
        metaTitle
        date
        body
        featuredImg {
          src
          alt
        }
        taxonomy {
          time
          quadrants
          universes
          affiliations
          types
          franchise
        }
        _template
        id
        _sys {
          filename
          title
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
      }
    }
  }
}

`