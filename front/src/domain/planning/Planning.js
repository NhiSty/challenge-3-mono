import Duration from "@/domain/planning/Duration";
import Availability from "@/domain/planning/Availability";
import Booking from "@/domain/planning/Booking";

export default class Planning {
  /**
   * @param {ApiAvailability[]} availabilities
   * @param {ApiBooking[]} bookings
   */
  constructor(availabilities = [], bookings = []) {
    /**
     * @type {Availability[]}
     * @private
     */
    this._availabilities = availabilities.map((apiAvailability) => {
      return new Availability(
        Duration.fromTimeString(apiAvailability.start_time),
        Duration.fromTimeString(apiAvailability.end_time),
        apiAvailability.week_day,
      );
    });

    /**
     * @type {Booking[]}
     * @private
     */
    this._bookings = bookings.map((booking) => {
      return new Booking(
        new Date(booking.start_datetime),
        Duration.fromDuration(booking.duration),
      );
    });
  }

  /**
   * @returns {Availability[]}
   */
  get availabilities() {
    return this._availabilities;
  }

  /**
   * @returns {Booking[]}
   */
  get bookings() {
    return this._bookings;
  }

  /**
   * @returns {Record<Day, Availability[]>}
   */
  _availabilitiesByWeekday() {
    return this.availabilities.reduce((acc, availability) => {
      const day = availability.weekDay;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(availability);
      return acc;
    }, {});
  }

  /** @returns {Duration} */
  _findFirstAvailability() {
    return this.availabilities.sort((a, b) => {
      return a.start.isSameOrAfter(b.start);
    })[0].start;
  }

  /** @returns {Duration} */
  _findLastAvailability() {
    return this.availabilities.sort((a, b) => {
      return b.end.isSameOrAfter(a.end);
    })[0].end;
  }

  /**
   * @param {Duration} start
   * @param {Duration} end
   * @returns {boolean}
   * @private
   */
  _isThereBookingOverlappingOnTimeWindow(start, end) {
    return this.bookings.some((booking) => {
      const elementStart = Duration.fromDate(booking.start).toMinutes();
      const elementEnd = elementStart + booking.duration.toMinutes();

      return elementEnd > start.toMinutes() && elementStart < end.toMinutes();
    });
  }

  buildPlanning(precision = 30) {
    const availabilitiesByWeekday = this._availabilitiesByWeekday();
    const columns = [];

    const firstAvailability = this._findFirstAvailability();
    const lastAvailability = this._findLastAvailability();

    const startMinutes = Math.max(firstAvailability.toMinutes() - precision, 0);
    const endMinutes = Math.min(
      lastAvailability.toMinutes() + precision,
      24 * 60,
    );
    const diff = endMinutes - startMinutes;
    const timeSlots = diff / precision;

    for (const key in availabilitiesByWeekday) {
      /** @type {Availability[]} */
      const availability = availabilitiesByWeekday[key];

      const column = [];

      for (
        let minutes = startMinutes;
        minutes < endMinutes;
        minutes += precision
      ) {
        const start = new Duration(0, minutes, 0, 0);
        const end = start.clone().addMinutes(precision);

        const foundBooking = this.bookings.find((booking) => {
          const weekDay = booking.start.getDay();
          if (weekDay !== toWeekdayIndex(key)) {
            return false;
          }

          return this._isThereBookingOverlappingOnTimeWindow(start, end);
        });

        const foundAvailability = availability.find((availability) => {
          return (
            availability.start.isSameOrBefore(start) &&
            availability.end.isSameOrAfter(end)
          );
        });
        column.push({
          start,
          end,
          isAvailable: !foundBooking && !!foundAvailability,
          isBooked: !!foundBooking,
          booking: foundBooking,
        });
      }

      columns.push({
        columnName: key,
        column,
      });
    }

    return { columns, timeSlots };
  }
}

/**
 * @param {string} weekday
 * @returns {number}
 */
function toWeekdayIndex(weekday) {
  switch (weekday) {
    case "monday":
      return 1;
    case "tuesday":
      return 2;
    case "wednesday":
      return 3;
    case "thursday":
      return 4;
    case "friday":
      return 5;
    case "saturday":
      return 6;
    case "sunday":
      return 7;
  }
}
