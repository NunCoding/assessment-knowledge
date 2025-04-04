export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  // Wait for the next tick to ensure hydration is complete
  if (process.client) {
    await nextTick();
  }

  // Redirect logic
  if (auth.token && to.path.startsWith("/auth")) {
    return navigateTo("/admin/dashboard", { replace: true });
  }

  if (!auth.token && !to.path.startsWith("/auth")) {
    return navigateTo("/auth");
  }
});
