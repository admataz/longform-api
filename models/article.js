const S = require('fluent-schema')

module.exports = {
  tableName: 'article',
  resourceName: 'article',
  fields: [
    {
      name: 'slug',
      dbType: 'text',
      inputType: 'textfield',
      inputValidation: '[a-z0-9_]+',
      nullable: false,
      schemaType: S.string().required()
    },
    {
      name: 'title',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'intro',
      dbType: 'text',
      inputType: 'textarea',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'subheading',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'bodycopy',
      dbType: 'text',
      inputType: 'richtext',
      nullable: true,
      schemaType: S.string()
    }

  ]
}
