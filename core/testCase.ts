export class TestCase {
  public static createWithNumParameters(num: number): TestCase {
    return new TestCase(new Array(num).fill(null));
  }

  public values: (number | null)[];

  constructor(values: (number | null)[]) {
    if (values.length <= 1) {
      throw new Error("values must be 2 or more elements");
    }
    this.values = values;
  }

  public getResultValues(): number[] {
    return this.values.map(Number);
  }

  public fill(values: (number | null)[]) {
    this.values = this.getFilledValues(values);
  }

  public getFilledValues(values: (number | null)[]): (number | null)[] {
    return values.map(
      (_, i) => (values[i] === null ? this.values[i] : values[i])
    );
  }

  public isEmpty(): boolean {
    return this.values.every(_ => _ === null);
  }

  public isFullfilled(): boolean {
    return this.values.every(_ => _ !== null);
  }
}
