require('dotenv-expand')(require('dotenv').config())
const config = require('../config')

const Postgrator = require('postgrator')

const migrate = async () => {
  try {
    const action = process.argv[2] || 'build'
    const postgress = await new Postgrator({
      connectionString: config.db.databaseUrl,
      migrationDirectory: `${__dirname}/migrations/${action}`,
      driver: 'pg',
      // host: process.env.RDS_HOSTNAME,
      // port: process.env.RDS_PORT,
      // database: process.env.RDS_DB_NAME,
      // username: process.env.RDS_USERNAME,
      // password: process.env.RDS_PASSWORD,
      schemaTable: `schemaversion_${action}`
    })
    const appliedMigrations = await postgress.migrate()
    console.log(appliedMigrations)
  } catch (error) {
    console.error(error)
    process.exit()
  }
}

module.exports = migrate()
