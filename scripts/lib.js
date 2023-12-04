/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
// const dotenv = require("dotenv");
// const fetch = require('node-fetch');
// const algoliasearch = require("algoliasearch/lite");
import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv'
dotenv.config();

export const getTinaQuery = async function (query) {
  try {
    const res = await fetch(
      `https://content.tinajs.io/1.4/content/${process.env.TINA_CLIENT_ID}/github/${process.env.PUBLIC_TINA_BRANCH}`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
          'X-API-KEY': process.env.TINA_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    )      
    const jsonData = await res.json()
    let data = jsonData.data
    return data || {}
  } catch (error) {
    console.log(error)
  }
}

const getTextFromAST = (obj) => {
  let text = ''
  for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
          if (typeof obj[property] == "object") {
              text = text+" "+getTextFromAST(obj[property]);
          }
          else {
            if(property === 'text'){
              text = text+" "+obj[property]
            }
          }
      }
  }
  return text
}

const transformPostsToSearchObjects = (posts) => {
  return posts.map( post => {
    let id = ""
    if(post?.node.id){
      id = post.node.id
      delete post.node.id
    }
    return {...post.node,objectID: id}
  })
}

export const buildAlgoliaIndex = async (indexName,posts) => {
  console.log(posts,indexName)
    try {
      const transformed = transformPostsToSearchObjects(posts);

      // initialize the client with your environment variables
      const client = algoliasearch(
        process.env.PUBLIC_ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_ADMIN_KEY,
      );

      // initialize the index with your index name
      const index = client.initIndex(indexName);

      // save the objects!
      const algoliaResponse = await index.replaceAllObjects(transformed);

      // check the output of the response in the console
      console.log(
        `🎉 Sucessfully added ${algoliaResponse.objectIDs.length} records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
          "\n",
        )}`,
      );
    } catch (error) {
      console.log(error);
    }
}

export default {
  getTextFromAST,
  getTinaQuery,
  transformPostsToSearchObjects,
  buildAlgoliaIndex
}

// exports.getTextFromAST = getTextFromAST
// exports.getTinaQuery = getTinaQuery
// exports.transformPostsToSearchObjects = transformPostsToSearchObjects
// exports.buildAlgoliaIndex = buildAlgoliaIndex
