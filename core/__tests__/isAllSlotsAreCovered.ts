import { TestCase } from "../testCase";
import { Slot } from "../slot";
import { SlotState } from "../slotState";

export function isAllSlotsAreCovered(
  result: number[][],
  slots: Slot[]
): boolean {
  return (
    slots
      .filter(_ => !_.isExcluded())
      .every(s => result.some(t => s.isCoveredBy(t))) &&
    slots
      .filter(_ => _.isExcluded())
      .every(s => result.every(t => !s.isCoveredBy(t)))
  );
}
