// EditAccountPage.js
import useCurrentUser from "@/hooks/useCurrentUser";
import EditAccountForm from "@components/partials/EditAccountForm";
import { useTranslation } from "@/translation/useTranslation";

export default function EditAccountPage() {
  const { user, isLoading: isUserInformationLoading } = useCurrentUser();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {t("editUserProfile")}
      </h1>
      {isUserInformationLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            viewBox="0 0 24 24"
          ></svg>
          <span className="text-gray-500">{t("loading")}</span>
        </div>
      ) : user ? (
        <EditAccountForm user={user} />
      ) : (
        <div className="text-red-500 text-xl font-medium">
          {t("userNotFound")}
        </div>
      )}
    </div>
  );
}
