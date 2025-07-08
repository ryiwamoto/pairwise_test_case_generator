import { Slot } from "./slot";
export { SlotState } from "./slotState";
export interface Model {
    name: string;
    values: string[];
}
export declare function createSlots(models: Model[], orderOfCombinations: number): Slot[];
