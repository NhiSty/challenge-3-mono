import Duration from "@/domain/planning/Duration";
import { describe, expect, it } from "vitest";

describe("Duration", () => {
  it("should create Time with default values", () => {
    // Given
    const duration = new Duration();

    // Then
    expect(duration.hours).toBe(0);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(0);
  });

  it("should create Time with given values", () => {
    // Given
    const duration = new Duration(1, 2, 3, 4);

    // Then
    expect(duration.hours).toBe(1);
    expect(duration.minutes).toBe(2);
    expect(duration.seconds).toBe(3);
    expect(duration.milliseconds).toBe(4);
  });

  it("should create Time from duration", () => {
    // Given
    const duration = Duration.fromDuration("PT1H2M3.004S");

    // Then
    expect(duration.hours).toBe(1);
    expect(duration.minutes).toBe(2);
    expect(duration.seconds).toBe(3);
    expect(duration.milliseconds).toBe(4);
  });

  it.each([
    ["10:30:28.287Z", 10, 30, 28, 287],
    ["10:30:28", 10, 30, 28, 0],
  ])(
    "should create Time from time string",
    (
      durationString,
      expectedHours,
      expectedMinutes,
      expectedSeconds,
      expectedMilliseconds,
    ) => {
      // Given
      const duration = Duration.fromTimeString(durationString);

      // Then
      expect(duration.hours).toBe(expectedHours);
      expect(duration.minutes).toBe(expectedMinutes);
      expect(duration.seconds).toBe(expectedSeconds);
      expect(duration.milliseconds).toBe(expectedMilliseconds);
    },
  );

  it("should create Time from datetime string", () => {
    // Given
    const duration = Duration.fromTimeString("2020-01-01T10:30:28.287Z");

    // Then
    expect(duration.hours).toBe(10);
    expect(duration.minutes).toBe(30);
    expect(duration.seconds).toBe(28);
    expect(duration.milliseconds).toBe(287);
  });

  it("should add milliseconds", () => {
    // Given
    const duration = new Duration(0, 0, 0, 5);

    // When
    duration.addMilliseconds(1150);

    // Then
    expect(duration.hours).toBe(0);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(1);
    expect(duration.milliseconds).toBe(155);
  });

  it("should add seconds", () => {
    // Given
    const duration = new Duration(0, 0, 5, 0);

    // When
    duration.addSeconds(65);

    // Then
    expect(duration.hours).toBe(0);
    expect(duration.minutes).toBe(1);
    expect(duration.seconds).toBe(10);
    expect(duration.milliseconds).toBe(0);
  });

  it("should add minutes", () => {
    // Given
    const duration = new Duration(0, 5, 0, 0);

    // When
    duration.addMinutes(65);

    // Then
    expect(duration.hours).toBe(1);
    expect(duration.minutes).toBe(10);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(0);
  });

  it("should add hours", () => {
    // Given
    const duration = new Duration(5, 0, 0, 0);

    // When
    duration.addHours(25);

    // Then
    expect(duration.hours).toBe(30);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(0);
  });

  it("should add all", () => {
    // Given
    const duration = new Duration(0, 0, 0, 0);

    // When
    duration.addMilliseconds(1000 * 60 * 60 * 24);

    // Then
    expect(duration.hours).toBe(24);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(0);
  });

  it("should add duration", () => {
    // Given
    const duration = new Duration(9, 8, 7, 6);
    const other = new Duration(1, 2, 3, 4);

    // When
    duration.addDuration(other);

    // Then
    expect(duration.hours).toBe(10);
    expect(duration.minutes).toBe(10);
    expect(duration.seconds).toBe(10);
    expect(duration.milliseconds).toBe(10);
  });

  it("should add duration overflow", () => {
    // Given
    const duration = new Duration(9, 59, 59, 999);
    const other = new Duration(0, 0, 0, 2);

    // When
    duration.addDuration(other);

    // Then
    expect(duration.hours).toBe(10);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(0);
    expect(duration.milliseconds).toBe(1);
  });

  it.each([
    ["13:00:00", "14:00:00", true],
    ["13:30:00", "14:00:00", true],
    ["13:30:00", "13:00:00", false],
    ["15:00:00", "14:30:00", false],
    ["15:00:00", "15:00:00", false],
  ])("[%s] should be after [%s] [%s]", (before, after, isAfter) => {
    // Given
    const beforeDuration = Duration.fromTimeString(before);
    const afterDuration = Duration.fromTimeString(after);

    // Then
    expect(afterDuration.isAfter(beforeDuration)).toBe(isAfter);
  });

  it.each([
    ["13:00:00", "14:00:00", false],
    ["13:30:00", "14:00:00", false],
    ["13:30:00", "13:00:00", true],
    ["15:00:00", "14:30:00", true],
    ["15:00:00", "15:00:00", false],
  ])("[%s] should be before [%s] [%s]", (before, after, isBefore) => {
    // Given
    const beforeDuration = Duration.fromTimeString(before);
    const afterDuration = Duration.fromTimeString(after);

    // Then
    expect(afterDuration.isBefore(beforeDuration)).toBe(isBefore);
  });

  it.each([
    ["13:00:00", "13:00:00", true],
    ["13:30:00", "14:00:00", false],
    ["13:30:00", "13:00:00", false],
    ["15:00:00", "14:30:00", false],
    ["15:00:00", "15:00:00", true],
  ])("[%s] should be same as [%s] [%s]", (before, after, isSame) => {
    // Given
    const beforeDuration = Duration.fromTimeString(before);
    const afterDuration = Duration.fromTimeString(after);

    // Then
    expect(afterDuration.isSame(beforeDuration)).toBe(isSame);
  });

  it("should normalize", () => {
    // Given
    const duration = new Duration(0, 540, 0, 1000);

    // When
    duration.normalize();

    // Then
    expect(duration.hours).toBe(9);
    expect(duration.minutes).toBe(0);
    expect(duration.seconds).toBe(1);
    expect(duration.milliseconds).toBe(0);
  });

  it("should parse date to duration", () => {
    // Given
    const date = new Date(2023, 5, 28, 6, 48, 52, 900);

    // When
    const duration = Duration.fromDate(date);

    // Then
    expect(duration.hours).toBe(6);
    expect(duration.minutes).toBe(48);
    expect(duration.seconds).toBe(52);
    expect(duration.milliseconds).toBe(900);
  });
});
