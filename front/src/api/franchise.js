import { apiClient } from "@/api/index";

export function getFranchises() {
  return apiClient.get("/franchises");
}

export function addFranchises(franchise) {
  return apiClient.post("/franchises", franchise);
}

export function updateFranchise(franchise) {
  return apiClient.patch(`/franchises/${franchise.id}`, franchise);
}

export function deleteFranchise(id) {
  return apiClient.delete(`/franchises/${id}`);
}
