import PropTypes from "prop-types";

export default function ProfilePicture({ base64 }) {
  if (base64) {
    return (
      <div>
        <img
          src={`${base64}`}
          className={"rounded-2xl"}
          alt={"Profile picture"}
          width={150}
        />
      </div>
    );
  }
  return (
    <div>
      <img
        src="/assets/default-avatar.png"
        width={150}
        alt={"Profile picture"}
      />
    </div>
  );
}

ProfilePicture.propTypes = {
  base64: PropTypes.string,
};
