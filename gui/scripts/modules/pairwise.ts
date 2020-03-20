import { ThunkAction } from "redux-thunk";
import { AppStore } from "../main";
import { createSlots, PairWise } from "../../../core";
import { filterModels } from "./filterModels";
import { ResultFormat } from "./resultFormat";
import { start } from "repl";

export enum PairwiseActionType {
  ROW_WAS_ADDED = "pairwise/row/add",
  ROW_WAS_DELETED = "pairwise/row/delete",

  COL_WAS_ADDED = "pairwise/col/add",
  COL_WAS_UPDATED = "pairwise/col/update",
  COL_WAS_DELETED = "pairwise/col/delete",

  NAME_WAS_UPDATED = "pairwise/name/update",

  GENERATION_IS_STARTED = "pairwise/generation/start",
  GENERATION_IS_ENDED = "pairwise/generation/end",

  RESULT_FORMAT_WAS_CHANGED = "pairwise/format/change"
}

type PairwiseAction =
  | ReturnType<typeof addRow>
  | ReturnType<typeof updateRowName>
  | ReturnType<typeof deleteRow>
  | ReturnType<typeof addCol>
  | ReturnType<typeof updateCol>
  | ReturnType<typeof deleteCol>
  | ReturnType<typeof startGeneration>
  | ReturnType<typeof endGeneration>
  | ReturnType<typeof changeResultFormat>;

export interface PairwiseModel {
  name: string;

  values: string[];
}

type ColFocus = {
  type: "col";
  row: number;
  col: number;
};

type RowFocus = {
  type: "row";
  row: number;
};

export type Focus = ColFocus | RowFocus | null;

export interface PairwiseStore {
  models: PairwiseModel[];

  focus: Focus;

  filteredModels: PairwiseModel[];

  result: number[][];

  format: ResultFormat;

  isGenerating: boolean;
}

const defaultModel: PairwiseModel = { name: "", values: [""] };

export const initPairwiseStore = (): PairwiseStore => ({
  models: [defaultModel],
  focus: null,
  filteredModels: [],
  result: [],
  format: ResultFormat.Table,
  isGenerating: false
});

export function pairwiseReducer(
  state: PairwiseStore = initPairwiseStore(),
  action: PairwiseAction
): PairwiseStore {
  switch (action.type) {
    case PairwiseActionType.ROW_WAS_ADDED:
      return {
        ...state,
        models: [...state.models, defaultModel],
        focus: { type: "row", row: state.models.length }
      };
    case PairwiseActionType.ROW_WAS_DELETED:
      const { rowIndex } = action.payload;
      return {
        ...state,
        models: state.models.filter((_, i) => i !== rowIndex),
        focus: {
          type: "col",
          row: rowIndex - 1,
          col: state.models[rowIndex - 1].values.length - 1
        }
      };
    case PairwiseActionType.COL_WAS_ADDED: {
      const { rowIndex } = action.payload;
      return {
        ...state,
        models: state.models.map((m, i) =>
          i === rowIndex ? { ...m, values: [...m.values, ""] } : m
        ),
        focus: {
          type: "col",
          row: rowIndex,
          col: state.models[rowIndex].values.length
        }
      };
    }
    case PairwiseActionType.COL_WAS_UPDATED:
      return {
        ...state,
        models: updateRow(state.models, action.payload.rowIndex, r => ({
          ...r,
          values: r.values.map((v, i) =>
            i === action.payload.colIndex ? action.payload.value : v
          )
        }))
      };
    case PairwiseActionType.COL_WAS_DELETED: {
      const { rowIndex, colIndex } = action.payload;
      return {
        ...state,
        models: updateRow(state.models, rowIndex, r => ({
          ...r,
          values: r.values.filter((v, i) => i !== colIndex)
        })),
        focus: { type: "col", row: rowIndex, col: colIndex - 1 }
      };
    }
    case PairwiseActionType.NAME_WAS_UPDATED:
      return {
        ...state,
        models: updateRow(state.models, action.payload.rowIndex, r => ({
          ...r,
          name: action.payload.name
        }))
      };
    case PairwiseActionType.GENERATION_IS_STARTED:
      return {
        ...state,
        isGenerating: true
      };
    case PairwiseActionType.GENERATION_IS_ENDED:
      return {
        ...state,
        isGenerating: false,
        filteredModels: action.payload.filteredModels,
        result: action.payload.result
      };
    case PairwiseActionType.RESULT_FORMAT_WAS_CHANGED:
      return {
        ...state,
        format: action.payload.format
      };
    default:
      return state;
  }
}

function updateRow(
  rows: PairwiseModel[],
  rowIndex: number,
  fn: (row: PairwiseModel) => PairwiseModel
): PairwiseModel[] {
  return [
    ...rows.slice(0, Math.max(0, rowIndex)),
    fn(rows[rowIndex]),
    ...rows.slice(Math.min(rowIndex + 1, rows.length))
  ];
}

export const addRow = () => ({
  type: PairwiseActionType.ROW_WAS_ADDED as const
});

export const deleteRow = (rowIndex: number) => ({
  type: PairwiseActionType.ROW_WAS_DELETED as const,
  payload: {
    rowIndex
  }
});

export const addCol = (rowIndex: number) => ({
  type: PairwiseActionType.COL_WAS_ADDED as const,
  payload: {
    rowIndex
  }
});

export const updateCol = (
  rowIndex: number,
  colIndex: number,
  value: string
) => ({
  type: PairwiseActionType.COL_WAS_UPDATED as const,
  payload: {
    rowIndex,
    colIndex,
    value
  }
});

export const deleteCol = (rowIndex: number, colIndex: number) => ({
  type: PairwiseActionType.COL_WAS_DELETED as const,
  payload: {
    rowIndex,
    colIndex
  }
});

export const updateRowName = (rowIndex: number, name: string) => ({
  type: PairwiseActionType.NAME_WAS_UPDATED as const,
  payload: {
    rowIndex,
    name
  }
});

export const genereateTestCase = (): ThunkAction<
  void,
  AppStore,
  {},
  PairwiseAction
> => (dispatch, getStore) => {
  dispatch(startGeneration());
  const models = getStore().pairwise.models;
  const filteredModels = filterModels(models);
  const slots = createSlots(filteredModels, 2);
  const result = new PairWise(models.length, slots).generate();
  dispatch(endGeneration(filteredModels, result));
};

export const startGeneration = () => ({
  type: PairwiseActionType.GENERATION_IS_STARTED as const
});

export const endGeneration = (
  filteredModels: PairwiseModel[],
  result: number[][]
) => ({
  type: PairwiseActionType.GENERATION_IS_ENDED as const,
  payload: {
    filteredModels,
    result
  }
});

export const changeResultFormat = (format: ResultFormat) => ({
  type: PairwiseActionType.RESULT_FORMAT_WAS_CHANGED as const,
  payload: {
    format
  }
});
