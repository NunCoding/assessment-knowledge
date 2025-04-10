export default defineNuxtRouteMiddleware(async (to, from) => {
  const tokenStorage = localStorage.getItem("token");
  
  // Wait for the next tick to ensure hydration is complete
  if (process.client) {
    await nextTick();
  }

  // Redirect logic
  if (tokenStorage && to.path.startsWith("/auth")) {
    return navigateTo("/admin/dashboard", { replace: true });
  }

  if (!tokenStorage && !to.path.startsWith("/auth")) {
    return navigateTo("/auth");
  }
});
