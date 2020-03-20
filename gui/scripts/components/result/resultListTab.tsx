import * as React from "react";
import { ResultFormat } from "../../modules/resultFormat";
import classnames from "classnames";
import { useCallback } from "react";

export interface ResultListTabProps {
  currentFormat: ResultFormat;
  format: ResultFormat;
  onClick: (format: ResultFormat) => void;
}

export function ResultListTab(props: ResultListTabProps) {
  const onClick = useCallback(() => {
    props.onClick(props.format);
  }, []);
  return (
    <li
      className={classnames({
        "is-active": props.currentFormat === props.format
      })}
      onClick={onClick}
    >
      <a>{toTabname(props.format)}</a>
    </li>
  );
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
