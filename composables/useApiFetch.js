export async function useApiFetch(url, options = {}) {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch(url, {
      baseURL: config.public.API_BASE_URL,
      // Accept: "application/json",
      ...options,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
