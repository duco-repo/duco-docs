import { eventHandler, readBody, createError } from 'h3'
import { setStudioUserSession } from '#imports'

export default eventHandler(async (event) => {
  const { email, password } = await readBody<{ email?: string, password?: string }>(event)

  // ⚠️️ Implement your own secure validation logic here
  // This is a simplified example - use proper password hashing and validation
//   const user = await validateCredentials(email, password)
  const user = { id: 1, name: 'Test', email: 'Test@example.com' }

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials'
    })
  }

  await setStudioUserSession(event, {
    providerId: user.id,
    name: user.name,
    email: user.email,
  })

  return sendRedirect(event, '/tech')
})
