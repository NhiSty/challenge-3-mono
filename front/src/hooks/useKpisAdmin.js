import {
  getAdminBookingByMonth,
  getAdminBookingByYear,
  getAllCompanies,
  getStatusCompanyDemand,
} from "@/api/kpi";
import { useEffect, useState } from "react";

export default function useKpisAdmin() {
  const [monthlyBooking, setMonthlyBooking] = useState(0);
  const [isLoadingMonthlyBooking, setIsLoadingMonthlyBooking] = useState(false);

  const [yearlyBooking, setYearlyBooking] = useState(0);
  const [isLoadingYearlyBooking, setIsLoadingYearlyBooking] = useState(false);

  const [companies, setCompanies] = useState(0);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  const [bookingStates, setBookingStates] = useState(0);
  const [isLoadingBookingStates, setIsLoadingBookingStates] = useState(false);

  useEffect(() => {
    setIsLoadingBookingStates(true);
    getStatusCompanyDemand()
      .then((response) => {
        setBookingStates(response.data["statusDemand"]);
      })
      .finally(() => setIsLoadingBookingStates(false));
  }, []);

  useEffect(() => {
    setIsLoadingMonthlyBooking(true);
    getAdminBookingByMonth()
      .then((response) => {
        setMonthlyBooking(response.data["numberOfBookings"] || 0);
      })
      .finally(() => setIsLoadingMonthlyBooking(false));
  }, []);

  useEffect(() => {
    setIsLoadingYearlyBooking(true);
    getAdminBookingByYear()
      .then((response) => {
        setYearlyBooking(response.data["bookingsThisYear"] || 0);
      })
      .finally(() => setIsLoadingYearlyBooking(false));
  }, []);

  useEffect(() => {
    setIsLoadingCompanies(true);
    getAllCompanies()
      .then((response) => {
        setCompanies(response.data["numberOfCompany"] || 0);
      })
      .finally(() => setIsLoadingCompanies(false));
  }, []);

  return {
    monthlyBooking,
    isLoadingMonthlyBooking,
    yearlyBooking,
    isLoadingYearlyBooking,
    companies,
    isLoadingCompanies,
    bookingStates,
    isLoadingBookingStates,
  };
}
