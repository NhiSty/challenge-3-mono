import { apiClient } from "@/api/index";

// for manager
export function getFranchisesByUser() {
  return apiClient.get(`/franchises/kpi/user`);

}

// for admin
export function getFranchises() {
  return apiClient.get(`/franchises/kpi`);

}

export function getCurrentMonthAllBooking() {
  return apiClient.get("/booking/kpi");
}

export function getBookingByMonth() {
  return apiClient.get("/booking/monthly/kpi");
}

// for manager
export function getBookingByYear() {
  return apiClient.get("/booking/year/kpi");
}

// for admin

export function getAllCompanies() {
  return apiClient.get("/company/kpi");
}

// for admin
export function getStatusCompanyDemand() {
  return apiClient.get("/companyDemand/kpi");
}
