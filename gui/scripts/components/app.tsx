import * as React from "react";
import { ModelFormContainer } from "../containers/modelFormContainer";
import { ResultListContainer } from "../containers/resultListContainer";

export function App() {
  return (
    <div className="container">
      <section key="section-1">
        <ModelFormContainer />
      </section>
      <section key="section-2">
        <ResultListContainer />
      </section>
    </div>
  );
}
