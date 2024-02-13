import { apiClient } from "@/api/index";

export async function fetchAllServices() {
  const response = await apiClient.get("/performances");

  return response.data["hydra:member"];
}

export function addService(service) {
  return apiClient.post("/performances", service);
}

export function removeService(id) {
  return apiClient.delete(`/performances/${id}`);
}

export function updateService(id, service) {
  return apiClient.patch(`/performances/${id}`, service);
}
