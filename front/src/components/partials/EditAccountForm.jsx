import { useForm } from "react-hook-form";
import { Input } from "@components/form/Input";
import { Loader2, Lock, User, UserPlus } from "lucide-react";
import Button from "@components/base/Button";
import toTranslate from "@/utils/translate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { updateUser } from "@/api/user";

export default function EditAccountForm({ user }) {
  const navigate = useNavigate();

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
    <form
      className="bg-white shadow-md rounded p-8 w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="username"
        label="Nom d'utilisateur"
        icon={<User className="w-5 h-5" />}
        error={errors.username?.message}
        {...registerForm("username", {
          required: "Le nom d'utilisateur est requis",
        })}
      />

      <Input
        id="firstName"
        label="Prénom"
        icon={<User className="w-5 h-5" />}
        error={errors.firstName?.message}
        {...registerForm("firstName", { required: "Le prénom est requis" })}
      />

      <Input
        id="lastName"
        label="Nom"
        icon={<User className="w-5 h-5" />}
        error={errors.lastName?.message}
        {...registerForm("lastName", { required: "Le nom est requis" })}
      />

      <Input
        id="age"
        label="Âge"
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
        label="Mot de passe"
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
          {toTranslate("Mettre à jour")}
        </Button>
      </div>
    </form>
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