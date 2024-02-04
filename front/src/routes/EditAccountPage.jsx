import useCurrentUser from "@/hooks/useCurrentUser";
import EditAccountForm from "@components/partials/EditAccountForm";

export default function EditAccountPage() {
  const { user, isLoading: isUserInformationLoading } = useCurrentUser();

  return (
    <div>
      <h1>Modifier mon profil</h1>

      {isUserInformationLoading ? (
        <div>
          <h1>Chargement...</h1>
        </div>
      ) : user ? (
        <EditAccountForm user={user} />
      ) : (
        <div>
          <h1>Utilisateur introuvable</h1>
        </div>
      )}
    </div>
  );
}
