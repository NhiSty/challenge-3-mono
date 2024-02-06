import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function HomePage() {
  const { t, i18n} = useTranslation();

  return (
    <div className="bg-indigo-600 flex">
      <div className="w-1/2 flex flex-col justify-center items-start p-10 text-white">
        <h1 className="text-4xl font-bold mb-4">
          {t("feelingLonely")}
        </h1>
        <p className="text-lg mb-4">
          {t("dontHaveAnyoneToShareYourPassionsAndDiscussionsWith")}
        </p>
        <p className="text-lg mb-4">
          {t("tiredOfSolitudeAndConfinement")}
        </p>
        <p className="text-lg mb-4">
          {t("lookingForNewExperiences")}
        </p>
        <p className="text-lg mb-4">
          {t("turnYourDreamsIntoRealityWithRentADream")}
        </p>
        <p className="text-lg underline">
          <Link to={"persons-to-rent"}>
            {t("lookNoFurtherChoose")}
          </Link>
        </p>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <img
          src="/assets/illustration-homepage.svg"
          alt="Illustration"
          className="w-full"
        />
      </div>
    </div>
  );
}
