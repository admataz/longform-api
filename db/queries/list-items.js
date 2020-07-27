const SQL = require('@nearform/sql')

function listItems (model, {
  find = '',
  pg = 0,
  limit = 30,
  cols = [],
  only = [],
  orderby = 'created_at',
  dir = 'asc'
}) {
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
    WHERE true
    `, { unsafe: true })

  if (only.length) {
    sql.append(SQL`
    AND id = ANY(${only})
    `)
  }

  if (find) {
    const searches = model.fields.filter(col => col.dbType === 'text').map(col => {
      const searchLine = SQL``
      searchLine.append(SQL`${col.name.toLowerCase()} LIKE `, { unsafe: true })
      searchLine.append(SQL`${`%${find}%`}`)
      return searchLine
    })

    sql.append(SQL`AND  (`)
    sql.append(sql.glue(searches, ' OR '))
    sql.append(SQL`)`)
  }

  if (validCols.includes(orderby) && (dir === 'asc' || dir === 'desc')) {
    sql.append(SQL`
    ORDER BY "${orderby}"  ${dir}`, { unsafe: true })
  }

  if (limit) {
    sql.append(SQL`
    LIMIT ${limit} OFFSET ${pg}
    `)
  }
  return sql
}

module.exports = listItems
