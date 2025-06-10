import { defineCollection, isObject, type QueryBuilderInstance } from '#pruvious'

// @see https://pruvious.com/docs/collections
export default defineCollection({
  name: 'settings',
  mode: 'single',
  apiRoutes: {
    read: 'public', // We want to be able to read the settings from the frontend
  },
  fields: {
    menu: {
      type: 'repeater',
      options: {
        subfields: {
          link: {
            type: 'link',
            options: {
              required: true,
            },
          },
          label: {
            type: 'text',
            options: {
              required: true,
            },
          },
        },
        addLabel: 'Add menu item',
        fieldLayout: [['link', 'label']], // Display the subfields in a single row
      },
    },
    copyrightText: {
      type: 'text',
      options: {
        required: true,
      },
    },
    socialMedia: {
      type: 'repeater',
      options: {
        subfields: {
          icon: {
            type: 'icon',
            options: {
              required: true,
            },
          },
          link: {
            type: 'link',
            options: {
              required: true,
            },
          },
          title: {
            type: 'text',
            options: {
              description: 'An optional title displayed on hover',
            },
          },
        },
        addLabel: 'Add social media link',
        fieldLayout: [['icon | 12rem', 'link', 'title']], // Display the subfields in a single row
      },
    },
    blogLandingPage: {
      type: 'link',
      options: {
        required: true,
        description: 'The page where all blog posts are listed',
      },
    },
    recaptcha: {
      type: 'switch',
      options: {
        label: 'Enable reCAPTCHA on forms',
      },
    },
    recaptchaSiteKey: {
      type: 'text',
      options: {
        required: true,
        description: 'The site key provided by Google reCAPTCHA',
      },
      additional: {
        conditionalLogic: { recaptcha: true },
      },
    },
    recaptchaSecretKey: {
      type: 'text',
      options: {
        required: true,
        description: 'The secret key provided by Google reCAPTCHA (only visible to admins)',
      },
      additional: {
        conditionalLogic: { recaptcha: true },
        guards: [
          ({ input }) => {
            // Prevent non-admins from updating the secret key
            if (isObject(input) && input.recaptchaSecretKey) {
              delete input.recaptchaSecretKey
            }
          },
        ],
      },
    },
  },
  dashboard: {
    // Group fields in tabs
    fieldLayout: [
      {
        Header: ['menu'],
        Footer: ['copyrightText', 'socialMedia'],
        Blog: ['blogLandingPage'],
        Forms: ['recaptcha', ['recaptchaSiteKey', 'recaptchaSecretKey']],
      },
    ],
  },
  guards: [
    ({ currentQuery }) => {
      // Prevent the secret key from being read by non-admins
      const settingsQuery = currentQuery as QueryBuilderInstance<'settings'>
      settingsQuery.deselect(['recaptchaSecretKey'])
    },
  ],
})
