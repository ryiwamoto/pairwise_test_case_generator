import { TestCase } from "./testCase";
import { Slot } from "./slot";
export declare class PairWise {
    private readonly slots;
    private combinationNum;
    private randomSeed;
    constructor(numParameters: number, slots: Slot[]);
    generate(): number[][];
    generateTestCase(): TestCase;
    findMostUncoveredParameter(): number[];
    pickFirstUncoveredSlotOfParameter(parameters: number[]): Slot | undefined;
    pickSlotRandomly(): Slot;
    selectUncoveredSlots(): Slot[];
    findMostEfficientSlot(testCase: TestCase): Slot;
    private pickSlot;
    private isAllSlotsCovered;
    private findSlotsParameterOverlaped;
}
