const SQL = require('@nearform/sql')

function deleteItem (model, id) {
  const sql = SQL``
  sql.append(SQL`DELETE FROM ${model.tableName} `, { unsafe: true })
  sql.append(SQL`WHERE id = ${id}`)

  sql.append(SQL`RETURNING id`)

  return sql
}

module.exports = deleteItem
