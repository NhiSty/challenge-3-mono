import {
  ISO_DURATION_REGEX,
  ISO_TIME_REGEX,
} from "@/domain/planning/dateUtils";

/**
 * Represents a duration of time
 */
export default class Duration {
  #hours = 0;
  #minutes = 0;
  #seconds = 0;
  #milliseconds = 0;

  /**
   * @param {number} hours
   * @param {number} minutes
   * @param {number} seconds
   * @param {number} milliseconds
   */
  constructor(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    this.#hours = hours;
    this.#minutes = minutes;
    this.#seconds = seconds;
    this.#milliseconds = milliseconds;
    this.normalize();
  }

  /**
   * Fixes overflowed values
   * @returns {Duration}
   */
  normalize() {
    this.addSeconds(Math.floor(this.#milliseconds / 1000));
    this.#milliseconds %= 1000;
    this.addMinutes(Math.floor(this.#seconds / 60));
    this.#seconds %= 60;
    this.addHours(Math.floor(this.#minutes / 60));
    this.#minutes %= 60;
    return this;
  }

  /**
   * Parses an ISO duration string into a Duration object
   * @example "PT1H30M" => Duration(1, 30, 0, 0)
   * @param {string} isoDuration
   * @returns {Duration}
   */
  static fromDuration(isoDuration) {
    const match = isoDuration.match(ISO_DURATION_REGEX);
    if (!match) {
      throw new Error(`Invalid ISO duration: ${isoDuration}`);
    }

    const hours = parseInt(match.groups.hours ?? 0);
    const minutes = parseInt(match.groups.minutes ?? 0);
    const rawSeconds = parseFloat(match.groups.seconds ?? 0);

    const seconds = Math.floor(rawSeconds);
    const milliseconds = Math.round((rawSeconds - seconds) * 1000);

    return new Duration(hours, minutes, seconds, milliseconds);
  }

  /**
   * Parses an ISO time string into a Duration object
   * @example "T01:30:00" => Duration(1, 30, 0, 0)
   * @param {string} time
   * @returns {Duration}
   */
  static fromTimeString(time) {
    const match = time.match(ISO_TIME_REGEX);
    if (!match) {
      throw new Error(`Invalid ISO time: ${time}`);
    }

    const hours = parseInt(match.groups.hours ?? 0);
    const minutes = parseInt(match.groups.minutes ?? 0);
    const seconds = parseInt(match.groups.seconds ?? 0);
    const milliseconds = parseInt(match.groups.milliseconds ?? 0);

    return new Duration(hours, minutes, seconds, milliseconds);
  }

  /**
   * @param milliseconds
   * @returns {Duration}
   */
  addMilliseconds(milliseconds) {
    this.#milliseconds += milliseconds;
    if (this.#milliseconds >= 1000) {
      const seconds = Math.floor(this.#milliseconds / 1000);
      this.addSeconds(seconds);
      this.#milliseconds %= 1000;
    }
    return this;
  }

  /**
   * @param seconds
   * @returns {Duration}
   */
  addSeconds(seconds) {
    this.#seconds += seconds;
    if (this.#seconds >= 60) {
      const minutes = Math.floor(this.#seconds / 60);
      this.addMinutes(minutes);
      this.#seconds %= 60;
    }
    return this;
  }

  /**
   * @param minutes
   * @returns {Duration}
   */
  addMinutes(minutes) {
    this.#minutes += minutes;
    if (this.#minutes >= 60) {
      const hours = Math.floor(this.#minutes / 60);
      this.addHours(hours);
      this.#minutes %= 60;
    }
    return this;
  }

  /**
   * @param hours
   * @returns {Duration}
   */
  addHours(hours) {
    this.#hours += hours;
    return this;
  }

  /**
   * @param {Duration} duration
   * @returns {Duration}
   */
  addDuration(duration) {
    this.addHours(duration.hours);
    this.addMinutes(duration.minutes);
    this.addSeconds(duration.seconds);
    this.addMilliseconds(duration.milliseconds);
    return this;
  }

  /**
   * @param {Duration} other
   * @returns {boolean}
   */
  isAfter(other) {
    return this.toMilliseconds() > other.toMilliseconds();
  }

  /**
   * @param {Duration} other
   * @returns {boolean}
   */
  isBefore(other) {
    return this.toMilliseconds() < other.toMilliseconds();
  }

  /**
   * @param {Duration} other
   * @returns {boolean}
   */
  isSame(other) {
    return this.toMilliseconds() === other.toMilliseconds();
  }

  /**
   * @param {Duration} other
   * @returns {boolean}
   */
  isSameOrAfter(other) {
    return this.isSame(other) || this.isAfter(other);
  }

  /**
   * @param {Duration} other
   * @returns {boolean}
   */
  isSameOrBefore(other) {
    return this.isSame(other) || this.isBefore(other);
  }

  /**
   * @returns {Duration}
   */
  clone() {
    return new Duration(
      this.#hours,
      this.#minutes,
      this.#seconds,
      this.#milliseconds,
    );
  }

  /**
   * @returns {number}
   */
  toMinutes() {
    return this.#hours * 60 + this.#minutes;
  }

  /**
   * @returns {number}
   */
  toMilliseconds() {
    return (
      this.#hours * 60 * 60 * 1000 +
      this.#minutes * 60 * 1000 +
      this.#seconds * 1000 +
      this.#milliseconds
    );
  }

  /**
   * @returns {number}
   */
  get hours() {
    return this.#hours;
  }

  /**
   * @returns {number}
   */
  get minutes() {
    return this.#minutes;
  }

  /**
   * @returns {number}
   */
  get seconds() {
    return this.#seconds;
  }

  /**
   * @returns {number}
   */
  get milliseconds() {
    return this.#milliseconds;
  }

  /**
   * @param {number} value
   * @param {"H" | "M" | "S"} label
   * @returns {string}
   */
  #formatPart(value, label) {
    return value > 0 ? `${value}${label}` : "";
  }

  /**
   * Formats the duration as an ISO 8601 string
   * @returns {string}
   */
  toString() {
    return `PT${this.#formatPart(this.#hours, "H")}${this.#formatPart(this.#minutes, "M")}${this.#formatPart(this.#seconds, "S")}`;
  }

  /**
   * @returns {string}
   */
  toLocaleTimeString() {
    const formatter = new Intl.DateTimeFormat("fr", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatter.format(this.toDate());
  }

  /**
   * @param {Duration} other
   * @returns {Duration}
   */
  minus(other) {
    return new Duration(
      this.#hours - other.hours,
      this.#minutes - other.minutes,
      this.#seconds - other.seconds,
      this.#milliseconds - other.milliseconds,
    ).normalize();
  }

  /**
   * @params {Date} date
   * @returns {Date}
   */
  toDate(date = new Date()) {
    date.setHours(
      this.#hours,
      this.#minutes,
      this.#seconds,
      this.#milliseconds,
    );
    return date;
  }
}
