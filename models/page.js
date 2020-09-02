const S = require('fluent-schema')

module.exports = {
  info: {
    singular: 'page',
    plural: 'pages',
    description: 'Nodes in the site structure'
  },
  tableName: 'page',
  resourceName: 'page',
  fields: [
    {
      name: 'title',
      label: 'Title',
      dbType: 'text',
      inputType: 'textfield',
      nullable: false,
      schemaType: S.string()
    },
    {
      name: 'pagenumber',
      label: 'Page number (position)',
      dbType: 'numeric',
      inputType: 'number',
      nullable: false,
      schemaType: S.number().default(0)
    },
    {
      name: 'slug',
      label: 'URL slug',
      dbType: 'text',
      inputType: 'textfield',
      nullable: false,
      schemaType: S.string().pattern(/^([a-zA-Z0-9-_]+)$/),
      helperText: 'Input must be valid for a URL (only numbers, letters, _ or -)'
    },
    {
      name: 'template',
      label: 'Display Template',
      dbType: 'text',
      inputType: 'textfield',
      nullable: false,
      schemaType: S.string()
    },
    {
      name: 'section',
      label: 'Section ID',
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
      label: 'Subtitle',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'bodycopy',
      label: 'Main content',
      dbType: 'text',
      inputType: 'richtext',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'navintro',
      label: 'Navigation intro',
      dbType: 'text',
      inputType: 'textarea',
      nullable: true,
      schemaType: S.string()
    },
    {
      name: 'image',
      label: 'Featured Image URL',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      helperText: 'must be a valid URL (https://...)',
      schemaType: S.anyOf([S.string().format(S.FORMATS.URI), S.string().maxLength(0)])
    },
    {
      name: 'video',
      label: 'Featured Video URL',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      helperText: 'must be a valid URL (https://...)',
      schemaType: S.anyOf([S.string().format(S.FORMATS.URI), S.string().maxLength(0)])
    },
    {
      name: 'bgimage',
      label: 'Background Image URL',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      helperText: 'must be a valid URL (https://...)',
      schemaType: S.anyOf([S.string().format(S.FORMATS.URI), S.string().maxLength(0)])
    },
    {
      name: 'bgvideo',
      label: 'Background video URL',
      dbType: 'text',
      inputType: 'textfield',
      nullable: true,
      helperText: 'must be a valid URL (https://...)',
      schemaType: S.anyOf([S.string().format(S.FORMATS.URI), S.string().maxLength(0)])
    },
    {
      name: 'bgopacity',
      label: 'Background Opacity (%)',
      dbType: 'numeric',
      inputType: 'number',
      nullable: true,
      schemaType: S.number().default(100)
    }
  ],
  required: {
    create: ['title', 'slug', 'template', 'pagenumber']
  }
}
