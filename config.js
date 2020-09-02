require('dotenv').config()

const config = {
  api: {
    host: process.env.API_HOST,
    port: process.env.API_PORT,
    logLevel: process.env.LOG_LEVEL
  },
  db: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
  }
}

module.exports = config
