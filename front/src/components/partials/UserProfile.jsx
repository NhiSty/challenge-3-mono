import PropTypes from "prop-types";
import Card from "@components/base/Card";

export default function UserProfile({ user }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mt-3">
        Profil de l'utilisateur
      </h1>
      <Card classNames={"w-1/3 mr-4 mt-3"}>
        {user ? (
          <div>
            <h1 className="text-xl font-bold mb-4">{user?.username}</h1>

            <dl>
              <div className="flex gap-4 mb-2">
                <dt className="font-bold">Prénom :</dt>
                <dd>{user?.firstName ?? "Non renseigné"}</dd>
              </div>

              <div className="flex gap-4 mb-2">
                <dt className="font-bold">Nom :</dt>
                <dd>{user?.lastName ?? "Non renseigné"}</dd>
              </div>

              <div className="flex gap-4 mb-2">
                <dt className="font-bold">Age :</dt>
                <dd>{user?.age ?? "Non renseigné"}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div>
            <h1>Utilisateur introuvable</h1>
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
