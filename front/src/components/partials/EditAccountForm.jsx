import { useForm } from "react-hook-form";
import { Input } from "@components/form/Input";
import { Loader2, Lock, User, UserPlus } from "lucide-react";
import Button from "@components/base/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { updateUser } from "@/api/user";
import { useTranslation } from "@/translation/useTranslation";
import {Card} from "@mui/material";

export default function EditAccountForm({ user }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    register: registerForm,
    formState: { errors, isValid, isLoading },
  } = useForm({
    mode: "all",
    defaultValues: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      plainPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateUser({ ...data, id: user.id });
      navigate("/account");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite. Veuillez réessayer !");
    }
  };

  return (
      <Card classNames={"w-1/3 mr-4 mt-3"}>

        <form
        className="bg-white shadow-md rounded p-8 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="username"
          label={t("username")}
          icon={<User className="w-5 h-5" />}
          error={errors.username?.message}
          {...registerForm("username", {
            required: "Le nom d'utilisateur est requis",
          })}
        />

        <Input
          id="firstName"
          label={t("firstname")}
          icon={<User className="w-5 h-5" />}
          error={errors.firstName?.message}
          {...registerForm("firstName", { required: "Le prénom est requis" })}
        />

        <Input
          id="lastName"
          label={t("lastname")}
          icon={<User className="w-5 h-5" />}
          error={errors.lastName?.message}
          {...registerForm("lastName", { required: "Le nom est requis" })}
        />

        <Input
          id="age"
          label={t("age")}
          type="number"
          icon={<User className="w-5 h-5" />}
          error={errors.age?.message}
          {...registerForm("age", {
            required: "L'âge est requis",
            setValueAs: (v) => Number(v),
          })}
        />

        <Input
          id="plainPassword"
          label={t("password")}
          type="password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.plainPassword?.message}
          {...registerForm("plainPassword", {
            required: "Le mot de passe est requis",
          })}
        />

        <div className="flex flex-row justify-end gap-2 pt-2">
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || isLoading}
            icon={isLoading ? Loader2 : UserPlus}
          >
            {t("update")}
          </Button>
          <Button
              onClick={() => navigate("/account")}
              className="btn btn-warning"
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </Card>
  );
}

EditAccountForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
    id: PropTypes.number,
  }),
};
