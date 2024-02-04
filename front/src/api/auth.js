import {apiPublicClient} from "@/api/index";

export async function login(email, password) {
  try {
    const response = await apiPublicClient.post("/api/login", {
      email,
      password,
    });

    if (response.status !== 200) {
      const errorMessage = await response.text;
      throw new Error(errorMessage);
    }
    const responseData = await response.data;

    localStorage.setItem("token", responseData.token);
  } catch (error) {
    throw new Error(`Erreur lors de la connexion : ${error.message}`);
  }
}

export async function register(data) {
  return await apiPublicClient.post("/users", {
    email: data.email,
    password: data.password,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
  });
}

/**
 * @typedef Jwt
 * @property {string} email
 * @property {string[]} roles
 * @property {number} id
 */

/**
 * @returns {null|{token: string, payload: Jwt}}
 */
export function getTokens() {
  try {
    const token = localStorage.getItem("token");
    const [, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    return {
      token,
      payload: decodedPayload,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
