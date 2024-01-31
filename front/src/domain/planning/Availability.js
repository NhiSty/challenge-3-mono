export default class Availability {
  /**
   * @param {Duration} start
   * @param {Duration} end
   * @param {Day} weekDay
   */
  constructor(start, end, weekDay) {
    this._start = start;
    this._end = end;
    this._weekDay = weekDay;
  }

  get weekDay() {
    return this._weekDay;
  }

  /** @returns {Duration} */
  get start() {
    return this._start;
  }

  /** @returns {Duration} */
  get end() {
    return this._end;
  }
}
