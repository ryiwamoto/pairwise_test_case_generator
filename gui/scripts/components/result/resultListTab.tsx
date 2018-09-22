import * as React from "react";
import { ResultFormat } from "../../modules/resultFormat";
import classnames from "classnames";

export interface ResultListTabProps {
  currentFormat: ResultFormat;
  format: ResultFormat;
  onClick: (format: ResultFormat) => void;
}

export class ResultListTab extends React.PureComponent<ResultListTabProps> {
  public render() {
    return (
      <li
        className={classnames({
          "is-active": this.props.currentFormat === this.props.format
        })}
        onClick={this.onClick}
      >
        <a>{toTabname(this.props.format)}</a>
      </li>
    );
  }

  private onClick = () => {
    this.props.onClick(this.props.format);
  };
}

function toTabname(format: ResultFormat) {
  switch (format) {
    case ResultFormat.Table:
      return "Table";
    case ResultFormat.JSON:
      return "JSON";
    default:
      return "Other";
  }
}
