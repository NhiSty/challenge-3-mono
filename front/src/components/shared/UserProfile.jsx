import PropTypes from "prop-types";
import Card from "@components/shared/Card";
import { useTranslation } from "@/translation/useTranslation";

export default function UserProfile({ user }) {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mt-3">
        {t("userProfile")}
      </h1>
      <Card classNames={"w-1/3 mr-4 mt-3"}>
        {user ? (
          <div>
            <h1 className="text-xl font-bold mb-4">{user?.username}</h1>
            <dl>
              <div className="flex gap-4 mb-2">
                <dt className="font-bold">{t("firstname")}</dt>
                <dd>{user?.firstName ?? t("notInformed")}</dd>
              </div>

              <div className="flex gap-4 mb-2">
                <dt className="font-bold">{t("lastname")}</dt>
                <dd>{user?.lastName ?? t("notInformed")}</dd>
              </div>

              <div className="flex gap-4 mb-2">
                <dt className="font-bold">{t("age")}</dt>
                <dd>{user?.age ?? t("notInformed")}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div>
            <h1>{t("userNotFound")}</h1>
          </div>
        )}
      </Card>
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
  }),
};
