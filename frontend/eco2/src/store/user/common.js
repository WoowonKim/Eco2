export const getUserEmail = () => {
  return (
    localStorage.getItem("email") || sessionStorage.getItem("email") || null
  );
};

export const getUserName = () => {
  return localStorage.getItem("name") || sessionStorage.getItem("name") || null;
};

export const getUserId = () => {
  return (
    localStorage.getItem("userId") || sessionStorage.getItem("userId") || null
  );
};

export const removeUserSession = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const setUserEmail = (autoLogin, email) => {
  if (autoLogin) {
    localStorage.setItem("email", email);
  } else {
    sessionStorage.setItem("email", email);
  }
};

export const setUserName = (autoLogin, name) => {
  if (autoLogin) {
    localStorage.setItem("name", name);
  } else {
    sessionStorage.setItem("name", name);
  }
};

export const setUserId = (autoLogin, userId) => {
  if (autoLogin) {
    localStorage.setItem("userId", userId);
  } else {
    sessionStorage.setItem("userId", userId);
  }
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
