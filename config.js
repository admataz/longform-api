require('dotenv').config()

const {
  PORT,
  LOG_LEVEL,
  HOST,
  RDS_HOSTNAME,
  RDS_PORT,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_DB_NAME,
  DATABASE_URL,
  API_PREFIX
} = process.env

const config = {
  api: {
    port: PORT,
    logLevel: LOG_LEVEL,
    host: HOST,
    prefix: API_PREFIX || ''
  },
  db: {
    host: RDS_HOSTNAME,
    port: RDS_PORT,
    user: RDS_USERNAME,
    password: RDS_PASSWORD,
    database: RDS_DB_NAME,
    databaseUrl:
      DATABASE_URL ||
      `postgres://${RDS_USERNAME}:${RDS_PASSWORD}@${RDS_HOSTNAME}:${RDS_PORT}/${RDS_DB_NAME}`
  }
}

module.exports = config
