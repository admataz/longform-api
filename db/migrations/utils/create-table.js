const createTable = model => {
  const { tableName, fields } = model

  const fieldsSQL = fields.map(col => `\n${col.name} ${col.dbType.toUpperCase()} ${col.nullable ? '' : 'NOT'} NULL`)

  return (`
        CREATE TABLE ${tableName} (
            id SERIAL PRIMARY KEY,
            ${
                fieldsSQL.join(',\n')
            },
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        `)
}

module.exports = createTable
