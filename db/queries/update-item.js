const SQL = require('@nearform/sql')

function update (model, id, payload) {
  const validCols = model.fields.map(field => field.name)
  const keyvals = Object.entries(payload).filter(kv => validCols.includes(kv[0]))
  const updateClause = `UPDATE ${model.tableName} SET `

  const sql = SQL``
  sql.append(SQL`${updateClause}`, { unsafe: true })
  const updates = keyvals.map(kv => {
    const setVal = SQL``
    setVal.append(SQL`${kv[0]}=`, { unsafe: true })
    setVal.append(SQL`${kv[1]}`)
    return setVal
  })
  sql.append(sql.glue(updates, ' , '))
  sql.append(SQL`, modified_at=now()`)
  sql.append(SQL`WHERE id = ${id} 
  RETURNING *`)

  return sql
}

module.exports = update
