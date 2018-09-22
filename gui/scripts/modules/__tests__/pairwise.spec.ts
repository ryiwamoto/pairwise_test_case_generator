import {
  PairwiseActionType,
  PairwiseStore,
  addRow,
  pairwiseReducer,
  deleteRow,
  addCol,
  deleteCol,
  updateRowName,
  updateCol,
  startGeneration,
  endGeneration,
  changeResultFormat
} from "../pairwise";
import { ResultFormat } from "../resultFormat";

describe("pairwiseModule", () => {
  const defaultStore: PairwiseStore = {
    models: [],
    filteredModels: [],
    result: [],
    format: ResultFormat.Table,
    isGenerating: false
  };
  test(PairwiseActionType.ROW_WAS_ADDED, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      models: [{ name: "A", values: ["1", "2", "3"] }]
    };
    const action = addRow();
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "", values: [""] }
      ]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(PairwiseActionType.ROW_WAS_DELETED, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5"] },
        { name: "C", values: ["6", "7", "8"] }
      ]
    };
    const action = deleteRow(1);
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "C", values: ["6", "7", "8"] }
      ]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(PairwiseActionType.COL_WAS_ADDED, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5"] },
        { name: "C", values: ["6", "7", "8"] }
      ]
    };
    const action = addCol(1);
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5", ""] },
        { name: "C", values: ["6", "7", "8"] }
      ]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(`${PairwiseActionType.COL_WAS_DELETED}(first)`, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    const action = deleteCol(0, 1);
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "3"] },
        { name: "B", values: ["4", "5", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(`${PairwiseActionType.COL_WAS_DELETED}(middle)`, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    const action = deleteCol(1, 0);
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["5", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(`${PairwiseActionType.COL_WAS_UPDATED}`, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    const action = updateCol(1, 1, "updated");
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "updated", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(`${PairwiseActionType.COL_WAS_DELETED}(last)`, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    const action = deleteCol(2, 1);
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5", "6"] },
        { name: "C", values: ["7", "9", "10"] }
      ]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(`${PairwiseActionType.NAME_WAS_UPDATED}`, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B", values: ["4", "5", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    const action = updateRowName(1, "B2");
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      models: [
        { name: "A", values: ["1", "2", "3"] },
        { name: "B2", values: ["4", "5", "6"] },
        { name: "C", values: ["7", "8", "9", "10"] }
      ]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(`${PairwiseActionType.GENERATION_IS_STARTED}`, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      isGenerating: false
    };
    const action = startGeneration();
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      isGenerating: true
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(`${PairwiseActionType.GENERATION_IS_ENDED}`, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      isGenerating: true
    };
    const action = endGeneration(
      [{ name: "a", values: ["0", "1"] }, { name: "b", values: ["0", "1"] }],
      [[0, 1], [1, 0]]
    );
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      filteredModels: [
        { name: "a", values: ["0", "1"] },
        { name: "b", values: ["0", "1"] }
      ],
      isGenerating: false,
      result: [[0, 1], [1, 0]]
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });

  test(`${PairwiseActionType.RESULT_FORMAT_WAS_CHANGED}`, () => {
    const initStore: PairwiseStore = {
      ...defaultStore,
      format: ResultFormat.Table
    };
    const action = changeResultFormat(ResultFormat.JSON);
    const expectedStore: PairwiseStore = {
      ...defaultStore,
      format: ResultFormat.JSON
    };
    expect(pairwiseReducer(initStore, action)).toEqual(expectedStore);
  });
});
