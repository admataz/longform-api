const models = require('../models')

module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/models-info',
    handler: async (req, reply) => {
      const cleanModels = models.map(model => {
        const { tableName, fields, ...remainders } = model

        const cleaned = {
          ...remainders,
          fields: fields.map(f => ({
            ...f,
            schemaType: f.schemaType.valueOf()
          }))

        }
        return cleaned
      })

      reply.send(cleanModels)
    }
  })
  next()
}
