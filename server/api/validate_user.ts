// ~/server/api/telegram/validate.post.ts
import { createHmac } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const botToken = config.telegram_bot

  if (!botToken) {
    console.error('Missing telegram_bot in runtime config')
    throw createError({
      statusCode: 500,
      statusMessage: 'Server misconfiguration: Telegram token is missing'
    })
  }

  const body = await readBody(event).catch(() => null)

  if (!body?.initData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Telegram initData in request body'
    })
  }

  try {
    const params = new URLSearchParams(body.initData)
    const hash = params.get('hash')

    if (!hash) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing hash in initData'
      })
    }

    const dataCheckString = [...params.entries()]
      .filter(([key]) => key !== 'hash')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => `${key}=${val}`)
      .join('\n')

    const secretKey = createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest()

    const calculatedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex')

    if (calculatedHash !== hash) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Invalid Telegram data signature'
      })
    }

    const userStr = params.get('user')
    if (!userStr) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing user data in initData'
      })
    }

    let user
    try {
      user = JSON.parse(userStr)
    } catch (e) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid user JSON format'
      })
    }

    const queryId = params.get('query_id')

    return {
      status: 'success',
      valid: true,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name || null,
        username: user.username || null,
        language_code: user.language_code || null,
        is_premium: user.is_premium || false
      },
      queryId: queryId || null
    }

  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('Telegram validation failed:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during validation'
    })
  }
})
