import { deleteEmailByUid } from '../../utils/emailStore'

export default defineEventHandler((event) => {
  const uid = Number(getRouterParam(event, 'uid'))
  if (isNaN(uid)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid UID' })
  }

  const success = deleteEmailByUid(uid)
  if (!success) {
    throw createError({ statusCode: 404, statusMessage: 'Email not found' })
  }

  return { success: true }
})
