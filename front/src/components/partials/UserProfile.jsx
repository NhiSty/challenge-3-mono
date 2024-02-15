import PropTypes from "prop-types";
import Card from "@components/base/Card";
import { useTranslation } from "@/translation/useTranslation";
import ProfilePicture from "@components/partials/ProfilePicture";

export default function UserProfile({ user }) {
  const { t } = useTranslation();
  console.log();

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mt-3">
        {t("userProfile")}
      </h1>

      <Card classNames={"mr-4 mt-3"}>
        {user ? (
          <div>
            <ProfilePicture base64={user?.pictures[0]?.path} />
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
