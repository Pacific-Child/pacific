// Based on
// 1. https://gist.github.com/jayperryworks/5fbe47b1f3c14c826eee5d25eda2015f
// 2. https://moonhighway.com/fetching-data-from-a-graphql-api

// https://github.com/node-fetch/node-fetch
const fetch = require('node-fetch')
const fs = require('fs')
!fs.existsSync('source/data/albatross') && fs.mkdirSync('source/data/albatross')

const countriesQuery = `
  query {
    countries {
      id
      name
    }
  }
`;
// olas endpoint for search but it's empty so I tested with the pacific one
// const url = "https://iadb-olas-staging-d2f58d.iadb-olas-staging.c66.me/graphql";
const url = "https://pacific-child-staging-a97ee5.pacific-child-staging.c66.me/graphql";
// const url = "http://localhost:3000/graphql";
const countriesOpts = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ countriesQuery })
}
fetch(url, countriesOpts)
  .then(res => res.json())
  .then(
    ({ data }) =>
    fs.writeFile('source/data/albatross/countries.json', JSON.stringify(data), (error) => {
      if (error) throw error
    })
  )
  .catch(console.error)
