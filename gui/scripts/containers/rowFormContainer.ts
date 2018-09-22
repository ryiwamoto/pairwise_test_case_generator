import { connect } from "react-redux";
import { AppStore } from "../main";
import { deleteRow, addRow, addCol, updateRowName } from "../modules/pairwise";
import { RowForm } from "../components/rowForm";

interface OwnProps {
  rowIndex: number;
}

const stateToProps = (store: AppStore, ownProps: OwnProps) => ({
  name: store.pairwise.models[ownProps.rowIndex].name,
  values: store.pairwise.models[ownProps.rowIndex].values
});

const dispatchToProps = {
  onAddCol: addCol,
  onAddRow: addRow,
  onDeleteRow: deleteRow,
  onNameUpdate: updateRowName
};

export const RowFormContainer = connect(
  stateToProps,
  dispatchToProps
)(RowForm);
