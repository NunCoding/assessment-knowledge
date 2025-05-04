export default defineNuxtRouteMiddleware(async (to, from) => {
  const tokenStorage = localStorage.getItem("token");
  const user = localStorage.getItem('user');
  
  if (process.client) {
    await nextTick();
  }
  const users = JSON.parse(user) ?? {};
  if (users.role == "student") {
    return navigateTo("/");
  }

  // Redirect logic
  if (tokenStorage && to.path.startsWith("/auth")) {
    return navigateTo("/admin/dashboard", { replace: true });
  }

  if (!tokenStorage && !to.path.startsWith("/auth")) {
    return navigateTo("/auth");
  }
});
