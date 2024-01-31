import Planning from "./Planning";
import { describe, expect, it } from "vitest";

describe("Planning", () => {
  it("should be created with availabilities and bookings", () => {
    const availabilities = [];
    const bookings = [];
    const planning = new Planning(availabilities, bookings);
    expect(planning.availabilities).toBe([]);
    expect(planning.bookings).toBe([]);
  });
});
