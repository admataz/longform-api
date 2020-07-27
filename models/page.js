const S = require('fluent-schema')

module.exports = {
  tableName: 'page',
  resourceName: 'page',
  fields: [
    {
      name: 'slug',
      dbType: 'text',
      inputType: 'textfield',
      nullable: false,
      schemaType: S.string().pattern(/^([a-zA-Z0-9-_]+)$/)
    },
    {
      name: 'template',
      dbType: 'text',
      inputType: 'textfield',
      nullable: false,
      schemaType: S.string()
    },
    {
      name: 'section',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      schemaType: S.string()
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
    },
    {
      name: 'navintro',
      dbType: 'text',
      inputType: 'textarea',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'image',
      dbType: 'text',
      inputType: 'media',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'video',
      dbType: 'text',
      inputType: 'media',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'bgimage',
      dbType: 'text',
      inputType: 'media',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'bgvideo',
      dbType: 'text',
      inputType: 'media',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'bgopacity',
      dbType: 'numeric',
      inputType: 'number',
      nullable: true,
      schemaType: S.number()
    }
  ],
  required: {
    create: ['slug', 'template']
  }
}
