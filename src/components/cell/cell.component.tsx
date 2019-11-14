import * as React from "react";

import {FC, Props} from "react";

type CellProps =  {
  color?: string;
}
export const Cell: FC<CellProps> = (props: CellProps) => (
  <div className="cell">`${props.color}`</div>
)

Cell.defaultProps = {
  color: "000000"
} as Pick<CellProps, 'color'>