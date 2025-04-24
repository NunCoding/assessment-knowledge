export async function useFetchApi(url, options = {}) {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');

  // Replace dynamic parameters in the URL (e.g., $id)
  const updatedUrl = url.replace(/\$(\w+)/g, (_, key) => {
    // Look for matching keys in `options.params` and replace
    return options.params && options.params[key] ? options.params[key] : `$${key}`;
  });

  try {
    const response = await $fetch(updatedUrl, {
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
