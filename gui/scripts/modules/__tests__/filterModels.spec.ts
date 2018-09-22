import { PairwiseModel } from "../pairwise";
import { filterModels } from "../filterModels";

describe("filterModels", () => {
  it("removes empty values and models that's name is empty", () => {
    const models: PairwiseModel[] = [
      {
        name: "model1",
        values: ["", "a", "b", "", "c", "", ""]
      },
      {
        name: "",
        values: ["d", "e", "f", "g", "h", "i"]
      },
      {
        name: "model3",
        values: ["j", "k", "l", "m"]
      }
    ];
    expect(filterModels(models)).toEqual([
      {
        name: "model1",
        values: ["a", "b", "c"]
      },
      {
        name: "model3",
        values: ["j", "k", "l", "m"]
      }
    ]);
  });
});
