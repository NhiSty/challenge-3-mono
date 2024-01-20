import PropTypes from "prop-types";

export default function UserProfile({ user }) {
  return (
    <div>
      {user ? (
        <div>
          <h1>{user?.username}</h1>

          <dl>
            <dt>Prénom</dt>
            <dd>{user?.firstName}</dd>
            <dt>Nom</dt>
            <dd>{user?.lastName}</dd>
            <dt>Email</dt>
            <dd>{user?.email}</dd>
            <dt>Age</dt>
            <dd>{user?.age}</dd>
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
