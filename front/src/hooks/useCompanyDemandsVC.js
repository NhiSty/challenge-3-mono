import {useState} from "react";
import {acceptCompanyRequest, getCompanyPendingRequest, getCompanyRequest, rejectCompanyRequest} from "@/api/company";
import {useNavigate} from "react-router-dom";

export default function useCompanyDemandsVC() {
    const [loading, setLoading] = useState(false);
    const [ loadingDecision, setLoadingDecision ] = useState(false);
    const [ demands, setDemands ] = useState();
    const [ demand, setDemand ] = useState();
    const navigate = useNavigate();

    const getPendingDemands = async () => {
        try {
            setLoading(true);
            const response = await getCompanyPendingRequest();
            setDemands(response.data["hydra:member"]);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    const getDemandById = async (id) => {
        try {
            setLoading(true);
            const response = await getCompanyRequest(id);
            console.log(response)
            setDemand(response.data);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    const acceptDemand = async (id) => {
        try {
            setLoadingDecision(true);
            await acceptCompanyRequest(id);
            navigate("/manager/demands");
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoadingDecision(false);
        }
    }

    const rejectDemand = async (id) => {
        try {
            setLoadingDecision(true);
            await rejectCompanyRequest(id);
            navigate("manager/demands");
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoadingDecision(false);
        }
    }

    return {
        loading,
        loadingDecision,
        demands,
        demand,
        getPendingDemands,
        getDemandById,
        acceptDemand,
        rejectDemand,
    }
}
