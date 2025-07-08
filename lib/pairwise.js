"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairWise = void 0;
const testCase_1 = require("./testCase");
const random_1 = require("./random");
class PairWise {
    constructor(numParameters, slots) {
        this.randomSeed = [123456789, 362436069, 521288629, 88675123];
        this.combinationNum = numParameters;
        this.slots = slots;
    }
    generate() {
        const testCases = [];
        while (!this.isAllSlotsCovered()) {
            testCases.push(this.generateTestCase());
        }
        return testCases.map(_ => _.getResultValues());
    }
    generateTestCase() {
        const testCase = testCase_1.TestCase.createWithNumParameters(this.combinationNum);
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
    findMostUncoveredParameter() {
        const map = new Map();
        this.selectUncoveredSlots().forEach(s => {
            const key = s.parameters.join(",");
            const [parameters, count] = map.get(key) || [s.parameters, 0];
            map.set(key, [parameters, count + 1]);
        });
        let score = -1;
        let picked = [];
        for (const [k, [p, v]] of map.entries()) {
            if (score < v) {
                score = v;
                picked = p;
            }
        }
        return picked;
    }
    pickFirstUncoveredSlotOfParameter(parameters) {
        return this.slots.find(_ => _.parameters === parameters && _.isUncovered());
    }
    pickSlotRandomly() {
        const availableSlots = this.slots.filter(_ => _.canPick());
        const [i, nextSeed] = (0, random_1.getRandomInt)(0, availableSlots.length - 1, this.randomSeed);
        this.randomSeed = nextSeed;
        return availableSlots[i];
    }
    selectUncoveredSlots() {
        return this.slots.filter(_ => _.isUncovered());
    }
    findMostEfficientSlot(testCase) {
        const slotsParameterOverlaped = this.findSlotsParameterOverlaped(testCase);
        if (slotsParameterOverlaped.length > 0) {
            const uncoveredSlots = this.slots.filter(_ => _.isUncovered());
            const [, mostEfficiencySlot] = slotsParameterOverlaped.reduce((acc, s) => {
                const [numCoveredSlots] = acc;
                const numCovered = uncoveredSlots.reduce((acc2, s2) => acc2 +
                    (s2.isCoveredBy(testCase.getFilledValues(s.values)) ? 1 : 0), 0);
                if (numCoveredSlots <= numCovered) {
                    return [numCovered, s];
                }
                else {
                    return acc;
                }
            }, [0, slotsParameterOverlaped[0]]);
            return mostEfficiencySlot;
        }
        else {
            return this.pickSlotRandomly();
        }
    }
    pickSlot(testCase) {
        if (testCase.isEmpty()) {
            return this.pickFirstUncoveredSlotOfParameter(this.findMostUncoveredParameter());
        }
        else {
            return this.findMostEfficientSlot(testCase);
        }
    }
    isAllSlotsCovered() {
        for (const s of this.slots) {
            if (s.isUncovered()) {
                return false;
            }
        }
        return true;
    }
    findSlotsParameterOverlaped(testCase) {
        return this.slots
            .filter(_ => _.isUncovered())
            .filter(_ => _.isParameterOverlapped(testCase.values));
    }
}
exports.PairWise = PairWise;
