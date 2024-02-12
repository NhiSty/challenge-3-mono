import { useState } from "react";
import {
  acceptCompanyRequest,
  getCompanyPendingRequest,
  getCompanyRequest,
  rejectCompanyRequest,
} from "@/api/company";
import { useNavigate } from "react-router-dom";
import base64ToUrl from "@/utils/base64ToUrl";

export default function useCompanyDemandsVC() {
  const [loading, setLoading] = useState(false);
  const [loadingDecision, setLoadingDecision] = useState({
    acceptLoading: false,
    refuseLoading: false,
  });
  const [demands, setDemands] = useState();
  const [demand, setDemand] = useState();
  const [kbisUrl, setKbisUrl] = useState();
  const navigate = useNavigate();

  const getPendingDemands = async () => {
    try {
      setLoading(true);
      const response = await getCompanyPendingRequest();
      setDemands(response.data["hydra:member"]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getDemandById = async (id) => {
    try {
      setLoading(true);
      const response = await getCompanyRequest(id);
      const kbis = await base64ToUrl(response.data.kbis);
      setKbisUrl(kbis);
      setDemand(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const acceptDemand = async (id) => {
    try {
      setLoadingDecision({
        ...loadingDecision,
        acceptLoading: true,
      });
      await acceptCompanyRequest(id);
      navigate("/manager/demands");
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDecision({
        ...loadingDecision,
        acceptLoading: false,
      });
    }
  };

  const rejectDemand = async (id) => {
    try {
      setLoadingDecision({
        ...loadingDecision,
        refuseLoading: true,
      });
      await rejectCompanyRequest(id);
      navigate("/manager/demands");
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDecision({
        ...loadingDecision,
        refuseLoading: false,
      });
    }
  };

  return {
    loading,
    loadingDecision,
    demands,
    demand,
    kbisUrl,
    getPendingDemands,
    getDemandById,
    acceptDemand,
    rejectDemand,
  };
}
