"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const slotState_1 = require("./slotState");
class Slot {
    constructor(values, state) {
        this.values = values;
        this.state = state;
        this.parameters = this.values.reduce((acc, v, i) => (v === null ? acc : [...acc, i]), []);
    }
    isParameterOverlapped(testCaseValues) {
        return (this.isParametersHaveNewOne(testCaseValues) &&
            this.isParametersConsistentWith(testCaseValues) &&
            this.canApply(testCaseValues));
    }
    markAsCovered() {
        this.state = slotState_1.SlotState.Covered;
    }
    isUncovered() {
        return this.state === slotState_1.SlotState.Uncovered;
    }
    isExcluded() {
        return this.state === slotState_1.SlotState.Excluded;
    }
    canPick() {
        return this.state !== slotState_1.SlotState.Excluded;
    }
    isCoveredBy(values) {
        return this.values.every((v, i) => v === null || this.values[i] === values[i]);
    }
    canApply(testCaseValues) {
        return this.values.every((v, i) => testCaseValues[i] === null || v === null || testCaseValues[i] === v);
    }
    isParametersHaveNewOne(values) {
        return values.some((v, i) => values[i] === null && this.values[i] !== null);
    }
    isParametersConsistentWith(values) {
        return values.some((v, i) => v !== null && v === this.values[i]);
    }
}
exports.Slot = Slot;
