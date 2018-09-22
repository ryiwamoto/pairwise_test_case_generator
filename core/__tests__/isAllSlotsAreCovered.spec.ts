import { SlotState } from "../slotState";
import { Slot } from "../slot";
import { isAllSlotsAreCovered } from "./isAllSlotsAreCovered";

describe("checkAllSlotsCovered", () => {
  it("returns true if all slots are covered", () => {
    const slots = [
      new Slot([0, 0, null], SlotState.Uncovered),
      new Slot([0, 1, null], SlotState.Uncovered),
      new Slot([1, 0, null], SlotState.Uncovered),
      new Slot([1, 1, null], SlotState.Uncovered),

      new Slot([0, null, 0], SlotState.Uncovered),
      new Slot([0, null, 1], SlotState.Uncovered),
      new Slot([1, null, 0], SlotState.Uncovered),
      new Slot([1, null, 1], SlotState.Uncovered),

      new Slot([null, 0, 0], SlotState.Uncovered),
      new Slot([null, 0, 1], SlotState.Uncovered),
      new Slot([null, 1, 0], SlotState.Uncovered),
      new Slot([null, 1, 1], SlotState.Uncovered)
    ];
    const testCases = [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 1]];
    expect(isAllSlotsAreCovered(testCases, slots)).toBe(true);
  });

  it("returns false if any slots are not covered", () => {
    const slots = [
      new Slot([0, 0, null], SlotState.Uncovered),
      new Slot([0, 1, null], SlotState.Uncovered),
      new Slot([1, 0, null], SlotState.Uncovered),
      new Slot([1, 1, null], SlotState.Uncovered),

      new Slot([0, null, 0], SlotState.Uncovered),
      new Slot([0, null, 1], SlotState.Uncovered),
      new Slot([1, null, 0], SlotState.Uncovered),
      new Slot([1, null, 1], SlotState.Uncovered),

      new Slot([null, 0, 0], SlotState.Uncovered),
      new Slot([null, 0, 1], SlotState.Uncovered),
      new Slot([null, 1, 0], SlotState.Uncovered),
      new Slot([null, 1, 1], SlotState.Uncovered)
    ];
    const testCases = [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 0]];
    expect(isAllSlotsAreCovered(testCases, slots)).toBe(false);
  });

  it("returns false if excluded slots are covered", () => {
    const slots = [
      new Slot([0, 0, null], SlotState.Excluded),
      new Slot([0, 1, null], SlotState.Uncovered),
      new Slot([1, 0, null], SlotState.Uncovered),
      new Slot([1, 1, null], SlotState.Uncovered),

      new Slot([0, null, 0], SlotState.Uncovered),
      new Slot([0, null, 1], SlotState.Uncovered),
      new Slot([1, null, 0], SlotState.Uncovered),
      new Slot([1, null, 1], SlotState.Uncovered),

      new Slot([null, 0, 0], SlotState.Uncovered),
      new Slot([null, 0, 1], SlotState.Uncovered),
      new Slot([null, 1, 0], SlotState.Uncovered),
      new Slot([null, 1, 1], SlotState.Uncovered)
    ];
    const testCases = [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 1]];
    expect(isAllSlotsAreCovered(testCases, slots)).toBe(false);
  });

  it("returns true if excluded slots are not covered", () => {
    const slots = [
      new Slot([0, 0, null], SlotState.Excluded),
      new Slot([0, 1, null], SlotState.Uncovered),
      new Slot([1, 0, null], SlotState.Uncovered),
      new Slot([1, 1, null], SlotState.Uncovered),

      new Slot([0, null, 0], SlotState.Uncovered),
      new Slot([0, null, 1], SlotState.Uncovered),
      new Slot([1, null, 0], SlotState.Uncovered),
      new Slot([1, null, 1], SlotState.Uncovered),

      new Slot([null, 0, 0], SlotState.Uncovered),
      new Slot([null, 0, 1], SlotState.Uncovered),
      new Slot([null, 1, 0], SlotState.Uncovered),
      new Slot([null, 1, 1], SlotState.Uncovered)
    ];
    const testCases = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 2],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 2]
    ];
    expect(isAllSlotsAreCovered(testCases, slots)).toBe(true);
  });
});
