import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@components/form/Input";
import { Loader2, Lock, User, UserPlus } from "lucide-react";
import Button from "@components/base/Button";
import classNames from "classnames";
import { register } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "@/translation/useTranslation";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    register: registerForm,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
      age: 18,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await register(data);

      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Une erreur s'est produite. Veuillez réessayer !");
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="bg-white shadow-md rounded p-8 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="email"
          label={t("email")}
          icon={<UserPlus className="w-5 h-5" />}
          error={errors.email?.message}
          {...registerForm("email", {
            required: t("emailRequired"),
          })}
        />

        <Input
          id="password"
          label={t("password")}
          type="password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message}
          {...registerForm("password", {
            required: t("passwordRequired"),
          })}
        />

        <Input
          id="username"
          label={t("username")}
          icon={<User className="w-5 h-5" />}
          error={errors.username?.message}
          {...registerForm("username", {
            required: t("usernameRequired"),
          })}
        />

        <Input
          id="firstName"
          label={t("firstname")}
          icon={<User className="w-5 h-5" />}
          error={errors.firstName?.message}
          {...registerForm("firstName", {
            required: t("firstNameRequired"),
          })}
        />

        <Input
          id="lastName"
          label={t("name")}
          icon={<User className="w-5 h-5" />}
          error={errors.lastName?.message}
          {...registerForm("lastName", {
            required: t("lastNameRequired"),
          })}
        />

        <Input
          id="age"
          label={t("age")}
          type="number"
          icon={<User className="w-5 h-5" />}
          error={errors.age?.message}
          {...registerForm("age", {
            required: t("ageRequired"),
            setValueAs: (v) => Number(v),
          })}
        />

        <div className="flex flex-row justify-end gap-2 pt-2">
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || loading}
            icon={loading ? Loader2 : UserPlus}
            iconClassName={classNames({ "animate-spin": loading })}
          >
            {t("signUp")}
          </Button>
        </div>
      </form>

      <div>
        <p className="mt-3 font-bold text-center">
          {t("alreadyHaveAnAccount")}{" "}
          <a className="text-primary" href="/login">
            {t("login")}
          </a>
        </p>
      </div>
    </div>
  );
}
