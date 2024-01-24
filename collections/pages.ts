import { defineCollection } from '#pruvious'
import { pageLikeCollection } from '#pruvious/standard'

// @see https://pruvious.com/docs/collections
export default defineCollection(
  pageLikeCollection({
    name: 'pages',
    additionalFields: {
      footerBorder: {
        type: 'switch',
        options: {
          description: 'Display a border above the footer.',
        },
      },
    },
    additionalPublicPagesFields: ['footerBorder'],
  }),
)
