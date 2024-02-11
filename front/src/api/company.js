import {apiClient, apiPublicClient} from "@/api/index";

export function getCompanyRequests() {
    return apiClient.get('/company_demands');
}

export function getCompanyPendingRequest() {
    return apiClient.get(`/company_demands?status=pending`);
}

export function requestCompanyCreation(company) {
  return apiPublicClient.post('/company_demands', {
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
    decision: 'accepted',
  });
}

export function rejectCompanyRequest(id) {
    return apiClient.post(`/company_demands/${id}/decision`, {
        decision: 'rejected',
    });
}
