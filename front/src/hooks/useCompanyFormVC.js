import { useState } from "react";
import { requestCompanyCreation } from "@/api/company";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/translation/useTranslation";

export default function useCompanyFormVC() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitRequestForm = async (values) => {
    try {
      setSubmitting(true);
      const response = await requestCompanyCreation({
        companyName: values.companyName,
        kbis: values.kbis,
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        address: values.address.value.name,
        longitude: values.address.value.geometry.coordinates[0],
        latitude: values.address.value.geometry.coordinates[1],
      });
      if (response.status === 201) {
        toast.success(t("yourRequestHasBeenSent"));
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      toast.error(t("anErrorOccurred"));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitRequestForm,
    submitting,
  };
}
