import {useState} from "react";
import {getCompanyPendingRequest} from "@/api/company";

export default function useCompanyDemands() {
    const [loading, setLoading] = useState(false);
    const [ demands, setDemands ] = useState();

    const getPendingDemands = async () => {
        try {
            setLoading(true);
            const response = await getCompanyPendingRequest();
            console.log(response)
            setDemands(response.data["hydra:member"]);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    return {
        loading,
        demands,
        getPendingDemands,
    }
}
