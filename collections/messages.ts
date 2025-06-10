import { defineCollection } from '#pruvious'
import { emailValidator } from '#pruvious/server'

// @see https://pruvious.com/docs/collections
export default defineCollection({
  name: 'messages',
  mode: 'multi',
  apiRoutes: {
    create: false,
    createMany: false,
    update: false,
    updateMany: false,
  },
  dashboard: {
    icon: 'Mail',
  },
  fields: {
    name: {
      type: 'text',
      options: {
        required: true,
      },
      additional: {
        immutable: true,
      },
    },
    email: {
      type: 'text',
      options: {
        required: true,
      },
      additional: {
        immutable: true,
        validators: [emailValidator],
      },
    },
    message: {
      type: 'text-area',
      options: {
        required: true,
      },
      additional: {
        immutable: true,
      },
    },
  },
})
