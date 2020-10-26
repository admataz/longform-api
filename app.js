const routeMaster = require('./lib/routemaster')
const models = require('./models')
const config = require('./config')

module.exports = function (fastify, opts, next) {
  fastify.register(require('fastify-cors'), {
    origin: '*'
  })

  fastify.register(require('fastify-postgres'), {
    connectionString: config.db.databaseUrl
  })

  fastify.register(require('fastify-sensible'))
  fastify.register(require('./lib/modelsinfo'), { prefix: '/api' })

  models.forEach(model => {
    fastify.register(routeMaster, {
      prefix: '/api',
      routemaster: { model }
    })
  })

  // extensions to the standard CRUD in the model
  fastify.register(require('./api/page'), { prefix: '/api' })
  next()
}
