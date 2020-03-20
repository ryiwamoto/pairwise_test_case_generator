import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../main";
import { deleteRow, addCol, updateRowName, Focus } from "../modules/pairwise";
import { ColForm } from "./colForm";

export interface RowFormProps {
  rowIndex: number;
  isDeletable: boolean;
}

export function RowForm(props: RowFormProps) {
  const dispatch = useDispatch();
  const name = useSelector(
    (store: AppStore) => store.pairwise.models[props.rowIndex].name
  );
  const values = useSelector(
    (store: AppStore) => store.pairwise.models[props.rowIndex].values
  );
  const focus = useSelector((store: AppStore) => store.pairwise.focus);
  const onAddCol = useCallback((row: number) => dispatch(addCol(row)), []);
  const onDeleteRow = useCallback(
    (row: number) => dispatch(deleteRow(row)),
    []
  );
  const onNameUpdate = useCallback(
    (row: number, name: string) => dispatch(updateRowName(row, name)),
    []
  );
  return (
    <RowFormPresenter
      rowIndex={props.rowIndex}
      focus={focus}
      isDeletable={props.isDeletable}
      name={name}
      values={values}
      onAddCol={onAddCol}
      onDeleteRow={onDeleteRow}
      onNameUpdate={onNameUpdate}
    />
  );
}

interface RowFormPresenterProps {
  rowIndex: number;
  name: string;
  focus: Focus;
  values: string[];
  isDeletable: boolean;
  onNameUpdate: (rowIndex: number, name: string) => void;
  onAddCol: (rowIndex: number) => void;
  onDeleteRow: (rowIndex: number) => void;
}

function RowFormPresenter(props: RowFormPresenterProps) {
  const onNameUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      props.onNameUpdate(props.rowIndex, e.currentTarget.value),
    [props.rowIndex]
  );
  const onAddCol = useCallback(() => props.onAddCol(props.rowIndex), [
    props.rowIndex,
    props.onAddCol
  ]);
  const onDeleteRow = useCallback(() => props.onDeleteRow(props.rowIndex), [
    props.rowIndex,
    props.onDeleteRow
  ]);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.focus?.type === "row" && props.focus.row === props.rowIndex) {
      ref.current?.focus();
    }
  }, [props.focus]);

  return (
    <div className="field parameter-form-group">
      <div className="field-body parameter-form-group__row">
        <button
          className="delete is-large"
          onClick={onDeleteRow}
          disabled={!props.isDeletable}
        />
        <input
          ref={ref}
          className={"input parameter-form-group__name-input"}
          type="text"
          value={props.name}
          placeholder={"Parameter name"}
          onChange={onNameUpdate}
        />
        {props.values.map((v, i) => (
          <ColForm
            key={`${props.rowIndex}-${i}`}
            rowIndex={props.rowIndex}
            colIndex={i}
            isDeletable={props.values.length > 1}
          />
        ))}

        <button
          className="button plus-button col-plus-button"
          tabIndex={0}
          type="button"
          onClick={onAddCol}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
  );
}
