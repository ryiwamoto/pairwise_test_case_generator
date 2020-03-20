import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../main";
import { addRow, genereateTestCase, changeAutoCast } from "../modules/pairwise";
import { RowForm } from "./rowForm";

export interface Parameter {
  name: string;
  values: string[];
}

export interface ModelFormProps {}

export function ModelForm() {
  const dispatch = useDispatch();
  const parameters = useSelector((store: AppStore) => store.pairwise.models);
  const onAddRow = useCallback(() => dispatch(addRow()), []);
  const onSubmit = useCallback(() => dispatch(genereateTestCase()), []);
  return (
    <ModelFormPresenter
      parameters={parameters}
      onAddRow={onAddRow}
      onSubmit={onSubmit}
    />
  );
}

interface ModelFormPresenterProps {
  parameters: Parameter[];

  onAddRow: () => void;
  onSubmit: () => void;
}

function ModelFormPresenter(props: ModelFormPresenterProps) {
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  const onSubmitButton = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit();
  }, []);

  const onAddRow = useCallback(() => props.onAddRow(), []);
  return (
    <>
      <h2 className="subtitle">Input test models</h2>
      <form onSubmit={onSubmit}>
        {props.parameters.map((p, i) => (
          <RowForm
            rowIndex={i}
            key={i}
            isDeletable={props.parameters.length > 1}
          />
        ))}
        <div className="field parameter-form-group">
          <button className="plus-button row-plus-button" onClick={onAddRow}>
            <i className="fas fa-plus" />
          </button>
        </div>
        <button
          className="button is-primary generate-button"
          onClick={onSubmitButton}
        >
          Generate
        </button>
      </form>
    </>
  );
}
