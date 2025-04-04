export async function useFetchApi(url, options = {}) {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  try {
    const response = await $fetch(url, {
      baseURL: config.public.API_BASE_URL,
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        ...options.headers,
      },
      ...options,
    });
    return response;
  } catch (error) {
    throw error;
  }
}