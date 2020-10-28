module.exports = function (fastify, opts, next) {
  fastify.route({
    url: '/',
    method: 'GET',
    handler: (request, reply) => {
      reply.send({
        name: 'longform-api',
        health: 'ok'
      })
    }
  })
  next()
}
