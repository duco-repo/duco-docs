export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('studio:auth:login', async ({ user, event }) => {
    console.log(`User ${user.email} logged in via ${user.provider}`)

    // ... Track login analytics
    // ... Notifications
    // ... Extra session management for custom auth
  })
  nitroApp.hooks.hook('studio:auth:logout', async ({ user, event }) => {
    // Log logout events
    console.log(`User ${user.email} logged out`)

    // ... Clean ressources
    // ... Notifications
    // ... Extra session management for custom auth
  })
})
