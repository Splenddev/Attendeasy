export const getUserFromLocalStorageOrAPI = async () => {
  const cached = localStorage.getItem('user');
  if (cached) {
    return JSON.parse(cached); // must include isLoggedIn, role, etc.
  }
  return null;
};
