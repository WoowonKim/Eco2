// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem("accessToken") || null;
};

export const getUserEmail = () => {
  return localStorage.getItem("email") || null;
};

export const getUserName = () => {
  return localStorage.getItem("name") || null;
};

export const getUserId = () => {
  return localStorage.getItem("userId") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("userId");
};

// set the token and user from the session storage
export const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const setUserEmail = (email) => {
  localStorage.setItem("email", email);
};

export const setUserName = (name) => {
  localStorage.setItem("name", name);
};

export const setUserId = (userId) => {
  localStorage.setItem("userId", userId);
};

export const getCookie = (cookieName) => {
  let cookieValue = null;
  if (document.cookie) {
    let array = document.cookie.split(escape(cookieName) + "=");
    if (array.length >= 2) {
      let arraySub = array[1].split(";");
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;
};
