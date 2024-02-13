import { useEffect, useState } from "react";
import { apiClient } from "@/api";

/**
 * @param {number} userId
 * @returns {{availabilities: ApiBooking[], refreshBookings: () => void}}
 */
export function useBookings(userId) {
  const [bookings, setBookings] = useState([]);

  const refreshBookings = () => {
    if (!userId) return;

    apiClient(`/bookings`)
      .then((res) => (console.log(res), res))
      .then(({ data }) => setBookings(data["hydra:member"]));
  };

  useEffect(refreshBookings, [userId]);

  return { bookings, refreshBookings };
}
