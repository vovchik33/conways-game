import * as React from "react";

import {Component, FC} from "react";

import {ConwayGameStore} from "../../stores/conway-game.store";

import "./index.css";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {resolve} from "inversify-react";

type CellProps =  {
  color?: string;
}

@observer
export class Cell extends Component<CellProps> {
  @observable
  variable: string = "";

  @resolve(ConwayGameStore)
  private readonly _conwayGameStore;

  componentDidMount() {
    this._conwayGameStore.stream$.subscribe((value: string) => {
      console.log(value);
    });
  }

  render() {
    const {nextStep, zoomIn, zoomOut, field, fieldWidth, fieldHeight} = this._conwayGameStore;
    return (
      <React.Fragment>
      <div className="controls-bar">
        <input type="button" value="NEXT STEP" onClick={() => {nextStep()}}/>
        <input type="button" value="ZOOM IN" onClick={() => {zoomIn()}}/>
        <div>{`${fieldWidth}x${fieldHeight}`}</div>
        <input type="button" value="ZOOM OUT" onClick={() => {zoomOut()}}/>
      </div>
      <div className="col">
        <div>{this.variable}</div>
        {
          field.map((row: ReadonlyArray<number>, indexRow) => (
            (
              row && <div key={indexRow} className="row">
              {row.map((value: number, indexCol) => (
                <div key={indexCol + indexRow * 3} className="cell">{value ? "◼" : "◻"}</div>))}
                  <br/>
              </div>
            )
          ))
        }
      </div>
      </React.Fragment>
    );
  }
}
