import {
  ISO_DURATION_REGEX,
  ISO_TIME_REGEX,
} from "@/domain/planning/dateUtils";

export default class Duration {
  /**
   * @param {number} hours
   * @param {number} minutes
   * @param {number} seconds
   * @param {number} milliseconds
   */
  constructor(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    this._hours = hours;
    this._minutes = minutes;
    this._seconds = seconds;
    this._milliseconds = milliseconds;
    this.normalize();
  }

  normalize() {
    this.addSeconds(Math.floor(this._milliseconds / 1000));
    this._milliseconds %= 1000;
    this.addMinutes(Math.floor(this._seconds / 60));
    this._seconds %= 60;
    this.addHours(Math.floor(this._minutes / 60));
    this._minutes %= 60;
    return this;
  }

  /**
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
   * @param {string} time
   * @returns {Duration}
   */
  static fromTimeString(time) {
    const match = time.match(ISO_TIME_REGEX);
    if (!match) {
      throw new Error(`Invalid ISO time: ${time}`);
    }

    const hours = parseInt(match.groups.hours);
    const minutes = parseInt(match.groups.minutes);
    const seconds = parseInt(match.groups.seconds);
    const milliseconds = parseInt(match.groups.milliseconds);

    return new Duration(hours, minutes, seconds, milliseconds);
  }

  /**
   * @param {Date} date
   * @returns {Duration}
   */
  static fromDate(date) {
    return new Duration(
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    );
  }

  addMilliseconds(milliseconds) {
    this._milliseconds += milliseconds;
    if (this._milliseconds >= 1000) {
      const seconds = Math.floor(this._milliseconds / 1000);
      this.addSeconds(seconds);
      this._milliseconds %= 1000;
    }
    return this;
  }

  addSeconds(seconds) {
    this._seconds += seconds;
    if (this._seconds >= 60) {
      const minutes = Math.floor(this._seconds / 60);
      this.addMinutes(minutes);
      this._seconds %= 60;
    }
    return this;
  }

  addMinutes(minutes) {
    this._minutes += minutes;
    if (this._minutes >= 60) {
      const hours = Math.floor(this._minutes / 60);
      this.addHours(hours);
      this._minutes %= 60;
    }
    return this;
  }

  addHours(hours) {
    this._hours += hours;
    return this;
  }

  /**
   * @param {Duration} other
   * @returns {boolean}
   */
  isSameOrAfter(other) {
    if (this.hours < other.hours) {
      return false;
    }
    if (this.hours > other.hours) {
      return true;
    }
    if (this.minutes < other.minutes) {
      return false;
    }
    if (this.minutes > other.minutes) {
      return true;
    }
    if (this.seconds < other.seconds) {
      return false;
    }
    if (this.seconds > other.seconds) {
      return true;
    }
    if (this.milliseconds < other.milliseconds) {
      return false;
    }
    if (this.milliseconds > other.milliseconds) {
      return true;
    }
    return true;
  }

  /**
   * @param {Duration} other
   * @returns {boolean}
   */
  isSameOrBefore(other) {
    if (this.hours > other.hours) {
      return false;
    }
    if (this.hours < other.hours) {
      return true;
    }
    if (this.minutes > other.minutes) {
      return false;
    }
    if (this.minutes < other.minutes) {
      return true;
    }
    if (this.seconds > other.seconds) {
      return false;
    }
    if (this.seconds < other.seconds) {
      return true;
    }
    if (this.milliseconds > other.milliseconds) {
      return false;
    }
    if (this.milliseconds < other.milliseconds) {
      return true;
    }
    return true;
  }

  clone() {
    return new Duration(
      this._hours,
      this._minutes,
      this._seconds,
      this._milliseconds,
    );
  }

  get hours() {
    return this._hours;
  }

  get minutes() {
    return this._minutes;
  }

  /**
   * @returns {number}
   */
  toMinutes() {
    return this._hours * 60 + this._minutes;
  }

  /**
   * @returns {number}
   */
  toMilliseconds() {
    return (
      this._hours * 60 * 60 * 1000 +
      this._minutes * 60 * 1000 +
      this._seconds * 1000 +
      this._milliseconds
    );
  }

  get seconds() {
    return this._seconds;
  }

  get milliseconds() {
    return this._milliseconds;
  }

  /**
   * @returns {string}
   */
  toString() {
    return `PT${this._hours}H${this._minutes}M${this._seconds}S`;
  }

  /**
   * @returns {string}
   */
  toLocaleTimeString() {
    return `${this._hours.toString().padStart(2, "0")}:${this._minutes.toString().padStart(2, "0")}`;
  }
}
