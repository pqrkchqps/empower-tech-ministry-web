const COOKIE_NAME = "Empower";

export const saveToCookie = (cookie) => {
  let now = new Date();
  now.setTime(now.getTime() + 1 * 3600 * 1000);

  document.cookie = `${COOKIE_NAME}=${JSON.stringify(
    cookie
  )};path=/;expires=${now.toUTCString()};`;
};

export const readCookie = () => {
  const cookies = document.cookie.split(";");
  let cookieJSON = "";
  cookies.forEach((cookie) => {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.startsWith(COOKIE_NAME)) {
      cookieJSON = cookie.replace(`${COOKIE_NAME}=`, "");
    }
  });
  const cookie = cookieJSON
    ? JSON.parse(cookieJSON)
    : { token: null, user: null, isLoggedIn: false };
  return cookie;
};

export const updateCookie = (key, value) => {
  const cookie = readCookie();

  cookie[key] = value;
  console.log(cookie);

  saveToCookie(cookie);
};
