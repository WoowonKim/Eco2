// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem("key") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem("key");
};

// set the token and user from the session storage
export const setUserSession = (token) => {
  localStorage.setItem("key", token);
};
