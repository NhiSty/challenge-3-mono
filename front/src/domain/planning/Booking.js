import { addDuration } from "@/domain/planning/dateUtils";

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

  toString() {
    return `at ${this.start.toISOString()} for ${this.duration.toString()}`;
  }
}
