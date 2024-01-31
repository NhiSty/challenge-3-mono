
export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    MANAGER: "ROLE_MANAGER",
    USER: "ROLE_USER",
}

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    };

    const getRoles = () => {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken?.roles;
    }

    const saveToken = (userToken) => {
        localStorage.setItem("token", userToken);
    };

    return {
        setToken: saveToken,
        token: getToken(),
        roles: getRoles()
    };
}
