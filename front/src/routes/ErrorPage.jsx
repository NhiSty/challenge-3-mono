import { useRouteError } from "react-router-dom";
import { Navbar } from "@components/partials/Navbar";
import { useTranslation } from "@/translation/useTranslation";

export default function ErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{"Oops"}</h2>
          <img
            src="/assets/error-illustration.svg"
            alt="Error"
            className="w-1/2 mx-auto mb-4 animate-bounce"
          />
          <p className="text-lg mb-4">
            {t("sorryAnUnexpectedErrorHasOccurred")}
          </p>
          <p className="text-lg mb-4">
            <i>{error.statusText || error.message}</i>
          </p>
          <a href="/" className="text-sm text-primary">
            {t("returnToHomepage")}
          </a>
        </div>
      </div>
    </div>
  );
}
