import * as React from "react";
import { PairwiseModel, changeResultFormat } from "../../modules/pairwise";
import { ResultTable } from "./resultTable";
import { ResultFormat } from "../../modules/resultFormat";
import { ResultJSONCode } from "./resultJSONCode";
import { ResultListTab } from "./resultListTab";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../main";

interface ResultListProps {}

export function ResultList(props: ResultListProps) {
  const dispatch = useDispatch();
  const onChange = useCallback(
    (format: ResultFormat) => dispatch(changeResultFormat(format)),
    []
  );
  const states = useSelector((store: AppStore) => ({
    format: store.pairwise.format,
    models: store.pairwise.filteredModels,
    result: store.pairwise.result
  }));
  return <ResultListPresenter {...states} onChange={onChange} />;
}

interface ResultListPresenterProps {
  format: ResultFormat;
  models: PairwiseModel[];
  result: number[][];

  onChange: (format: ResultFormat) => void;
}

const allFormats = [ResultFormat.Table, ResultFormat.JSON];

export function ResultListPresenter(props: ResultListPresenterProps) {
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

interface ResultProps {
  models: PairwiseModel[];

  result: number[][];
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
