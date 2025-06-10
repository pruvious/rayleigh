import { isArray } from '#pruvious'
import { pruviousReadBody, query } from '#pruvious/server'

export default defineEventHandler(async (event) => {
  const input = await pruviousReadBody(event)

  if (isArray(input)) {
    setResponseStatus(event, 400)
    return 'Invalid input'
  }

  const { recaptcha, recaptchaSecretKey } = await query('settings')
    .select(['recaptcha', 'recaptchaSiteKey', 'recaptchaSecretKey'])
    .read()

  if (recaptcha) {
    const result = await $fetch<{ 'success': boolean; 'error-codes': string[] }>(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        query: {
          secret: recaptchaSecretKey,
          response: input.recaptcha,
        },
      },
    )

    if (!result.success) {
      setResponseStatus(event, 400)
      return 'reCAPTCHA: ' + result['error-codes'].join(', ')
    }
  }

  return query('messages').create(input as any)
})
