export async function useFetchApi(url, options = {}) {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');
  try {
    const response = await $fetch(url, {
      baseURL: config.public.API_BASE_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    });
    return response;
  } catch (error) {
    throw error;
  }
}