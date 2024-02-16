import {
  getFranchisesByUser,
  getCurrentMonthAllBooking,
  getManagerBookingByMonth,
  getManagerBookingByYear,
} from "@/api/kpi";
import { useEffect, useState } from "react";

export default function useKpisManager() {
  const [franchisesByUser, setFranchisesByUser] = useState(0);
  const [monthlyBooking, setMonthlyBooking] = useState(0);
  const [yearlyBooking, setYearlyBooking] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const promises = [
      getFranchisesByUser().then((response) => {
        setFranchisesByUser(response.data["numberOfFranchises"] || 0);
      }),

      getCurrentMonthAllBooking().then((response) => {
        setBookings(response.data["numberOfBookingThisMonth"] || 0);
      }),

      getManagerBookingByMonth().then((response) => {
        setMonthlyBooking(response.data["numberOfBookings"] || 0);
      }),

      getManagerBookingByYear().then((response) => {
        setYearlyBooking(response.data["bookingsThisYear"] || 0);
      }),
    ];

    Promise.all(promises)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return isLoading
    ? {
        franchisesByUser: 0,
        monthlyBooking: 0,
        yearlyBooking: 0,
        bookings: 0,
        isLoading,
      }
    : {
        franchisesByUser,
        monthlyBooking,
        yearlyBooking,
        bookings,
        isLoading,
      };
}
