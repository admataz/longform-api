const SQL = require('@nearform/sql')

module.exports = function (fastify, opts, next) {
  fastify.route({
    url: '/page/reorder',
    method: 'POST',
    handler: async (request, reply) => {
      const client = await fastify.pg.connect()

      const sql = SQL`
        update page as t set
        pagenumber = c.pagenumber 
        from (values`

      const values = request.body.itemOrder.map((id, index) => SQL`(${id}::numeric, ${index + 1}::numeric)`)
      sql.append(sql.glue(values, ','))
      sql.append(SQL`
            ) as c(id, pagenumber) 
            where c.id::numeric = t.id::numeric;
      `)

      console.log(sql.debug)
      const updated = await client.query(sql)

      client.release()
      reply.status(201)
      return { data: updated }
    }
  })
  next()
}
