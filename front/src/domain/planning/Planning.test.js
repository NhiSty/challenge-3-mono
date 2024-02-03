import PlanningModel from "./PlanningModel";
import { describe, expect, it } from "vitest";
import Duration from "@/domain/planning/Duration";

describe("Planning", () => {
  it("should be created with availabilities and bookings", () => {
    const availabilities = [];
    const bookings = [];
    const planning = new PlanningModel(availabilities, bookings);
    expect(planning.availabilities).toStrictEqual([]);
    expect(planning.bookings).toStrictEqual([]);
  });

  it.each([
    [
      true,
      "13:00:00",
      "14:00:00",
      {
        start_datetime: "2024-01-01T13:00:00Z",
        duration: "PT1H",
      },
    ],
    [
      true,
      "13:00:00.001",
      "14:00:00.001",
      {
        start_datetime: "2024-01-01T13:00:00Z",
        duration: "PT1H",
      },
    ],
    [
      true,
      "13:30:00",
      "14:00:00",
      {
        start_datetime: "2024-01-01T13:00:00Z",
        duration: "PT1H",
      },
    ],
    [
      false,
      "12:30:00",
      "13:00:00",
      {
        start_datetime: "2024-01-01T13:00:00Z",
        duration: "PT1H",
      },
    ],
    [
      false,
      "13:30:00",
      "13:59:59.999",
      {
        start_datetime: "2024-01-01T13:00:00Z",
        duration: "PT1H",
      },
    ],
    [
      false,
      "14:00:00",
      "14:30:00",
      {
        start_datetime: "2024-01-01T13:00:00Z",
        duration: "PT1H",
      },
    ],
    [
      false,
      "14:30:00",
      "15:00:00",
      {
        start_datetime: "2024-01-01T13:00:00Z",
        duration: "PT1H",
      },
    ],
  ])(
    "when booking between 13 h and 14 h, should return %s if time window is %s and %s",
    (expected, startTime, endTime, booking) => {
      // Given
      /** @type {ApiAvailability[]} */
      const availabilities = [];
      /** @type {ApiBooking[]} */
      const bookings = [booking];
      const planning = new PlanningModel(availabilities, bookings);
      const start = Duration.fromTimeString(startTime);
      const end = Duration.fromTimeString(endTime);

      // When
      const result = planning.isThereBookingOverlappingOnTimeWindow(start, end);

      // Then
      expect(result).toBe(expected);
    },
  );
});
