"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCase = void 0;
class TestCase {
    static createWithNumParameters(num) {
        return new TestCase(new Array(num).fill(null));
    }
    constructor(values) {
        if (process.env.NODE_ENV === "development") {
            if (values.length <= 1) {
                throw new Error("values must be 2 or more elements");
            }
        }
        this.values = values;
    }
    getResultValues() {
        return this.values.map(Number);
    }
    fill(values) {
        this.values = this.getFilledValues(values);
    }
    getFilledValues(values) {
        return values.map((_, i) => (values[i] === null ? this.values[i] : values[i]));
    }
    isEmpty() {
        return this.values.every(_ => _ === null);
    }
    isFullfilled() {
        return this.values.every(_ => _ !== null);
    }
}
exports.TestCase = TestCase;
