import { addDuration, isDateBetween } from "./dateUtils";
import { describe, expect, it } from "vitest";
import Duration from "@/domain/planning/Duration";

describe("DateUtils", () => {
  it("should add duration to date", () => {
    // Given
    const date = new Date("2020-01-01T00:00:00.000Z");
    const duration = new Duration(1, 2, 3, 4);

    // When
    const result = addDuration(date, duration);

    // Then
    expect(result).toEqual(new Date("2020-01-01T01:02:03.004Z"));
  });

  it("should add duration with overflow", () => {
    // Given
    const date = new Date("2020-01-01T13:59:59.999Z");
    const duration = new Duration(0, 30, 0, 6);

    // When
    const result = addDuration(date, duration);

    // Then
    expect(result).toEqual(new Date("2020-01-01T14:30:00.005Z"));
  });

  it("should get dates between", () => {
    // Given
    const start = new Date("2020-01-01T00:00:00.000Z");
    const date = new Date("2020-01-01T12:00:00.000Z");
    const end = new Date("2020-01-02T00:00:00.000Z");

    // When
    const result = isDateBetween(date, start, end);

    // Then
    expect(result).toBeTruthy();
  });

  it("should get dates between", () => {
    // Given
    const start = new Date("2020-01-01T00:00:00.000Z");
    const date = new Date("2020-01-02T12:00:00.000Z");
    const end = new Date("2020-01-02T00:00:00.000Z");

    // When
    const result = isDateBetween(date, start, end);

    // Then
    expect(result).toBeFalsy();
  });
});
