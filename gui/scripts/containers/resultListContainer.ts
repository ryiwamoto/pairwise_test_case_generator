import { connect } from "react-redux";
import { AppStore } from "../main";
import { ResultList } from "../components/result/resultList";
import { changeResultFormat } from "../modules/pairwise";

const stateToProps = (store: AppStore) => ({
  models: store.pairwise.filteredModels,
  format: store.pairwise.format,
  result: store.pairwise.result
});

const dispatchToProps = {
  onChange: changeResultFormat
};

export const ResultListContainer = connect(
  stateToProps,
  dispatchToProps
)(ResultList);
