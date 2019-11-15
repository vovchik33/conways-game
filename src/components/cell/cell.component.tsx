import * as React from "react";

import {Component, FC} from "react";

import {conwayGameStore} from "../../stores/conway-game.store";

import "./index.css";
import {observer} from "mobx-react";

type CellProps =  {
  color?: string;
}

@observer
export class Cell extends Component<CellProps> {
  render() {
    return (
      <div className="col" onClick={conwayGameStore.update}>
        {
          conwayGameStore.field.map((row: ReadonlyArray<number>, indexRow) => (
            <div key={indexRow} className="row">
              {row.map((value: number, indexCol) => (
                <div key={indexCol + indexRow * 3} className="cell">{value?"◼":"◻"}</div>))}
              <br/>
            </div>
          ))
        }
      </div>
    );
  }
}
