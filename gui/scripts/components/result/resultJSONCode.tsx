import * as React from "react";
import { PairwiseModel } from "../../modules/pairwise";
import { HighlightedCode } from "./hilightedCode";

export interface ResultJSONCodeProps {
  result: number[][];

  models: PairwiseModel[];
}

export function ResultJSONCode(props: ResultJSONCodeProps) {
  return (
    <HighlightedCode
      language="javascript"
      code={toJSONCode(props.models, props.result)}
    />
  );
}

export function toJSONCode(
  models: PairwiseModel[],
  result: number[][]
): string {
  const arrays = result.map(line => line.map((v, i) => models[i].values[v]));
  return (
    "[\n" +
    arrays
      .map(line => `  [${line.map(v => valueToCode(v)).join(", ")}]`)
      .join(",\n") +
    "\n]\n"
  );
}

function valueToCode(value: string): string {
  const n = parseFloat(value);
  return isNaN(n) ? `"${value}"` : value;
}
