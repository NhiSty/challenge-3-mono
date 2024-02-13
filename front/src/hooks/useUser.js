import { useEffect, useState } from "react";
import useTokens from "@/hooks/useTokens";

/**
 * @typedef User
 * @property {string} email
 * @property {string} username
 * @property {string} firstName
 * @property {string} lastName
 * @property {number} age
 * @property {number} id
 * @property {ApiAvailability[]} availabilities[]
 */

/**
 * @param {number} id
 * @returns {{isLoading: boolean, user: (User | null)}}
 */
export default function useUser(id) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const tokens = useTokens();

  useEffect(() => {
    if (tokens === null) {
      setUser(null);
      return;
    }

    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
      method: "get",
      headers: {
        authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((res) => (res.status === 200 ? res.json() : null))
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [id, tokens]);

  return { isLoading, user };
}
