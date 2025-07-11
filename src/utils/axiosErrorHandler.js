export function parseAxiosError(error) {
  if (error.response?.data) return error.response.data;

  return {
    message: error.message || 'Something went wrong.',
    code: 'UNKNOWN',
  };
}
