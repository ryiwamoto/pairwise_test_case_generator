import { TestCase } from "./testCase";
import { Slot } from "./slot";
import { getRandomInt, RandomSeed } from "./random";

export class PairWise {
  private readonly slots: Slot[];

  private combinationNum: number;

  private randomSeed: RandomSeed = [123456789, 362436069, 521288629, 88675123];
  constructor(numParameters: number, slots: Slot[]) {
    this.combinationNum = numParameters;
    this.slots = slots;
  }

  public generate(): number[][] {
    const testCases = [];
    while (!this.isAllSlotsCovered()) {
      testCases.push(this.generateTestCase());
    }
    return testCases.map(_ => _.getResultValues());
  }

  public generateTestCase() {
    const testCase = TestCase.createWithNumParameters(this.combinationNum);
    while (!testCase.isFullfilled()) {
      const slot = this.pickSlot(testCase);
      slot.markAsCovered();
      testCase.fill(slot.values);
      this.slots.forEach(s => {
        if (s.isCoveredBy(testCase.values)) {
          s.markAsCovered();
        }
      });
    }
    return testCase;
  }

  public findMostUncoveredParameter(): number[] {
    const map: Map<string, [number[], number]> = new Map();
    this.selectUncoveredSlots().forEach(s => {
      const key = s.parameters.join(",");
      const [parameters, count] = map.get(key) || [s.parameters, 0];
      map.set(key, [parameters, count + 1]);
    });
    let score = -1;
    let picked: number[] = [];
    for (const [k, [p, v]] of map.entries()) {
      if (score < v) {
        score = v;
        picked = p;
      }
    }
    return picked;
  }

  public pickFirstUncoveredSlotOfParameter(
    parameters: number[]
  ): Slot | undefined {
    return this.slots.find(_ => _.parameters === parameters && _.isUncovered());
  }

  public pickSlotRandomly(): Slot {
    const availableSlots = this.slots.filter(_ => _.canPick());
    const [i, nextSeed] = getRandomInt(
      0,
      availableSlots.length - 1,
      this.randomSeed
    );
    this.randomSeed = nextSeed;
    return availableSlots[i];
  }

  public selectUncoveredSlots(): Slot[] {
    return this.slots.filter(_ => _.isUncovered());
  }

  public findMostEfficientSlot(testCase: TestCase): Slot {
    const slotsParameterOverlaped = this.findSlotsParameterOverlaped(testCase);
    if (slotsParameterOverlaped.length > 0) {
      const uncoveredSlots = this.slots.filter(_ => _.isUncovered());
      const [, mostEfficiencySlot] = slotsParameterOverlaped.reduce<
        [number, Slot]
      >(
        (acc, s) => {
          const [numCoveredSlots] = acc;
          const numCovered = uncoveredSlots.reduce(
            (acc2: number, s2: Slot) =>
              acc2 +
              (s2.isCoveredBy(testCase.getFilledValues(s.values)) ? 1 : 0),
            0
          );
          if (numCoveredSlots <= numCovered) {
            return [numCovered, s];
          } else {
            return acc;
          }
        },
        [0, slotsParameterOverlaped[0]]
      );
      return mostEfficiencySlot;
    } else {
      return this.pickSlotRandomly();
    }
  }

  private pickSlot(testCase: TestCase): Slot {
    if (testCase.isEmpty()) {
      return this.pickFirstUncoveredSlotOfParameter(
        this.findMostUncoveredParameter()
      )!;
    } else {
      return this.findMostEfficientSlot(testCase);
    }
  }

  private isAllSlotsCovered(): boolean {
    for (const s of this.slots) {
      if (s.isUncovered()) {
        return false;
      }
    }
    return true;
  }

  private findSlotsParameterOverlaped(testCase: TestCase): Slot[] {
    return this.slots
      .filter(_ => _.isUncovered())
      .filter(_ => _.isParameterOverlapped(testCase.values));
  }
}
