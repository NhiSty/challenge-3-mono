export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
  };

  return {
    setToken: saveToken,
    token: getToken(),
  };
}
