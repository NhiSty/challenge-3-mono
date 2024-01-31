import PropTypes from "prop-types";

export default function UserProfile({ user }) {
  return (
    <div>
      {user ? (
        <div>
          <h1 className="text-xl font-bold">{user?.username}</h1>

          <dl>
            <div className="flex gap-1">
              <dt className="font-bold">Prénom :</dt>
              <dd>{user?.firstName ?? "Non renseigné"}</dd>
            </div>

            <div className="flex gap-1">
              <dt className="font-bold">Nom :</dt>
              <dd>{user?.lastName ?? "Non renseigné"}</dd>
            </div>

            <div className="flex gap-1">
              <dt className="font-bold">Email :</dt>
              <dd>{user?.email ?? "Non renseigné/Non disponible"}</dd>
            </div>

            <div className="flex gap-1">
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
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
  }),
};
