import { Input } from "@components/form/Input";
import { Loader2, Lock, LogIn, User } from "lucide-react";
import Button from "@components/base/Button";
import classNames from "classnames";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "@/translation/useTranslation";
import useLoginForm from "@/hooks/useLoginForm";

export default function LoginPage() {
  const { isValid, onSubmit, register, handleSubmit, loading, errors } =
    useLoginForm();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="bg-white shadow-md rounded p-8 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="email"
          label={t("email")}
          icon={<User className="w-5 h-5" />}
          error={errors.email?.message}
          {...register("email", { required: "Email address is required" })}
        />

        <Input
          id="password"
          label={t("password")}
          type="password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <div className="flex flex-row justify-end gap-2 pt-2">
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || loading}
            icon={loading ? Loader2 : LogIn}
            iconClassName={classNames({ "animate-spin": loading })}
          >
            {t("login")}
          </Button>
        </div>
      </form>

      <div>
        <p className="mt-3 font-bold text-center">
          {t("dontHaveAnAccount")}
          <a className="text-primary" href="/register">
            {t("signUp")}
          </a>
        </p>
      </div>
    </div>
  );
}
