const S = require('fluent-schema')

module.exports = {
  info: {
    singular: 'article',
    plural: 'articles',
    description: 'A collection of pieces of writing'
  },
  tableName: 'article',
  resourceName: 'article',
  fields: [
    {
      name: 'slug',
      label: 'URL slug',
      dbType: 'text',
      inputType: 'textfield',
      inputValidation: '[a-z0-9_]+',
      nullable: false,
      schemaType: S.string()
    },
    {
      name: 'title',
      label: 'Title',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'intro',
      label: 'Introduction',
      dbType: 'text',
      inputType: 'textarea',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'subheading',
      label: 'Sub Title',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'bodycopy',
      label: 'Body Copy',
      dbType: 'text',
      inputType: 'richtext',
      nullable: true,
      schemaType: S.string()
    }

  ]
}
