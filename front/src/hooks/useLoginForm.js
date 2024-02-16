import useToken, { ROLES } from "@/hooks/useToken";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { login } from "@/api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useLoginForm() {
  const { roles, token, setToken } = useToken();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (roles.includes(ROLES.ADMIN) || roles.includes(ROLES.CEO)) {
      navigate("/manage");
    } else if (token) {
      navigate("/");
    }
  }, [token]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await login(data.email, data.password);
      setToken(res.token);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Une erreur s'est produite. Veuillez réessayer !");
      reset();
    }
  };

  return {
    onSubmit,
    loading,
    handleSubmit,
    errors,
    isValid,
    register,
  };
}
