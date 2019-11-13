import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <div className="Title">
        <h1>Conway's Game of Life</h1>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);