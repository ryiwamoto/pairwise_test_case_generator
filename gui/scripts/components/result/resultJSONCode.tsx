import * as React from "react";
import { PairwiseModel, changeAutoCast } from "../../modules/pairwise";
import { HighlightedCode } from "./hilightedCode";
import { AppStore } from "../../main";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export interface ResultJSONCodeProps {
  result: number[][];

  models: PairwiseModel[];
}

export function ResultJSONCode(props: ResultJSONCodeProps) {
  const dispatch = useDispatch();
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAutoCast(e.currentTarget.checked));
  }, []);
  const isAutoCastEnabled = useSelector(
    (store: AppStore) => store.pairwise.autoCast
  );
  return (
    <>
      <HighlightedCode
        language="javascript"
        code={toJSONCode(props.models, props.result, isAutoCastEnabled)}
      />
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={isAutoCastEnabled}
              onChange={onChange}
            />
            Cast to primitive value
          </label>
        </div>
      </div>
    </>
  );
}

export function toJSONCode(
  models: PairwiseModel[],
  result: number[][],
  autoCast: boolean
): string {
  const keys = models.map(_ => _.name).join(", ");
  const arrays = result.map(line => line.map((v, i) => models[i].values[v]));
  return (
    "[\n" +
    `  // [${keys}]\n` +
    arrays
      .map(line => `  [${line.map(v => valueToCode(v, autoCast)).join(", ")}]`)
      .join(",\n") +
    "\n]\n"
  );
}

function valueToCode(value: string, autoCast: boolean): string {
  if (!autoCast) {
    return `"${value}"`;
  }
  switch (value) {
    case "true":
      return "true";
    case "false":
      return "false";
    default:
      const n = parseFloat(value);
      return isNaN(n) ? `"${value}"` : value;
  }
}
