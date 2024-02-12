import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

export default function LoadingButton(props) {
  return (
    <Button {...props} disabled={props.loading}>
      {props.loading ? (
        <CircularProgress size={24} color={"inherit"} />
      ) : (
        props.children
      )}
    </Button>
  );
}

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
