import { useParams } from "react-router-dom";
import UserProfile from "@components/partials/UserProfile";
import useUser from "@/hooks/useUser";

export default function UserPage() {
  const { userId } = useParams();
  const { user, isLoading } = useUser(Number(userId));

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>{t("loading")}</h1>
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
