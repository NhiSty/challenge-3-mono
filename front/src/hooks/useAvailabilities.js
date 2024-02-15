import useTokens from "@/hooks/useTokens";
import { useEffect, useState } from "react";

/**
 * @param {number} userId
 * @returns {{availabilities: ApiAvailability[], refresh: () => void}}
 */
export function useAvailabilities(userId) {
  const tokens = useTokens();
  const [availabilities, setAvailabilities] = useState([]);

  const refresh = () => {
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
  };

  useEffect(refresh, [userId, tokens]);

  return { availabilities, refresh };
}
