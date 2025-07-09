import { SlotState } from "./slotState";
export declare class Slot {
    readonly values: (number | null)[];
    readonly parameters: number[];
    private state;
    constructor(values: (number | null)[], state: SlotState);
    isParameterOverlapped(testCaseValues: (number | null)[]): boolean;
    markAsCovered(): void;
    isUncovered(): boolean;
    isExcluded(): boolean;
    canPick(): boolean;
    isCoveredBy(values: (number | null)[]): boolean;
    private canApply;
    private isParametersHaveNewOne;
    private isParametersConsistentWith;
}
