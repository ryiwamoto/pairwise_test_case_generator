import { connect } from "react-redux";
import { ModelForm } from "../components/modelForm";
import { AppStore } from "../main";
import {
  deleteRow,
  addRow,
  addCol,
  genereateTestCase
} from "../modules/pairwise";

const stateToProps = (store: AppStore) => ({
  parameters: store.pairwise.models
});

const dispatchToProps = {
  onAddCol: addCol,
  onAddRow: addRow,
  onDeleteRow: deleteRow,
  onSubmit: genereateTestCase
};

export const ModelFormContainer = connect(
  stateToProps,
  dispatchToProps
)(ModelForm);
