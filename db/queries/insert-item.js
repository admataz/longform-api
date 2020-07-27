const SQL = require('@nearform/sql')

function create (model, payload) {
  const fieldNames = model.fields.map(field => field.name)
  const values = fieldNames.map(f => SQL`${payload[f] || null}`)
  const insertClause = `INSERT INTO ${model.tableName} (${fieldNames.join(', ')}) `
  const sql = SQL``
  sql.append(SQL`${insertClause}`, { unsafe: true })
  sql.append(SQL` VALUES(`)
  sql.append(sql.glue(values, ','))
  sql.append(SQL`)
  RETURNING *`)

  return sql
}

module.exports = create
