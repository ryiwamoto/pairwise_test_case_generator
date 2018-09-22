import * as React from "react";
import { ColFormContainer } from "../containers/colFormContainer";

export interface RowFormProps {
  rowIndex: number;
  name: string;

  values: string[];
  isDeletable: boolean;
  onNameUpdate: (rowIndex: number, name: string) => void;
  onAddCol: (rowIndex: number) => void;
  onDeleteRow: (rowIndex: number) => void;
}

export class RowForm extends React.PureComponent<RowFormProps> {
  public render() {
    return (
      <div className="field parameter-form-group">
        <div className="field-body parameter-form-group__row">
          <button
            className="delete is-large"
            onClick={this.onDeleteRow}
            disabled={!this.props.isDeletable}
          />
          <input
            className={"input parameter-form-group__name-input"}
            type="text"
            value={this.props.name}
            placeholder={"Parameter name"}
            onChange={this.onNameUpdate}
          />
          {this.props.values.map((v, i) => (
            <ColFormContainer
              key={`${this.props.rowIndex}-${i}`}
              rowIndex={this.props.rowIndex}
              colIndex={i}
              isDeletable={this.props.values.length > 1}
            />
          ))}

          <button
            className="button plus-button col-plus-button"
            type="button"
            onClick={this.onAddCol}
          >
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
    );
  }
  private onNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onNameUpdate(this.props.rowIndex, e.currentTarget.value);
  private onAddCol = () => this.props.onAddCol(this.props.rowIndex);
  private onDeleteRow = () => this.props.onDeleteRow(this.props.rowIndex);
}
