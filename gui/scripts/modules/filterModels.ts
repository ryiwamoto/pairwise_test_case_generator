import { PairwiseModel } from "./pairwise";

/**
 * Remove invalid model, values
 * @param models
 */
export function filterModels(models: PairwiseModel[]): PairwiseModel[] {
  return models.filter(_ => _.name !== "").map(m => ({
    ...m,
    values: m.values.filter(_ => _ !== "")
  }));
}
