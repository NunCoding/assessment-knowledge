export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isLoggingIn: false,
  }),
  actions: {
    setAuth(token, user) {
      const cookie = useCookie("auth_token");
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      cookie.value = token;
    },
    async login(credentials) {
      if (this.isLoggingIn) return;
      this.isLoggingIn = true;
      try {
        const response = await useFetchApi(api.login, {
          method: "POST",
          body: credentials,
        });
        if (!response?.token) {
          throw new Error("Authentication failed: No token received");
        }
        this.setAuth(response.token, response.user);
        await nextTick();
      } catch (error) {
        throw error;
      } finally {
        this.isLoggingIn = false;
      }
    },
    logout() {
      const cookie = useCookie("auth_token");
      this.token = null;
      this.user = null;
      cookie.value = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigateTo("/auth", { replace: true });
    },
  },
  persist: true,
  hydrate() {
    const cookie = useCookie("auth_token");

    if (process.server) {
      if (cookie.value) {
        this.token = cookie.value;
      }
    } else if (process.client) {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        this.token = storedToken;
        this.user = storedUser ? JSON.parse(storedUser) : null;
      }
    }
  },
});
