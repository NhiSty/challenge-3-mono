import {
  getAdminBookingByMonth,
  getAdminBookingByYear,
  getAllCompanies,
  getStatusCompanyDemand,
} from "@/api/kpi";
import { useEffect, useState } from "react";

export default function useKpisAdmin() {
  const [monthlyBooking, setMonthlyBooking] = useState(0);
  const [yearlyBooking, setYearlyBooking] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [bookingStates, setBookingStates] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const promises = [
      getStatusCompanyDemand().then((response) => {
        setBookingStates(response.data["statusDemand"]);
      }),
      getAdminBookingByMonth().then((response) => {
        setMonthlyBooking(response.data["numberOfBookings"] || 0);
      }),
      getAdminBookingByYear().then((response) => {
        setYearlyBooking(response.data["bookingsThisYear"] || 0);
      }),
      getAllCompanies().then((response) => {
        setCompanies(response.data["numberOfCompany"] || 0);
      }),
    ];

    Promise.all(promises)
        .finally(() => {
          setIsLoading(false);
        })
  }, []);

  return isLoading ? {
    monthlyBooking: 0,
    yearlyBooking: 0,
    companies: 0,
    bookingStates: 0,
    isLoading,
  } : {
    monthlyBooking,
    yearlyBooking,
    companies,
    bookingStates,
    isLoading,
  };
}
