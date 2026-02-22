export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/community') {
    if (import.meta.client) {
      window.location.href = '/community'
      return abortNavigation()
    }
  }
})
