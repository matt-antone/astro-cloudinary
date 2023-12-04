/* eslint-disable no-undef */
import dotenv from 'dotenv'
import posts from './symbols.js'

(async function () {
  (process.env.PUBLIC_ALGOLIA_APP_ID && 
  process.env.ALGOLIA_SEARCH_ADMIN_KEY && 
  posts("symbols")) || 
  console.log('error',process.env.PUBLIC_ALGOLIA_APP_ID,process.env.ALGOLIA_SEARCH_ADMIN_KEY)
})();
