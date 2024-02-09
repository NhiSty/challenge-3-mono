import {apiClient} from "@/api/index";

export function getCompanyRequests() {
    return apiClient.get('/company_demands');
}

export function requestCompanyCreation(company) {
  return apiClient.post('/company_demands', {
    companyName: company.companyName,
    adresse: company.companyAddress,
    postalCode: company.companyPostalCode,
    city: company.companyCity,
    kbis: company.kbis,
    email: company.email,
    firstname: company.firstname,
    lastname: company.lastname,
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
