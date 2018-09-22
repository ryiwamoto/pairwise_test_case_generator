import { connect } from "react-redux";
import { ColForm } from "../components/colForm";
import { AppStore } from "../main";
import { updateCol, deleteCol } from "../modules/pairwise";

interface OwnProps {
  rowIndex: number;
  colIndex: number;
}

const stateToProps = (store: AppStore, ownProps: OwnProps) => ({
  value: store.pairwise.models[ownProps.rowIndex].values[ownProps.colIndex]
});

const dispatchToProps = {
  onChange: updateCol,
  onDelete: deleteCol
};

export const ColFormContainer = connect(
  stateToProps,
  dispatchToProps
)(ColForm);
