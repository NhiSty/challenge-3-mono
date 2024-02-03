import { jwtDecode } from "jwt-decode";

export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    MANAGER: "ROLE_MANAGER",
    USER: "ROLE_USER",
}

export default function useToken() {
    const getToken = () => {
        return  localStorage.getItem("token");
    };

    const getRoles = () => {
        const tokenString = getToken();
        const jwtDecoded = jwtDecode(tokenString);
        return jwtDecoded?.roles;
    }

    const saveToken = (userToken) => {
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
    }

    return {
        setToken: saveToken,
        token: getToken(),
        roles: getRoles(),
        isValid: tokenIsValid(),
    };
}
