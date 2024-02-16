import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

export default function TableLineSkeleton({ nbLines = 3, nbColumns = 4 }) {
  return (
    <>
      {Array.from({ length: nbLines }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: nbColumns }).map((_, index) => (
            <td key={index}>
              <Skeleton variant="text" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

TableLineSkeleton.propTypes = {
  nbLines: PropTypes.number,
  nbColumns: PropTypes.number,
};
