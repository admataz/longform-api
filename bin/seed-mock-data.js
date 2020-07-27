require('dotenv-expand')(require('dotenv').config())
// const faker = require('faker')
const { Client } = require('pg')
async function seedData () {
  const client = new Client()
  await client.connect()

  await client.end()
}

module.exports = seedData

seedData().catch(err => console.log(err))
