import * as React from "react";

import {FC, Props} from "react";

import "./index.css";

type CellProps =  {
  color?: string;
}

const data: ReadonlyArray<ReadonlyArray<number>> = [
  [1,0,1,0,0],
  [0,1,0,1,0],
  [0,1,0,1,1],
  [0,0,0,1,1],
  [1,1,0,1,1],
]

export const Cell: FC<CellProps> = (props: CellProps) => (
  <div className="col">
    {
      data.map((row: ReadonlyArray<number>, indexRow)=> (
        <div key={indexRow} className="row">
          { row.map((value: number, indexCol) => (<div key={indexCol+indexRow*3} className="cell">{value}</div>)) }
          <br/>
        </div>
      ))
    }
  </div>
);

Cell.defaultProps = {
  color: "000000"
} as Pick<CellProps, 'color'>