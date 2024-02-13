import { useParams } from "react-router-dom";
import UserProfile from "@components/shared/UserProfile";
import useUser from "@/hooks/useUser";

export default function UserPage() {
  const { userId } = useParams();
  const { user, isLoading } = useUser(Number(userId));

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Chargement...</h1>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <UserProfile user={user} />
          </div>
        </>
      )}
    </div>
  );
}
