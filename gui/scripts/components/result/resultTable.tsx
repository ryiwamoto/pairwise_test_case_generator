import * as React from "react";
import { PairwiseModel } from "../../modules/pairwise";

export interface ResultTableProps {
  result: number[][];

  models: PairwiseModel[];
}

export function ResultTable(props: ResultTableProps) {
  return (
    <table className="table result-table">
      <thead>
        <tr>
          <th>#</th>
          {props.models.map(_ => _.name).map((name, i) => (
            <th key={`name-${i}`}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.result.map((r, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            <th key={"#-${rowIndex}"}>#{rowIndex}</th>
            {r.map((value, colIndex) => (
              <td key={`col-${rowIndex}-${colIndex}`}>
                {props.models[colIndex].values[value]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
