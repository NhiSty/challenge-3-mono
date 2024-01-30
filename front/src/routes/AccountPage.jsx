import UserProfile from "@components/partials/UserProfile";
import { Link } from "react-router-dom";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function AccountPage() {
  const { user, isLoading } = useCurrentUser();

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Chargement...</h1>
        </div>
      ) : (
        <>
          <UserProfile user={user} />
          <Link to="/account/edit">Modifier mon profil</Link>
        </>
      )}
    </div>
  );
}
