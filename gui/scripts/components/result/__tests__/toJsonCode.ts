import { PairwiseModel } from "../../../modules/pairwise";
import { toJSONCode } from "../resultJSONCode";

describe("toJSONCode", () => {
  test("generates JSON array", () => {
    const models: PairwiseModel[] = [
      {
        name: "A",
        values: ["A1", "A2"]
      },
      {
        name: "B",
        values: ["1", "2"]
      }
    ];
    const result = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const expected =
      '[\n  ["A1", 1],\n  ["A1", 2],\n  ["A2", 1],\n  ["A2", 2]\n]\n';
    expect(toJSONCode(models, result)).toEqual(expected);
  });
});
