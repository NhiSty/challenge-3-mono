import { apiClient, apiPublicClient } from "@/api/index";

export async function getCompany() {
  const response = await apiClient.get(`/company`);
  return response.data;
}

export async function getCompanyById(id) {
  const response = await apiClient.get(`/companies/${id}`);
  return response.data;
}

export default async function fetchAllCompanies() {
  const response = await apiClient.get("/companies");
  return response.data["hydra:member"];
}

export function getCompanyRequests() {
  return apiClient.get("/company_demands");
}

export function getCompanyPendingRequest() {
  return apiClient.get(`/company_demands?status=pending`);
}

export function getCompanyRequest(id) {
  return apiClient.get(`/company_demands/${id}`);
}

export function requestCompanyCreation(company) {
  return apiPublicClient.post("/company_demands", {
    companyName: company.companyName,
    kbis: company.kbis,
    email: company.email,
    firstname: company.firstname,
    lastname: company.lastname,
    address: company.address,
    latitude: company.latitude,
    longitude: company.longitude,
  });
}

export function acceptCompanyRequest(id) {
  return apiClient.post(`/company_demands/${id}/decision`, {
    status: "accepted",
  });
}

export function rejectCompanyRequest(id) {
  return apiClient.post(`/company_demands/${id}/decision`, {
    status: "rejected",
  });
}
