"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotState = void 0;
exports.createSlots = createSlots;
const slot_1 = require("./slot");
const slotState_1 = require("./slotState");
var slotState_2 = require("./slotState");
Object.defineProperty(exports, "SlotState", { enumerable: true, get: function () { return slotState_2.SlotState; } });
function createSlots(models, orderOfCombinations) {
    const parameterCombinations = getCombinations(createRange(0, models.length), orderOfCombinations);
    return parameterCombinations.reduce((acc, pc) => [
        ...acc,
        ...createValueCombinations(pc.map(_ => models[_].values.length)).map(values => toSlot(pc, values, models.length))
    ], []);
}
function toSlot(parameters, values, max) {
    const s = [];
    for (let i = 0; i < max; i++) {
        const j = parameters.indexOf(i);
        s[i] = j === -1 ? null : values[j];
    }
    return new slot_1.Slot(s, slotState_1.SlotState.Uncovered);
}
function createRange(min, max) {
    const range = [];
    for (let i = min; i < max; i++) {
        range.push(i);
    }
    return range;
}
function getCombinations(set, k) {
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
function createValueCombinations(values) {
    const [head, ...tail] = values;
    const seed = [];
    for (let i = 0; i < head; i++) {
        seed.push([i]);
    }
    return createValues(seed, tail);
}
function createValues(acc, values) {
    if (values.length === 0) {
        return acc;
    }
    const [current, ...next] = values;
    const nextAcc = [];
    for (const v of acc) {
        for (let i = 0; i < current; i++) {
            nextAcc.push([...v, i]);
        }
    }
    return createValues(nextAcc, next);
}
