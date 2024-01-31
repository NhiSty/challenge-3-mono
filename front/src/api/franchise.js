import {apiClient} from "@/api/index";

export function getFranchises() {
    return apiClient.get('/franchises');
}
