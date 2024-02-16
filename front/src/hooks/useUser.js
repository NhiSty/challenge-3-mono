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
 * @property {ApiBooking[]} bookingsMade[]
 * @property {ApiBooking[]} bookingsReceived[]
 * @property {ApiCompany[]} companies[]
 */

/**
 * @param {number} id
 * @returns {{isLoading: boolean, user: (User | null)}}
 */
export default function useUser(id) {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const tokens = useTokens();

  const refresh = () => {
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
      .then((json) => {
        setUser(json);

        if (json !== null) {
          fetch(`${import.meta.env.VITE_API_BASE_URL}${json.employee}`)
            .then((res) => (res.status === 200 ? res.json() : null))
            .then(setEmployee);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(refresh, [id, tokens]);

  return {
    isLoading,
    user: {
      ...user,
      employee,
    },
    refresh,
  };
}
