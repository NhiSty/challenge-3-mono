import {Link, useNavigate} from "react-router-dom";

import { useTranslation } from "@/translation/useTranslation";
import {Button, Stack} from "@mui/material";
import useToken from "@/hooks/useToken";

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isValid: isConnected } = useToken();

  return (
      <>
          <div className="bg-indigo-600 flex">
              <div className="w-1/2 flex flex-col justify-center items-start p-10 text-white">
                  <h1 className="text-4xl font-bold mb-4">{t("feelingLonely")}</h1>
                  <p className="text-lg mb-4">
                      {t("dontHaveAnyoneToShareYourPassionsAndDiscussionsWith")}
                  </p>
                  <p className="text-lg mb-4">{t("tiredOfSolitudeAndConfinement")}</p>
                  <p className="text-lg mb-4">{t("lookingForNewExperiences")}</p>
                  <p className="text-lg mb-4">
                      {t("turnYourDreamsIntoRealityWithRentADream")}
                  </p>
                  <p className="text-lg underline">
                      <Link to={"search"}>{t("lookNoFurtherChoose")}</Link>
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
          {
              !isConnected && (
                  <div style={{backgroundColor: 'rgb(192 132 252 / 0.55)'}} className={'pt-10 pb-10'}>
                      <h2 className="text-4xl font-bold text-center mb-4">
                          {t("wantToOpenYourOwnCompany")}
                      </h2>
                      <p className="text-lg text-center mb-4">
                          {t("RentADreamCanHelpYou")}
                      </p>
                      <p className="text-lg text-center mb-4">
                          {t('joinUsHere')}
                      </p>

                      <Stack direction={'row'} width={'100%'} justifyContent={'center'}>
                          <Button
                              variant={'contained'}
                              color={'primary'}
                              onClick={() => navigate('/new-company')}
                          >
                              {t('lestGo')}
                          </Button>
                      </Stack>
                  </div>
              )
          }
      </>
  );
}
