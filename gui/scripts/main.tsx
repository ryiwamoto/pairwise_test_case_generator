import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { initPairwiseStore, pairwiseReducer } from "./modules/pairwise";
import { App } from "./components/app";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as persist from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const initStore = {
  pairwise: initPairwiseStore()
};

const persistedReducer = persist.persistReducer(
  {
    key: "root",
    storage
  },
  combineReducers({
    pairwise: pairwiseReducer
  })
);

const store = createStore(persistedReducer, initStore, applyMiddleware(thunk));
const persistor = persist.persistStore(store);

export type AppStore = typeof initStore;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
