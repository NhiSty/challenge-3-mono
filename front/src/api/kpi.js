import { apiClient } from "@/api/index";

//  For manager
export function getFranchisesByUser() {
  return apiClient.get(`/franchises/kpi/user`);
}
export function getCurrentMonthAllBooking() {
  return apiClient.get("/booking/kpi");
}
export function getManagerBookingByMonth() {
  return apiClient.get("/booking/monthly/manager/kpi");
}
export function getManagerBookingByYear() {
  return apiClient.get("/booking/year/manager/kpi");
}

//  For Admin
export function getAdminBookingByMonth() {
  return apiClient.get("/booking/monthly/admin/kpi");
}
export function getAllCompanies() {
  return apiClient.get("/company/kpi");
}
export function getStatusCompanyDemand() {
  return apiClient.get("/companyDemand/kpi");
}
export function getAdminBookingByYear() {
  return apiClient.get("/booking/year/admin/kpi");
}
