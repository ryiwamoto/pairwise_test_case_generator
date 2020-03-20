import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppStore } from "../main";
import { updateCol, deleteCol, Focus } from "../modules/pairwise";

export interface ColFormProps {
  rowIndex: number;
  colIndex: number;
  isDeletable: boolean;
}

export function ColForm(props: ColFormProps) {
  const dispatch = useDispatch();
  const value = useSelector(
    (store: AppStore) =>
      store.pairwise.models[props.rowIndex].values[props.colIndex]
  );
  const focus = useSelector((store: AppStore) =>  store.pairwise.focus);
  const onChange = useCallback(
    (row: number, col: number, value: string) =>
      dispatch(updateCol(row, col, value)),
    []
  );
  const onDelete = useCallback(
    (row: number, col: number) => dispatch(deleteCol(row, col)),
    []
  );
  return (
    <ColFormPresenter
      value={value}
      focus={focus}
      rowIndex={props.rowIndex}
      colIndex={props.colIndex}
      isDeletable={props.isDeletable}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
}

export interface ColFormPresenterProps {
  rowIndex: number;
  colIndex: number;
  value: string;
  focus: Focus;
  isDeletable: boolean;
  onChange: (rowIndex: number, colIndex: number, value: string) => void;

  onDelete: (rowIndex: number, colIndex: number) => void;
}

export function ColFormPresenter(props: ColFormPresenterProps) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(props.rowIndex, props.colIndex, e.currentTarget.value);
    },
    [props.onChange, props.rowIndex, props.colIndex]
  );
  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onDelete(props.rowIndex, props.colIndex);
    },
    [props.onDelete, props.rowIndex, props.colIndex]
  );
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (
      props.focus?.type == "col" &&
      props.focus.row === props.rowIndex &&
      props.focus.col === props.colIndex
    ) {
      ref.current?.focus();
    }
  }, [props.focus]);
  return (
    <div className="block parameter-value tag">
      <input
        ref={ref}
        type="text"
        className="input parameter-value-input"
        value={props.value}
        onChange={onChange}
        placeholder={`value ${props.colIndex + 1}`}
      />
      <button
        className="delete is-small"
        onClick={onDelete}
        disabled={!props.isDeletable}
      />
    </div>
  );
}
