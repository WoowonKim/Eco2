// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem("accessToken") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem("accessToken");
};

// set the token and user from the session storage
export const setUserSession = (token) => {
  localStorage.setItem("accessToken", token);
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
