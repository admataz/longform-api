
const SQL = require('@nearform/sql')

function select (model, id, { cols = [] } = {}) {
  const validCols = [
    'id',
    ...model.fields.map(field => field.name),
    'created_at',
    'modified_at'
  ]

  const sql = SQL`SELECT 
    `
  if (cols.length) {
    const selectedCols = cols.filter(c => validCols.includes(c))
    const allCols = selectedCols.map(col => SQL`${col}`)
    sql.append(sql.glue(allCols, ','), { unsafe: true })
  } else {
    sql.append(SQL` * `)
  }

  sql.append(SQL`
    FROM ${model.tableName} d
    `, { unsafe: true })

  sql.append(SQL`
    WHERE id=${id}`)

  return sql
}

module.exports = select
