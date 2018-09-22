import * as React from "react";
import { PairwiseModel } from "../../modules/pairwise";
import { ResultTable } from "./resultTable";
import { ResultFormat } from "../../modules/resultFormat";
import { ResultJSONCode } from "./resultJSONCode";
import { ResultListTab } from "./resultListTab";

export interface ResultListProps {
  format: ResultFormat;
  models: PairwiseModel[];
  result: number[][];

  onChange: (format: ResultFormat) => void;
}

interface ResultProps {
  models: PairwiseModel[];

  result: number[][];
}

const allFormats = [ResultFormat.Table, ResultFormat.JSON];

export function ResultList(props: ResultListProps) {
  const Result = getSuitableResultComponent(props.format);
  return props.result.length === 0 ? null : (
    <>
      <h2 className="subtitle">Test cases</h2>
      <div className="tabs">
        <ul>
          {allFormats.map(f => (
            <ResultListTab
              key={f}
              currentFormat={props.format}
              format={f}
              onClick={props.onChange}
            />
          ))}
        </ul>
      </div>
      <Result result={props.result} models={props.models} />
    </>
  );
}

function getSuitableResultComponent(
  format: ResultFormat
): React.ComponentType<ResultProps> {
  switch (format) {
    case ResultFormat.Table:
      return ResultTable;
    case ResultFormat.JSON:
      return ResultJSONCode;
    default:
      return ResultTable;
  }
}
