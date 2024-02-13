import { addDuration } from "@/domain/planning/dateUtils";
import Duration from "@/domain/planning/Duration";

export default class Booking {
  /**
   * @param {Date} start
   * @param {Duration} duration
   */
  constructor(start, duration) {
    this._start = start;
    this._duration = duration;
  }

  /** @returns {Date} */
  get start() {
    return this._start;
  }

  /** @returns {Date} */
  get end() {
    return addDuration(this._start, this._duration);
  }

  /** @returns {Duration} */
  get duration() {
    return this._duration;
  }

  /**
   * @param {Date} date
   * @returns {boolean}
   */
  isSameDay(date) {
    return this.start.toDateString() === date.toDateString();
  }

  /**
   * @param {Duration} start
   * @param {Duration} end
   * @returns {boolean}
   */
  isOverlapping(start, end) {
    const bookingStart = Duration.fromTimeString(this.start.toISOString());
    const bookingEnd = Duration.fromTimeString(this.end.toISOString());

    return (
      (start.isSameOrAfter(bookingStart) && end.isSameOrBefore(bookingEnd)) ||
      (start.isBefore(bookingStart) &&
        end.isAfter(bookingStart) &&
        end.isSameOrBefore(bookingEnd)) ||
      (start.isSameOrAfter(bookingStart) &&
        end.isAfter(bookingStart) &&
        start.isBefore(bookingEnd)) ||
      (start.isBefore(bookingStart) && end.isAfter(bookingEnd))
    );
  }

  toString() {
    return `at ${this.start.toLocaleTimeString()} for ${this.duration.toLocaleTimeString()}`;
  }
}
