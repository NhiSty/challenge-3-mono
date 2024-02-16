import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const ROLES = {
  ADMIN: "ROLE_ADMIN",
  MANAGER: "ROLE_MANAGER",
  EMPLOYEE: "ROLE_EMPLOYEE",
  USER: "ROLE_USER",
};

export default function useToken() {
  const [token, setToken] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [roles, setRoles] = useState([]);
  const getToken = () => {
    return localStorage.getItem("token") || null;
  };
  useEffect(() => {
    setToken(getToken());
    setRoles(getRoles());
    // eslint-disable-next-line
  }, []);

  const getRoles = () => {
    const tokenString = getToken();
    if (!tokenString) {
      return [];
    }
    const jwtDecoded = jwtDecode(tokenString);
    return jwtDecoded?.roles;
  };

  const saveToken = (userToken) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  const tokenIsValid = () => {
    const token = getToken();
    if (!token) {
      return false;
    }

    const jwtDecoded = jwtDecode(token);
    const now = Date.now().valueOf() / 1000;
    return jwtDecoded.exp > now;
  };

  const userId = () => {
    const token = getToken();
    if (!token) {
      return null;
    }
    const jwtDecoded = jwtDecode(token);
    return jwtDecoded?.id;
  };

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  return {
    setToken: saveToken,
    token,
    roles: getRoles(),
    isValid: tokenIsValid(),
    removeToken,
    userId,
  };
}
