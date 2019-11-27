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
    return (
      <div className="col" onClick={this._conwayGameStore.update}>
        <div>{this.variable}</div>
        {
          this._conwayGameStore.field.map((row: ReadonlyArray<number>, indexRow) => (
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
