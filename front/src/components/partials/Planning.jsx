/**
 * @typedef ApiAvailability
 * @property {Day} week_day (eg. monday)
 * @property {string} start_time (eg. 2024-01-27T09:43:06.888Z)
 * @property {string} end_time (eg. 2024-01-27T09:43:43.283Z)
 */

/**
 * @typedef ApiReview
 * @property {string} review_content
 */

/**
 * @typedef ApiBooking
 * @property {string} duration (eg. P3D)
 * @property {string} start_datetime (eg. 2024-01-27T09:43:43.283Z)
 * @property {ApiReview} reviews
 * @property {ApiPerformance} performance
 */

/**
 * @typedef ApiPerformance
 * @property {string} name
 * @property {number} id
 * @property {number} price
 */

/**
 * @typedef ApiCompany
 * @property {ApiPerformance[]} performances
 */

/**
 * @typedef {"monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"} Day
 */

import { Fragment, useMemo, useState } from "react";
import PropTypes from "prop-types";
import PlanningModel from "@/domain/planning/PlanningModel";
import CreateBookingForm from "@components/partials/CreateBookingForm";
import classNames from "classnames";

function getMondayOfCurrentWeek(today = new Date()) {
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(today.setDate(diff));
}

/**
 * @param {ApiAvailability[]} availabilities
 * @param {ApiBooking[]} bookings
 * @param {ApiPerformance} performances
 * @param userId
 * @param refresh
 * @param {boolean} readOnly
 * @returns {JSX.Element}
 * @constructor
 */
const Planning = ({
  availabilities,
  bookings,
  userId,
  refresh,
  performances,
  readOnly = false,
}) => {
  const [timeSlot, setTimeSlot] = useState(null);
  const { columns: planning, timeSlots } = useMemo(() => {
    const startDate = getMondayOfCurrentWeek();
    return new PlanningModel(availabilities, bookings).buildPlanning(
      startDate,
      60,
    );
  }, [availabilities, bookings]);

  return (
    <>
      <div
        className="grid grid-cols-7 grid-flow-col gap-1 select-none"
        style={{
          gridTemplateRows: `repeat(${Math.ceil(timeSlots + 1)}, minmax(0, 1fr))`,
        }}
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
                      <div className="bg-blue-500 rounded h-full flex justify-center items-center text-center cursor-not-allowed">
                        {column.booking.toString()}
                      </div>
                    ) : column.isAvailable ? (
                      <div
                        className={classNames({
                          "bg-green-500 rounded h-full flex justify-center items-center text-center": true,
                          "cursor-pointer": !readOnly,
                          "cursor-not-allowed": readOnly,
                        })}
                        onClick={() => {
                          if (!readOnly) {
                            setTimeSlot(column);
                          }
                        }}
                      >
                        {column.start.toLocaleTimeString()}-
                        {column.end.toLocaleTimeString()}
                      </div>
                    ) : (
                      <div className="bg-red-400 rounded h-full flex justify-center items-center text-center cursor-not-allowed" />
                    )}
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>

      <CreateBookingForm
        userId={userId}
        refresh={refresh}
        timeSlot={timeSlot}
        setTimeSlot={setTimeSlot}
        performances={performances}
      />
    </>
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
  userId: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  performances: PropTypes.array.isRequired,
  readOnly: PropTypes.bool,
};

export default Planning;
