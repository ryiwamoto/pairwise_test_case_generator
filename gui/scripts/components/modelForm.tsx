import * as React from "react";
import { RowFormContainer } from "../containers/rowFormContainer";

export interface Parameter {
  name: string;
  values: string[];
}

export interface ModelFormProps {
  parameters: Parameter[];

  onAddRow: () => void;

  onSubmit: () => void;
}

export class ModelForm extends React.PureComponent<ModelFormProps> {
  public render() {
    return (
      <>
        <h2 className="subtitle">Input test models</h2>
        <form onSubmit={this.onSubmit}>
          {this.props.parameters.map((p, i) => (
            <RowFormContainer
              rowIndex={i}
              key={i}
              isDeletable={this.props.parameters.length > 1}
            />
          ))}
          <div className="field parameter-form-group">
            <a className="plus-button row-plus-button" onClick={this.onAddRow}>
              <i className="fas fa-plus" />
            </a>
          </div>
          <a
            className="button is-primary generate-button"
            onClick={this.onSubmitButton}
          >
            Generate
          </a>
        </form>
      </>
    );
  }

  private onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  private onSubmitButton = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  private onAddRow = () => this.props.onAddRow();
}
