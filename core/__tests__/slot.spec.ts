import { Slot } from "../slot";
import { SlotState } from "../slotState";
import { TestCase } from "../testCase";

describe("Slot", () => {
  describe("parameters", () => {
    test.each`
      values          | expected
      ${[1, 2, null]} | ${[0, 1]}
    `("returns $expected when values ar $values", ({ values, expected }) => {
      const t = new Slot(values, SlotState.Uncovered);
      expect(t.parameters).toEqual(expected);
    });
  });

  describe("isParameterOverlapped", () => {
    test.each`
      slot            | testCase              | expected
      ${[0, 1, null]} | ${[null, null, null]} | ${false}
      ${[0, 1, null]} | ${[null, 1, 2]}       | ${true}
      ${[0, 1, null]} | ${[0, 2, null]}       | ${false}
    `(
      "returns $expected when slot is $slot and testCase is $testCase",
      ({ slot, testCase, expected }) => {
        const t = new Slot(slot, SlotState.Uncovered);
        expect(t.isParameterOverlapped(testCase)).toEqual(expected);
      }
    );
  });
});
