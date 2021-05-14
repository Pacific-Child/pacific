// Based on
// 1. https://gist.github.com/jayperryworks/5fbe47b1f3c14c826eee5d25eda2015f
// 2. https://moonhighway.com/fetching-data-from-a-graphql-api

// https://github.com/node-fetch/node-fetch
const fetch = require('node-fetch')
const fs = require('fs')
!fs.existsSync('source/data/albatross') && fs.mkdirSync('source/data/albatross');
const url = "http://api.pacific-child.org/graphql";

const countryArray = ['FJI', 'KIR', 'NIU', 'COK', 'FSM', 'WSM', 'NRU', 'PLW', 'PNG', 'MHL', 'SLB', 'TKL', 'TON', 'TUV', 'VUT']

const queryTopics = `
    query {
        topics {
            id
        }
    }
`;

const optsTopics = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: queryTopics })
};

(async () => {
    const topics = await fetch(url, optsTopics)
                            .then(res => res.json())
                            .then(res => {
                                return res.data.topics
                            })
                            .catch(console.error);
    const forLoop = async _ => {
        console.log('Start')
        for (let cindex = 0; cindex < countryArray.length; cindex++) {
            console.log(countryArray[cindex])
            const restructuredData = []
            for (let index = 0; index < topics.length; index++) {
                await fetch(
                    url,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ query: `
                            query {
                                dataPointValuesForTopic(countryCode: "${countryArray[cindex]}", topicId: ${topics[index].id}){
                                    country
                                    dataPoint {
                                        id
                                        body
                                        csvColumnName
                                        name
                                    }
                                }
                            }
                        ` })
                    }
                )
                    .then(res => res.json())
                    .then(res => {
                        const data = res.data.dataPointValuesForTopic
                        for (let index = 0; index < data.length; index++) {
                            const obj = data[index];
                            restructuredData.push({
                                value: obj.country,
                                dataPointName: obj.dataPoint.csvColumnName,
                                dataPoint: obj.dataPoint
                            })
                        }
                        return restructuredData
                    })
                    .catch(console.error);
            }
            console.log(restructuredData)
            fs.writeFile(`source/data/albatross/countries_${countryArray[cindex]}.json`, JSON.stringify(restructuredData), (error) => {
                if (error) throw error
            })
        }
        console.log('End')
    }
    forLoop()
})();