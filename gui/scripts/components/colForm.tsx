import * as React from "react";

export interface ColFormProps {
  rowIndex: number;
  colIndex: number;
  value: string;
  isDeletable: boolean;
  onChange: (rowIndex: number, colIndex: number, value: string) => void;

  onDelete: (rowIndex: number, colIndex: number) => void;
}

export class ColForm extends React.PureComponent<ColFormProps> {
  public render() {
    return (
      <div className="block parameter-value tag">
        <input
          type="text"
          className="input parameter-value-input"
          value={this.props.value}
          onChange={this.onChange}
          placeholder={`value ${this.props.colIndex + 1}`}
        />
        <button
          className="delete is-small"
          onClick={this.onDelete}
          disabled={!this.props.isDeletable}
        />
      </div>
    );
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(
      this.props.rowIndex,
      this.props.colIndex,
      e.currentTarget.value
    );
  };

  private onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onDelete(this.props.rowIndex, this.props.colIndex);
  };
}
