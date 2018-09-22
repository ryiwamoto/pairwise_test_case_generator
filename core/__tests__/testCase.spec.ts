import { TestCase } from "../testCase";

describe("TestCase", () => {
  describe("#isFullfilled", () => {
    test.each`
      values          | expected
      ${[null, null]} | ${false}
      ${[null, 1]}    | ${false}
      ${[1, null]}    | ${false}
      ${[1, 2]}       | ${true}
    `("returns $expected when values is $values", ({ values, expected }) => {
      expect(new TestCase(values).isFullfilled()).toBe(expected);
    });
  });

  describe("#isEmpty", () => {
    test.each`
      values          | expected
      ${[null, null]} | ${true}
      ${[null, 1]}    | ${false}
      ${[1, null]}    | ${false}
      ${[1, 2]}       | ${false}
    `("returns $expected when values is $values", ({ values, expected }) => {
      expect(new TestCase(values).isEmpty()).toBe(expected);
    });
  });

  describe("#fill", () => {
    test.each`
      init                        | values                | expected
      ${[null, null, null, null]} | ${[2, 3, null, null]} | ${[2, 3, null, null]}
      ${[0, 0, 0, 0]}             | ${[null, 2, null, 4]} | ${[0, 2, 0, 4]}
    `(
      "returns $expected when init is $init and args are [$parameters, $values]",
      ({ init, values, expected }) => {
        const t = new TestCase(init);
        t.fill(values);
        expect(t.values).toEqual(expected);
      }
    );
  });
});
