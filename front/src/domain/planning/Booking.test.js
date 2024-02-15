import { describe, expect, it } from "vitest";
import Duration from "@/domain/planning/Duration";
import Booking from "@/domain/planning/Booking";

describe("booking", () => {
  describe("when booking between 13 h and 14 h", () => {
    it.each([
      [false, "12:30:00", "13:00:00"],
      [true, "12:30:00", "13:30:00"],
      [true, "12:30:00", "14:30:00"],
      [true, "13:00:00", "14:00:00"],
      [true, "13:30:00", "13:59:59.999"],
      [true, "13:30:00", "14:00:00"],
      [true, "13:30:00", "14:30:00"],
      [true, "13:59:59.999", "14:30:00.000"],
      [false, "14:00:00", "14:30:00"],
      [false, "14:30:00", "15:00:00"],
    ])(
      "should return [%s] when time window is between [%s] and [%s]",
      (expected, startTime, endTime) => {
        // Given
        const booking = new Booking(
          new Date("2024-01-01T13:00:00Z"),
          Duration.fromDuration("PT1H"),
        );
        const start = Duration.fromTimeString(startTime);
        const end = Duration.fromTimeString(endTime);

        // When
        const result = booking.isOverlapping(start, end, 0);

        // Then
        expect(result).toBe(expected);
      },
    );
  });

  describe("when booking between 13 h 59 and 14 h 29", () => {
    it.each([
      [false, "13:00:00", "13:30:00"],
      [true, "13:30:00", "14:00:00"],
      [true, "13:59:00", "14:00:00"],
      [true, "14:00:00", "14:30:00"],
      [false, "14:30:00", "15:00:00"],
    ])(
      "should return [%s] when time window is between [%s] and [%s]",
      (expected, startTime, endTime) => {
        // Given
        const booking = new Booking(
          new Date("1970-01-01T13:59:59.999Z"),
          Duration.fromDuration("PT30M"),
        );
        const start = Duration.fromTimeString(startTime);
        const end = Duration.fromTimeString(endTime);

        // When
        const result = booking.isOverlapping(start, end, 0);

        // Then
        expect(result).toBe(expected);
      },
    );
  });

  it.each([
    ["2024-01-01T13:00:00.000Z", "PT1H", "2024-01-01T14:00:00.000Z"],
    ["2024-01-01T13:00:00.000Z", "PT30M", "2024-01-01T13:30:00.000Z"],
    ["2024-01-01T13:00:00.000Z", "PT2H", "2024-01-01T15:00:00.000Z"],
  ])("should return the end date", (start, duration, expected) => {
    // Given
    const booking = new Booking(
      new Date(start),
      Duration.fromDuration(duration),
    );

    // When
    const result = booking.end;

    // Then
    expect(result.toISOString()).toBe(expected);
  });
});
