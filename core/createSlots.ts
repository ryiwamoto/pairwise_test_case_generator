import { Slot } from "./slot";
import { SlotState } from "./slotState";

export { SlotState } from "./slotState";

export interface Model {
  name: string;

  values: string[];
}

export function createSlots(
  models: Model[],
  orderOfCombinations: number
): Slot[] {
  const parameterCombinations = getCombinations(
    createRange(0, models.length),
    orderOfCombinations
  );
  return parameterCombinations.reduce<Slot[]>(
    (acc, pc) => [
      ...acc,
      ...createValueCombinations(pc.map(_ => models[_].values.length)).map(
        values => toSlot(pc, values, models.length)
      )
    ],
    []
  );
}

function toSlot(parameters: number[], values: number[], max: number): Slot {
  const s = [];
  for (let i = 0; i < max; i++) {
    const j = parameters.indexOf(i);
    s[i] = j === -1 ? null : values[j];
  }
  return new Slot(s, SlotState.Uncovered);
}

function createRange(min: number, max: number): number[] {
  const range = [];
  for (let i = min; i < max; i++) {
    range.push(i);
  }
  return range;
}

function getCombinations(set: number[], k: number): number[][] {
  if (k > set.length || k <= 0) {
    return [];
  }
  if (k === set.length) {
    return [set];
  }
  const combs = [];
  if (k === 1) {
    for (const s of set) {
      combs.push([s]);
    }
    return combs;
  }
  for (let i = 0; i < set.length - k + 1; i++) {
    const head = set.slice(i, i + 1);
    const tailcombs = getCombinations(set.slice(i + 1), k - 1);
    for (const c of tailcombs) {
      combs.push(head.concat(c));
    }
  }
  return combs;
}

function createValueCombinations(values: number[]): number[][] {
  const [head, ...tail] = values;
  const seed = [];
  for (let i = 0; i < head; i++) {
    seed.push([i]);
  }
  return createValues(seed, tail);
}

function createValues(acc: number[][], values: number[]): number[][] {
  if (values.length === 0) {
    return acc;
  }
  const [current, ...next] = values;
  const nextAcc: number[][] = [];
  for (const v of acc) {
    for (let i = 0; i < current; i++) {
      nextAcc.push([...v, i]);
    }
  }
  return createValues(nextAcc, next);
}
