import * as React from "react";
import { render } from "react-dom";
import "reflect-metadata";


import {Cell} from "./components/cell/cell.component";

import "./styles.css";
import {Component} from "react";
import {Provider} from "inversify-react";
import {Container} from "inversify";
import {ConwayGameStore} from "./stores/conway-game.store";


class App extends Component{
  private container: Container = new Container();

  componentWillMount(): void {
    this.container.bind(ConwayGameStore).toSelf().inSingletonScope();
  }

  render() {
    return (
      <Provider container={this.container}>
        <div className="App">
          <div className="Title">
            <h1>Conway's Game of Life</h1>
            <Cell/>
          </div>
        </div>
      </Provider>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
