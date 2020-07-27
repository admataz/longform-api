const S = require('fluent-schema')
const queries = require('../db/queries')

module.exports = function (fastify, opts, next) {
  const { routemaster: { model } } = opts
  const upsertSchema = model.fields.reduce((prev, curr) => prev.prop(curr.name, curr.schemaType), S.object())
  const readSchema = upsertSchema
    .prop('id', S.number())
    .prop('created_at', S.string().format('date-time'))
    .prop('modified_at', S.string().format('date-time'))
  const itemResponseSchema = S.object().prop('data', readSchema)
  const listResponseSchema = S.object().prop('data', S.array().items(readSchema))
  const validCols = Object.keys(readSchema.valueOf().properties)
  const numberQueryList = S.oneOf([S.string().pattern(/^\d+(,\d+)*$/), S.array().items(S.number())])
  fastify.route({
    url: `/${model.resourceName}`,
    method: 'POST',
    schema: {
      body: upsertSchema.required(model.required ? model.required.create || [] : []),
      response: {
        201: itemResponseSchema
      }
    },
    handler: async (request, reply) => {
      const client = await fastify.pg.connect()
      const { rows: [created] } = await client.query(queries.create(model, request.body))
      client.release()
      reply.status(201)
      return { data: created }
    }
  })

  fastify.route({
    url: `/${model.resourceName}/:id`,
    method: 'PUT',
    schema: {
      body: upsertSchema,
      params: S.object().prop('id', S.integer()),
      response: {
        200: itemResponseSchema
      }
    },
    handler: async request => {
      const client = await fastify.pg.connect()
      const { id } = request.params
      const { rows: [existing] } = await client.query(queries.select(model, id))
      if (!existing) {
        throw fastify.httpErrors.notFound()
      }
      const updatequery = queries.update(model, id, request.body)
      const updated = await client.query(updatequery)

      await client.release()
      return { data: updated.rows[0] }
    }
  })

  fastify.route({
    url: `/${model.resourceName}/:id`,
    method: 'GET',
    schema: {

      params: S.object().prop('id', S.integer()),
      response: {
        200: itemResponseSchema
      },
      query: S.object()
        .prop('cols', S.oneOf([S.string(), S.array().items(S.string())]))
    },
    handler: async request => {
      const client = await fastify.pg.connect()
      const { id } = request.params
      const { cols = [] } = request.query
      const colsArray = Array.isArray(cols) ? cols : cols.split(',')
      const res = await client.query(queries.select(model, id, { cols: colsArray }))
      client.release()

      if (res.rowCount === 0) {
        throw fastify.httpErrors.notFound()
      }

      return { data: res.rows[0] }
    }
  })

  fastify.route({
    url: `/${model.resourceName}`,
    method: 'GET',
    schema: {
      response: {
        200: listResponseSchema
      },
      query: S.object()
        .prop('cols', S.oneOf([S.string(), S.array().items(S.string())]))
        .prop('find', S.string())
        .prop('pg', S.number())
        .prop('limit', S.number())
        .prop('only', numberQueryList)
        .prop('orderby', S.enum(validCols))
        .prop('dir', S.enum(['asc', 'desc']))
    },
    handler: async (request) => {
      const client = await fastify.pg.connect()
      const {
        cols = [],
        find,
        pg,
        limit,
        only = [],
        orderby,
        dir
      } = request.query

      const colsArray = Array.isArray(cols) ? cols : cols.split(',')
      const onlyArray = Array.isArray(only) ? only : only.split(',')

      const { rows } = await client.query(queries.list(model, {
        cols: colsArray,
        find,
        pg,
        limit,
        only: onlyArray,
        orderby,
        dir
      }))

      await client.release()

      return {
        data: rows
      }
    }
  })

  fastify.route({
    url: `/${model.resourceName}/:id`,
    method: 'DELETE',
    handler: async request => {
      const client = await fastify.pg.connect()
      const { id } = request.params
      const res = await client.query(queries.delete(model, id))
      if (res.rowCount === 0) {
        throw (fastify.httpErrors.notFound())
      }
      return ''
    }
  })

  next()
}
