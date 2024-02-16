import PropTypes from "prop-types";
import cn from "classnames";

export default function Table({ children, thead, className }) {
  return (
    <table className={cn(className, "table w-full")}>
      <thead className={"bg-base-200"}>
        <tr>
          {thead.map((item, index) => (
            <th key={`item-${index}`}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

Table.propTypes = {
  thead: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
};
