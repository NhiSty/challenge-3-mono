import { useEffect, useState } from "react";
import useTokens from "@/hooks/useTokens";

/**
 * @param {number} userId
 * @returns {{availabilities: ApiBooking[], refreshBookings: () => void}}
 */
export function useBookings(userId) {
  const [bookings, setBookings] = useState([]);
  const tokens = useTokens();

  const refreshBookings = () => {
    if (!userId || !tokens) return;

    fetch(`/bookings`, {
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data["hydra:member"]));
  };

  useEffect(refreshBookings, [userId, tokens]);

  return { bookings, refreshBookings };
}
