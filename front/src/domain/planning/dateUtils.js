export const ISO_DURATION_REGEX =
  /^P(?:(?<years>[0-9]+)Y)?(?:(?<months>[0-9]+)M)?(?:(?<days>[0-9]+)D)?(?:T(?:(?<hours>[0-9]+)H)?(?:(?<minutes>[0-9]+)M)?(?:(?<seconds>[0-9.]+)S)?)?$/;
export const ISO_TIME_REGEX =
  /T?(?<hours>[0-9]+):(?<minutes>[0-9]+):(?<seconds>[0-9]+)(?:\.(?<milliseconds>[0-9]+))?[+Z]?/;

/**
 * @param {Date} date
 * @param {Duration} duration
 * @returns {Date}
 */
export function addDuration(date, duration) {
  const result = new Date(date);
  result.setHours(result.getHours() + duration.hours);
  result.setMinutes(result.getMinutes() + duration.minutes);
  result.setSeconds(result.getSeconds() + duration.seconds);
  result.setMilliseconds(result.getMilliseconds() + duration.milliseconds);
  return result;
}

/**
 * @param {Date} date
 * @param {Date} start
 * @param {Date} end
 * @returns {boolean}
 */
export function isDateBetween(date, start, end) {
  return date >= start && date < end;
}
