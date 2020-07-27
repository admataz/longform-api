const routeMaster = require('./lib/routemaster')
// const pageModel = require('./models/page')
const models = require('./models')

const {
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE
} = process.env

module.exports = function (fastify, opts, next) {
  fastify.register(require('fastify-cors'), {
    origin: '*'
  })

  fastify.register(require('fastify-postgres'), {
    connectionString: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`
  })

  fastify.register(require('fastify-sensible'))

  models.forEach(model => {
    fastify.register(routeMaster, {
      prefix: '/api',
      routemaster: { model }
    })
  })

  next()
}
