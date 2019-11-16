import * as React from "react";

import {Component, FC} from "react";

import {conwayGameStore} from "../../stores/conway-game.store";

import "./index.css";
import {observer} from "mobx-react";
import {observable} from "mobx";

type CellProps =  {
  color?: string;
}

@observer
export class Cell extends Component<CellProps> {
  @observable
  variable: string = "";

  componentDidMount() {
    conwayGameStore.stream$.subscribe((value: string) => {
      console.log(value);
    });

    this.variable = rxToMobx(conwayGameStore.stream$);
  }

  render() {
    return (
      <div className="col" onClick={conwayGameStore.update}>
        <div>{this.variable}</div>
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
