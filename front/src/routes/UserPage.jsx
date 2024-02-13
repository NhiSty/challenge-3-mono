import { useParams } from "react-router-dom";
import UserProfile from "@components/partials/UserProfile";
import useUser from "@/hooks/useUser";
import { useTranslation } from "@/translation/useTranslation";
import Planning from "@components/partials/Planning";

export default function UserPage() {
  const { userId } = useParams();
  const { user, isLoading } = useUser(Number(userId));

  const { t } = useTranslation();

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>{t("loading")}</h1>
        </div>
      ) : (
        user && (
          <>
            <div className="flex flex-col items-center justify-center">
              <UserProfile user={user} />

              <Planning
                availabilities={user.availabilities}
                bookings={[...user.bookingsMade, ...user.bookingsReceived]}
                userId={user.id}
                refreshBookings={() => void 0}
              />
            </div>
          </>
        )
      )}
    </div>
  );
}
