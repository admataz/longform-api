const fastify = require('fastify')({
  logger: { prettyPrint: true },
  ignoreTrailingSlash: true
})
const app = require('./app')
const config = require('./config')

fastify.register(app)

fastify.listen(config.api.port, config.api.host, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(config)
  fastify.log.info(`server listening on ${address}`)
})
