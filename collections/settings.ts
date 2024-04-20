import { defineCollection } from '#pruvious'

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
  },
  dashboard: {
    // Group fields in tabs
    fieldLayout: [
      {
        Header: ['menu'],
        Footer: ['copyrightText', 'socialMedia'],
        Blog: ['blogLandingPage'],
      },
    ],
  },
})
