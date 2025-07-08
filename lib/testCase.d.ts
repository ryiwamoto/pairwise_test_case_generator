export declare class TestCase {
    static createWithNumParameters(num: number): TestCase;
    values: (number | null)[];
    constructor(values: (number | null)[]);
    getResultValues(): number[];
    fill(values: (number | null)[]): void;
    getFilledValues(values: (number | null)[]): (number | null)[];
    isEmpty(): boolean;
    isFullfilled(): boolean;
}
