import { createContext, useState } from "react";
import { readCookie, updateCookie } from "../utils/cookie";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [interceptor, setInterceptor] = useState(null);

  function updateTokenInAxios(token) {
    axios.interceptors.request.eject(interceptor);
    const newInterceptor = axios.interceptors.request.use(
      (req) => {
        req.headers["auth-token"] = token;
        console.log("token", token);
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    setInterceptor(newInterceptor);
  }

  function loadUser(token, user) {
    updateCookie("token", token);
    updateCookie("user", user);
    updateCookie("isLoggedIn", true);
    setToken(token);
    setUser(user);
    setIsLoggedIn(true);
    updateTokenInAxios(token);
  }
  function unloadUser() {
    updateCookie("token", null);
    updateCookie("user", null);
    updateCookie("isLoggedIn", false);
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    updateTokenInAxios(null);
  }
  function loadFromCookie() {
    const { token, user, isLoggedIn } = readCookie();
    setToken(token);
    setUser(user);
    setIsLoggedIn(isLoggedIn);
    updateTokenInAxios(token);

    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response && err.response.status === 401) {
          unloadUser();
        }
        return Promise.reject(err);
      }
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, loadUser, unloadUser, loadFromCookie }}
    >
      {children}
    </AuthContext.Provider>
  );
}
