import { useParams } from "react-router-dom";
import UserProfile from "@components/partials/UserProfile";
import useUser from "@/hooks/useUser";
import { useTranslation } from "@/translation/useTranslation";
import Planning from "@components/partials/Planning";
import { useMemo } from "react";

export default function UserPage() {
  const { userId } = useParams();
  const { user, isLoading, refresh } = useUser(Number(userId));
  const performances = useMemo(
    () => user?.companies?.flatMap((company) => company.performances) ?? [],
    [user],
  );

  const { t } = useTranslation();

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>{t("loading")}</h1>
        </div>
      ) : (
        user && (
          <div className="flex items-center justify-center gap-3 p-3">
            <UserProfile user={user} />

            <div className="flex flex-col grow">
              <h2 className="font-bold text-xl">{t("planning")}</h2>
              <p>{t("clickOnGreenToBook")}</p>
              <Planning
                availabilities={user.availabilities}
                bookings={[...user.bookingsMade, ...user.bookingsReceived]}
                userId={user.id}
                performances={performances}
                refresh={refresh}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
