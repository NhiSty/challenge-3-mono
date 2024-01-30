import { getTokens } from "@/api/auth";

/**
 * @param {User} partialUser
 * @returns {Promise<void>}
 */
export function updateUser(partialUser) {
  const url = `${import.meta.env.VITE_API_BASE_URL}/users/${partialUser.id}`;
  delete partialUser.id;

  const token = getTokens()?.token;
  if (!token) throw new Error("No token");

  return fetch(url, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/merge-patch+json",
    },
    body: JSON.stringify(partialUser),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Failed to update user");
    }
  });
}
