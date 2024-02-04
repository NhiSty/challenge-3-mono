/**
 * @typedef ApiAvailability
 * @property {string} week_day (eg. monday)
 * @property {string} start_time (eg. 2024-01-27T09:43:06.888Z)
 * @property {string} end_time (eg. 2024-01-27T09:43:43.283Z)
 */

/**
 * @typedef ApiBooking
 * @property {string} duration (eg. P3D)
 * @property {string} start_datetime (eg. 2024-01-27T09:43:43.283Z)
 */

/**
 * @typedef {"monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"} Day
 */

import { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import PlanningModel from "@/domain/planning/PlanningModel";

/**
 * @param {ApiAvailability[]} availabilities
 * @param {ApiBooking[]} bookings
 * @returns {JSX.Element}
 * @constructor
 */
const Planning = ({ availabilities, bookings }) => {
  const { columns: planning, timeSlots } = useMemo(() => {
    const startDate = new Date("2024-01-22T00:00:00.000Z");
    return new PlanningModel(availabilities, bookings).buildPlanning(
      startDate,
      30,
    );
  }, [availabilities, bookings]);

  return (
    <div
      className="grid grid-cols-7 grid-flow-col gap-1"
      style={{ gridTemplateRows: `repeat(${timeSlots + 1}, minmax(0, 1fr))` }}
    >
      {planning.map((dayPlanning, index) => {
        return (
          <Fragment key={index}>
            <div className="h-full flex justify-center items-center text-center">
              {dayPlanning.columnName}
            </div>

            {dayPlanning.column.map((column) => {
              return (
                <div key={column.start.toString()}>
                  {column.isBooked ? (
                    <div className="bg-blue-500 h-full flex justify-center items-center text-center">
                      {column.booking.toString()}
                    </div>
                  ) : column.isAvailable ? (
                    <div className="bg-green-500 flex h-full justify-center items-center text-center">
                      {column.start.toLocaleTimeString()}-
                      {column.end.toLocaleTimeString()}
                    </div>
                  ) : (
                    <div className="bg-red-500 h-full flex justify-center items-center text-center">
                      {column.start.toLocaleTimeString()}-
                      {column.end.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

Planning.propTypes = {
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      week_day: PropTypes.oneOf([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ]),
      start_time: PropTypes.string,
      end_time: PropTypes.string,
    }),
  ).isRequired,
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.string,
      start_datetime: PropTypes.string,
    }),
  ).isRequired,
};

export default Planning;
