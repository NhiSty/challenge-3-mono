import {
  getFranchisesByUser,
  getCurrentMonthAllBooking,
  getBookingByMonth,
  getBookingByYear,
} from "@/api/kpi";
import { useEffect, useState } from "react";

export default function useKpisManager() {
  const [franchisesByUser, setFranchisesByUser] = useState(0);
  const [isLoadingFranchisesByUser, setIsLoadingFranchisesByUser] = useState(false);

  const [monthlyBooking, setMonthlyBooking] = useState(0);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);

  const [yearlyBooking, setYearlyBooking] = useState(0);
  const [isLoadingYearlyBooking, setIsLoadingYearlyBooking] = useState(false);

  const [bookings, setBookings] = useState(0);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);


  useEffect(() => {
    setIsLoadingBookings(true);
    getCurrentMonthAllBooking()
      .then((response) => {
        setBookings(response.data["numberOfBookingThisMonth"] || 0);
      })
      .finally(() => setIsLoadingBookings(false));
  }, []);

  useEffect(() => {
    setIsLoadingFranchisesByUser(true);
    getFranchisesByUser()
      .then((response) => {
        setFranchisesByUser(response.data["numberOfFranchises"] || 0);
      })
      .finally(() => setIsLoadingFranchisesByUser(false));
  }, []);

  useEffect(() => {
    setIsLoadingBooking(true);
    getBookingByMonth()
      .then((response) => {
        setMonthlyBooking(response.data["numberOfBookings"] || 0);
      })
      .finally(() => setIsLoadingBooking(false));
  }, []);

  useEffect(() => {
    setIsLoadingYearlyBooking(true);
    getBookingByYear()
      .then((response) => {
        setYearlyBooking(response.data["bookingsThisYear"] || 0);
      })
      .finally(() => setIsLoadingYearlyBooking(false));
  }, []);



  return {
    franchisesByUser,
    isLoadingFranchisesByUser,
    monthlyBooking,
    isLoadingBooking,
    yearlyBooking,
    isLoadingYearlyBooking,
    bookings,
    isLoadingBookings,
  };
}
