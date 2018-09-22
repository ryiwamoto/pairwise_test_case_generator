import { createSlots, Model } from "../createSlots";

describe("createSlots", () => {
  it("creates slots from models", () => {
    const models: Model[] = [
      {
        name: "modelA",
        values: ["vA1", "vA2"]
      },
      {
        name: "modelB",
        values: ["vB1", "vB2"]
      },
      {
        name: "modelC",
        values: ["vC1", "vC2", "vC3"]
      }
    ];
    expect(createSlots(models, 2).map(s => s.values)).toEqual([
      [0, 0, null],
      [0, 1, null],
      [1, 0, null],
      [1, 1, null],
      [0, null, 0],
      [0, null, 1],
      [0, null, 2],
      [1, null, 0],
      [1, null, 1],
      [1, null, 2],
      [null, 0, 0],
      [null, 0, 1],
      [null, 0, 2],
      [null, 1, 0],
      [null, 1, 1],
      [null, 1, 2]
    ]);
  });
});
