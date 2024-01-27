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

  it("should create Time from time string", () => {
    // Given
    const duration = Duration.fromTimeString("10:30:28.287Z");

    // Then
    expect(duration.hours).toBe(10);
    expect(duration.minutes).toBe(30);
    expect(duration.seconds).toBe(28);
    expect(duration.milliseconds).toBe(287);
  });

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

  it("should be after", () => {
    // Given
    const duration = new Duration(1, 0, 0, 0);
    const other = new Duration(0, 0, 0, 0);

    // Then
    expect(duration.isSameOrAfter(other)).toBeTruthy();
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
});
