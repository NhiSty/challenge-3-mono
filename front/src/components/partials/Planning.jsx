/**
 * @typedef ApiAvailability
 * @property {Day} week_day (eg. monday)
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

import { Fragment, useMemo, useState } from "react";
import PropTypes from "prop-types";
import PlanningModel from "@/domain/planning/PlanningModel";
import { Button, Dialog } from "@mui/material";
import { apiClient } from "@/api";
import useTokens from "@/hooks/useTokens";

function getMondayOfCurrentWeek(today = new Date()) {
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(today.setDate(diff));
}

/**
 * @param {ApiAvailability[]} availabilities
 * @param {ApiBooking[]} bookings
 * @param userId
 * @returns {JSX.Element}
 * @constructor
 */
const Planning = ({ availabilities, bookings, userId, refreshBookings }) => {
  const bookedByUserId = useTokens()?.payload.id;
  const [timeSlot, setTimeSlot] = useState(null);
  const { columns: planning, timeSlots } = useMemo(() => {
    const startDate = getMondayOfCurrentWeek();
    return new PlanningModel(availabilities, bookings).buildPlanning(
      startDate,
      60,
    );
  }, [availabilities, bookings]);

  /**
   * @param {PlanningColumn} timeSlot
   */
  const bookTimeSlot = async (timeSlot) => {
    setTimeSlot(null);

    const data = {
      duration: timeSlot.duration.toString(),
      startDatetime: timeSlot.startDate.toISOString(),
      bookedByUserId: String(bookedByUserId),
      bookedToUserId: String(userId),
    };

    await apiClient("/bookings", {
      method: "post",
      data,
    });

    refreshBookings();
  };

  return (
    <>
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
                      <div
                        className="bg-green-500 flex h-full justify-center items-center text-center cursor-pointer"
                        onClick={() => {
                          setTimeSlot(column);
                        }}
                      >
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

      <Dialog
        open={timeSlot !== null}
        onClose={() => {
          setTimeSlot(null);
        }}
      >
        <div className="p-3 flex flex-col gap-3">
          <dl>
            <div className="flex gap-4 mb-2">
              <dt className="font-bold">Date de début :</dt>
              <dd>
                {timeSlot &&
                  timeSlot.startDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
              </dd>
            </div>

            <div className="flex gap-4 mb-2">
              <dt className="font-bold">Durée :</dt>
              <dd>{timeSlot && timeSlot.duration.toLocaleTimeString()}</dd>
            </div>
          </dl>

          <Button
            variant="contained"
            color="primary"
            onClick={() => bookTimeSlot(timeSlot)}
          >
            Réserver ce créneau
          </Button>
        </div>
      </Dialog>
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
  userId: PropTypes.number,
  refreshBookings: PropTypes.func,
};

export default Planning;
