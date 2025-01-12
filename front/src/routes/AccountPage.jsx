import UserProfile from "@components/shared/UserProfile";
import { Link } from "react-router-dom";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "@mui/material";
import { useTranslation } from "@/translation/useTranslation";

export default function AccountPage() {
  const { user, isLoading } = useCurrentUser();
  const { t } = useTranslation();

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>{t("loading")}</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <UserProfile user={user} />
          <Button variant="contained" sx={{ marginTop: "15px" }}>
            <Link to="/account/edit" className="text-white no-underline">
              {t("editUserProfile")}
            </Link>
          </Button>

          <Button variant="contained" sx={{ marginTop: "15px" }}>
            <Link to="/account/bookings" className="text-white no-underline">
              {t("viewOwnBookings")}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
