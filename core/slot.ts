import { SlotState } from "./slotState";

export class Slot {
  public readonly values: (number | null)[];
  public readonly parameters: number[];
  private state: SlotState;
  public constructor(values: (number | null)[], state: SlotState) {
    this.values = values;
    this.state = state;
    this.parameters = this.values.reduce<number[]>(
      (acc, v, i) => (v === null ? acc : [...acc, i]),
      []
    );
  }

  public isParameterOverlapped(testCaseValues: (number | null)[]): boolean {
    return (
      this.isParametersHaveNewOne(testCaseValues) &&
      this.isParametersConsistentWith(testCaseValues) &&
      this.canApply(testCaseValues)
    );
  }

  public markAsCovered(): void {
    this.state = SlotState.Covered;
  }

  public isUncovered(): boolean {
    return this.state === SlotState.Uncovered;
  }

  public isExcluded(): boolean {
    return this.state === SlotState.Excluded;
  }

  public canPick(): boolean {
    return this.state !== SlotState.Excluded;
  }

  public isCoveredBy(values: (number | null)[]): boolean {
    return this.values.every(
      (v, i) => v === null || this.values[i] === values[i]
    );
  }

  private canApply(testCaseValues: (number | null)[]): boolean {
    return this.values.every(
      (v, i) =>
        testCaseValues[i] === null || v === null || testCaseValues[i] === v
    );
  }

  private isParametersHaveNewOne(values: (number | null)[]): boolean {
    return values.some((v, i) => values[i] === null && this.values[i] !== null);
  }

  private isParametersConsistentWith(values: (number | null)[]): boolean {
    return values.some((v, i) => v !== null && v === this.values[i]);
  }
}
