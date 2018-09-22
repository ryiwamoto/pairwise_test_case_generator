import { ThunkAction } from "redux-thunk";
import { AppStore } from "../main";
import { createSlots, PairWise } from "../../../core";
import { filterModels } from "./filterModels";
import { ResultFormat } from "./resultFormat";

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

interface RowWasAddedAction {
  type: PairwiseActionType.ROW_WAS_ADDED;
}

interface RowWasDeletedAction {
  type: PairwiseActionType.ROW_WAS_DELETED;

  payload: {
    rowIndex: number;
  };
}

interface ColWasAddedAction {
  type: PairwiseActionType.COL_WAS_ADDED;

  payload: {
    rowIndex: number;
  };
}

interface ColWasUpdatedAction {
  type: PairwiseActionType.COL_WAS_UPDATED;
  payload: {
    rowIndex: number;
    colIndex: number;
    value: string;
  };
}

interface ColWasDeletedAction {
  type: PairwiseActionType.COL_WAS_DELETED;
  payload: {
    rowIndex: number;
    colIndex: number;
  };
}

interface NameWasUpdatedAction {
  type: PairwiseActionType.NAME_WAS_UPDATED;
  payload: {
    rowIndex: number;
    name: string;
  };
}

interface GenerationWasStartedAction {
  type: PairwiseActionType.GENERATION_IS_STARTED;
}

interface GenerationWasEndedAction {
  type: PairwiseActionType.GENERATION_IS_ENDED;

  payload: {
    filteredModels: PairwiseModel[];
    result: number[][];
  };
}

interface ResultFormatWasChangedAction {
  type: PairwiseActionType.RESULT_FORMAT_WAS_CHANGED;

  payload: {
    format: ResultFormat;
  };
}

type PairwiseAction =
  | RowWasAddedAction
  | RowWasDeletedAction
  | ColWasAddedAction
  | ColWasUpdatedAction
  | ColWasDeletedAction
  | NameWasUpdatedAction
  | GenerationWasStartedAction
  | GenerationWasEndedAction
  | ResultFormatWasChangedAction;

export interface PairwiseModel {
  name: string;

  values: string[];
}

export interface PairwiseStore {
  models: PairwiseModel[];

  filteredModels: PairwiseModel[];

  result: number[][];

  format: ResultFormat;

  isGenerating: boolean;
}

const defaultModel: PairwiseModel = { name: "", values: [""] };

export const initPairwiseStore = (): PairwiseStore => ({
  models: [defaultModel],
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
        models: [...state.models, defaultModel]
      };
    case PairwiseActionType.ROW_WAS_DELETED:
      return {
        ...state,
        models: state.models.filter((_, i) => i !== action.payload.rowIndex)
      };
    case PairwiseActionType.COL_WAS_ADDED:
      return {
        ...state,
        models: state.models.map(
          (m, i) =>
            i === action.payload.rowIndex
              ? { ...m, values: [...m.values, ""] }
              : m
        )
      };
    case PairwiseActionType.COL_WAS_UPDATED:
      return {
        ...state,
        models: updateRow(state.models, action.payload.rowIndex, r => ({
          ...r,
          values: r.values.map(
            (v, i) => (i === action.payload.colIndex ? action.payload.value : v)
          )
        }))
      };
    case PairwiseActionType.COL_WAS_DELETED:
      return {
        ...state,
        models: updateRow(state.models, action.payload.rowIndex, r => ({
          ...r,
          values: r.values.filter((v, i) => i !== action.payload.colIndex)
        }))
      };
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

export const addRow = (): RowWasAddedAction => ({
  type: PairwiseActionType.ROW_WAS_ADDED
});

export const deleteRow = (rowIndex: number): RowWasDeletedAction => ({
  type: PairwiseActionType.ROW_WAS_DELETED,
  payload: {
    rowIndex
  }
});

export const addCol = (rowIndex: number): ColWasAddedAction => ({
  type: PairwiseActionType.COL_WAS_ADDED,
  payload: {
    rowIndex
  }
});

export const updateCol = (
  rowIndex: number,
  colIndex: number,
  value: string
): ColWasUpdatedAction => ({
  type: PairwiseActionType.COL_WAS_UPDATED,
  payload: {
    rowIndex,
    colIndex,
    value
  }
});

export const deleteCol = (
  rowIndex: number,
  colIndex: number
): ColWasDeletedAction => ({
  type: PairwiseActionType.COL_WAS_DELETED,
  payload: {
    rowIndex,
    colIndex
  }
});

export const updateRowName = (
  rowIndex: number,
  name: string
): NameWasUpdatedAction => ({
  type: PairwiseActionType.NAME_WAS_UPDATED,
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

export const startGeneration = (): GenerationWasStartedAction => ({
  type: PairwiseActionType.GENERATION_IS_STARTED
});

export const endGeneration = (
  filteredModels: PairwiseModel[],
  result: number[][]
): GenerationWasEndedAction => ({
  type: PairwiseActionType.GENERATION_IS_ENDED,
  payload: {
    filteredModels,
    result
  }
});

export const changeResultFormat = (
  format: ResultFormat
): ResultFormatWasChangedAction => ({
  type: PairwiseActionType.RESULT_FORMAT_WAS_CHANGED,
  payload: {
    format
  }
});
