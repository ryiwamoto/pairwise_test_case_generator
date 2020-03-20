import * as React from "react";
import { ModelForm } from "./modelForm";
import { ResultList } from "./result/resultList";

export function App() {
  return (
    <div className="container">
      <section key="section-1">
        <ModelForm />
      </section>
      <section key="section-2">
        <ResultList />
      </section>
    </div>
  );
}
