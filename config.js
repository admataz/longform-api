require('dotenv').config()

const config = {
  api: {
    host: process.env.HOST,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL
  },
  db: {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME
  }
}

module.exports = config
