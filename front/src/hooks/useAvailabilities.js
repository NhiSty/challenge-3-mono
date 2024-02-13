import useTokens from "@/hooks/useTokens";
import { useEffect, useState } from "react";

/**
 * @param {number} userId
 * @returns {ApiAvailability[]}
 */
export function useAvailabilities(userId) {
  const tokens = useTokens();
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    if (!tokens || !userId) return;

    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/availabilities`,
      {
        headers: {
          authorization: `Bearer ${tokens.token}`,
        },
      },
    )
      .then((res) => res.json())
      .then(setAvailabilities);
  }, [userId, tokens]);

  return availabilities;
}
