import { isPositiveInteger } from '#pruvious'
import { query, resolvePagePath } from '#pruvious/server'

export default defineEventHandler(async (event) => {
  const qs = getQuery(event)
  const page = qs.page ? Number(qs.page) : 1

  if (!isPositiveInteger(page)) {
    setResponseStatus(event, 400)
    return "The 'page' query parameter must be a positive integer"
  }

  const result = await query('posts')
    .select(['author', 'description', 'headline', 'path', 'publishDate', 'sharingImage'])
    .where('public', true)
    .order('publishDate', 'desc')
    .populate()
    .paginate(page, 3)

  return {
    ...result,
    records: await Promise.all(
      result.records.map(async (post) => ({
        ...post,
        path: await resolvePagePath(post.path, 'posts'),
      })),
    ),
  }
})
