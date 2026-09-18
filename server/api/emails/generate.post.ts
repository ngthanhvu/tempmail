import { domains } from '../../utils/config'
import { saveInbox } from '../../utils/emailStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const username = typeof body?.username === 'string' ? body.username.trim() : ''
  const domain = typeof body?.domain === 'string' ? body.domain.trim() : ''

  if (!username) {
    throw createError({ statusCode: 400, statusMessage: 'Username is required' })
  }

  if (!domains.includes(domain)) {
    throw createError({ statusCode: 400, statusMessage: 'Domain not available' })
  }

  const local = username.toLowerCase().replace(/[^a-z0-9._-]/g, '')
  if (!local) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid username' })
  }

  const address = `${local}@${domain}`.toLowerCase()

  saveInbox(address, domain)

  return { address, domain, createdAt: new Date() }
})
