import {
  getFranchises,
  getCurrentMonthAllBooking,
  getBookingByMonth,
  getBookingByYear,
  getAllCompanies,
  getStatusCompanyDemand,
} from "@/api/kpi";
import { useEffect, useState } from "react";

export default function useKpisAdmin() {
  const [franchises, setFranchises] = useState(0);
  const [monthlyBooking, setMonthlyBooking] = useState(0);
  const [yearlyBooking, setYearlyBooking] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [bookingStates, setBookingStates] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    getStatusCompanyDemand()
        .then((response) => {
          setBookingStates(response.data["statusDemand"]);
        })
        .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCurrentMonthAllBooking()
      .then((response) => {
        setBookings(response.data["numberOfBookingThisMonth"] || 0);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getFranchises()
      .then((response) => {
        setFranchises(response.data["numberOfFranchises"] || 0);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getBookingByMonth()
      .then((response) => {
        setMonthlyBooking(response.data["numberOfBookings"] || 0);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getBookingByYear()
      .then((response) => {
        setYearlyBooking(response.data["bookingsThisYear"] || 0);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAllCompanies()
      .then((response) => {
        setCompanies(response.data["numberOfCompany"] || 0);
      })
      .finally(() => setIsLoading(false));
  }, []);


  return {
    franchises,
    bookings,
    monthlyBooking,
    yearlyBooking,
    companies,
    bookingStates,
    isLoading,
  };
}
