import PlanningModel from "./PlanningModel";
import { describe, expect, it } from "vitest";

describe("Planning", () => {
  it("should be created with availabilities and bookings", () => {
    const availabilities = [];
    const bookings = [];
    const planning = new PlanningModel(availabilities, bookings);
    expect(planning.availabilities).toStrictEqual([]);
    expect(planning.bookings).toStrictEqual([]);
  });
});
