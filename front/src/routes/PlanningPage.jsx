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

import Planning from "@/domain/planning/Planning";

/**
 * @type {ApiAvailability[]}
 */
const mockedAvailabilities = [
  {
    week_day: "monday",
    start_time: "2024-01-27T08:00:00.000Z",
    end_time: "2024-01-27T13:00:00.000Z",
  },
  {
    week_day: "monday",
    start_time: "2024-01-27T14:00:00.000Z",
    end_time: "2024-01-27T19:00:00.000Z",
  },
  {
    week_day: "tuesday",
    start_time: "2024-01-27T09:45:00.000Z",
    end_time: "2024-01-27T14:00:00.000Z",
  },
  {
    week_day: "wednesday",
    start_time: "2024-01-27T08:00:00.000Z",
    end_time: "2024-01-27T13:00:00.000Z",
  },
  {
    week_day: "wednesday",
    start_time: "2024-01-27T14:00:00.000Z",
    end_time: "2024-01-27T17:15:00.000Z",
  },
  {
    week_day: "thursday",
    start_time: "2024-01-27T09:45:00.000Z",
    end_time: "2024-01-27T13:00:00.000Z",
  },
  {
    week_day: "friday",
    start_time: "2024-01-27T08:00:00.000Z",
    end_time: "2024-01-27T19:00:00.000Z",
  },
];

/**
 * @type {ApiBooking[]}
 */
const mockedBookings = [
  {
    duration: "PT30M",
    start_datetime: "2024-01-22T12:00:00.000Z",
  },
  {
    duration: "PT30M",
    start_datetime: "2024-01-23T13:59:59.999Z",
  },
  {
    duration: "PT30M",
    start_datetime: "2024-01-25T09:43:43.000Z",
  },
];

/**
 * @type {Day[]}
 */
const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const ISO_DURATION_REGEX =
  /^P(?:(?<years>[0-9]+)Y)?(?:(?<months>[0-9]+)M)?(?:(?<days>[0-9]+)D)?(?:T(?:(?<hours>[0-9]+)H)?(?:(?<minutes>[0-9]+)M)?(?:(?<seconds>[0-9.]+)S)?)?$/;

/**
 * @param {string} isoDuration
 * @returns {Duration}
 */
function parseIsoDuration(isoDuration) {
  const match = isoDuration.match(ISO_DURATION_REGEX);
  if (!match) {
    throw new Error(`Invalid ISO duration: ${isoDuration}`);
  }

  const years = parseInt(match.groups.years);
  const months = parseInt(match.groups.months);
  const days = parseInt(match.groups.days);
  const hours = parseInt(match.groups.hours);
  const minutes = parseInt(match.groups.minutes);
  const seconds = parseFloat(match.groups.seconds);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    isoDuration,
    time:
      years * 365 * 24 * 60 * 60 +
      months * 30 * 24 * 60 * 60 +
      days * 24 * 60 * 60 +
      hours * 60 * 60 +
      minutes * 60 +
      seconds,
  };
}

export default function PlanningPage() {
  const { columns: planning, timeSlots } = new Planning(
    mockedAvailabilities,
    mockedBookings,
  ).buildPlanning(30);

  return (
    <div
      className="grid grid-cols-7 grid-flow-col gap-1"
      style={{ gridTemplateRows: `repeat(${timeSlots + 1}, minmax(0, 1fr))` }}
    >
      {planning.map((dayPlanning) => {
        return (
          <>
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
          </>
        );
      })}
    </div>
  );
}
