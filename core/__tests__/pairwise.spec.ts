import { PairWise } from "../pairwise";
import { Slot } from "../slot";
import { SlotState } from "../slotState";
import { TestCase } from "../testCase";
import { isAllSlotsAreCovered } from "./isAllSlotsAreCovered";
import { createSlots } from "../createSlots";

describe("PairWise", () => {
  test("findMostUncoveredParameter", () => {
    const pw = new PairWise(3, [
      new Slot([0, 0, null], SlotState.Covered),
      new Slot([0, 1, null], SlotState.Uncovered),
      new Slot([1, 0, null], SlotState.Uncovered),
      new Slot([1, 1, null], SlotState.Uncovered),

      new Slot([0, null, 0], SlotState.Uncovered),
      new Slot([0, null, 1], SlotState.Uncovered),
      new Slot([1, null, 0], SlotState.Uncovered),
      new Slot([1, null, 1], SlotState.Uncovered),

      new Slot([null, 0, 0], SlotState.Uncovered),
      new Slot([null, 0, 1], SlotState.Excluded),
      new Slot([null, 1, 0], SlotState.Uncovered),
      new Slot([null, 1, 1], SlotState.Uncovered)
    ]);
    const result = pw.findMostUncoveredParameter();
    expect(result).toEqual([0, 2]);
  });

  test("findMostEfficientSlot", () => {
    const p1 = [0, 1];
    const p2 = [0, 2];
    const p3 = [1, 2];
    const pw = new PairWise(3, [
      new Slot([0, 0, null], SlotState.Covered),
      new Slot([0, 1, null], SlotState.Covered),
      new Slot([1, 0, null], SlotState.Uncovered),
      new Slot([1, 1, null], SlotState.Uncovered),

      new Slot([0, null, 0], SlotState.Covered),
      new Slot([0, null, 1], SlotState.Uncovered),
      new Slot([1, null, 0], SlotState.Uncovered),
      new Slot([1, null, 1], SlotState.Uncovered),

      new Slot([null, 0, 0], SlotState.Covered),
      new Slot([null, 0, 1], SlotState.Uncovered),
      new Slot([null, 1, 0], SlotState.Uncovered),
      new Slot([null, 1, 1], SlotState.Uncovered)
    ]);
    const testCase = new TestCase([0, 1, null]);
    const result = pw.findMostEfficientSlot(testCase);
    expect(result.values).toEqual([null, 1, 1]);
  });

  test("generate", () => {
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
    const pw = new PairWise(3, slots);
    const result = pw.generate();
    const expected = [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 1]];
    expect(isAllSlotsAreCovered(result, slots)).toBe(true);
    expect(result).toEqual(expected);
  });

  test("generate(3 values)", () => {
    const slots = [
      new Slot([0, 0, null], SlotState.Uncovered),
      new Slot([0, 1, null], SlotState.Uncovered),
      new Slot([1, 0, null], SlotState.Uncovered),
      new Slot([1, 1, null], SlotState.Uncovered),

      new Slot([0, null, 0], SlotState.Uncovered),
      new Slot([0, null, 1], SlotState.Uncovered),
      new Slot([0, null, 2], SlotState.Uncovered),
      new Slot([1, null, 0], SlotState.Uncovered),
      new Slot([1, null, 1], SlotState.Uncovered),
      new Slot([1, null, 2], SlotState.Uncovered),

      new Slot([null, 0, 0], SlotState.Uncovered),
      new Slot([null, 0, 1], SlotState.Uncovered),
      new Slot([null, 0, 2], SlotState.Uncovered),
      new Slot([null, 1, 0], SlotState.Uncovered),
      new Slot([null, 1, 1], SlotState.Uncovered),
      new Slot([null, 1, 2], SlotState.Uncovered)
    ];
    const pw = new PairWise(3, slots);
    const result = pw.generate();
    const expected = [
      [0, 1, 0],
      [0, 0, 1],
      [0, 1, 2],
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 2]
    ];
    expect(result.length === 6);
    expect(isAllSlotsAreCovered(result, slots)).toBe(true);
    expect(result).toEqual(expected);
  });

  test("generate (excluded)", () => {
    const slots = [
      new Slot([0, 0, null], SlotState.Excluded),
      new Slot([0, 1, null], SlotState.Uncovered),
      new Slot([1, 0, null], SlotState.Uncovered),
      new Slot([1, 1, null], SlotState.Uncovered),

      new Slot([0, null, 0], SlotState.Uncovered),
      new Slot([0, null, 1], SlotState.Uncovered),
      new Slot([0, null, 2], SlotState.Uncovered),
      new Slot([1, null, 0], SlotState.Uncovered),
      new Slot([1, null, 1], SlotState.Uncovered),
      new Slot([1, null, 2], SlotState.Uncovered),

      new Slot([null, 0, 0], SlotState.Uncovered),
      new Slot([null, 0, 1], SlotState.Uncovered),
      new Slot([null, 0, 2], SlotState.Uncovered),
      new Slot([null, 1, 0], SlotState.Uncovered),
      new Slot([null, 1, 1], SlotState.Uncovered),
      new Slot([null, 1, 2], SlotState.Uncovered)
    ];
    const pw = new PairWise(3, slots);
    const result = pw.generate();
    const expected = [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 2],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 2],
      [0, 0, 2]
    ];
    expect(result.length === 6);
    expect(isAllSlotsAreCovered(result, slots)).toBe(true);
    expect(result).toEqual(expected);
  });
});
