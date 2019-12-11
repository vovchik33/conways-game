import {action, computed, observable} from "mobx";
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {injectable} from "inversify";
import {ConwayElementType, mapConwayElementTypeToArray} from "./utils/types";

@injectable()
export class ConwayGameStore {
  stream$: Observable<string>;

  @observable
  private _fieldWidth: number = 100;
  @observable
  private _fieldHeight: number = 60;

  constructor() {
    this.stream$ = from("SomeTEXT")
      .pipe(
        map(  (w: string) => (w + ' world!'))
      );
    this.clear();
    this.put(5,5,ConwayElementType.LIGHTER);
    this.put(15,5,ConwayElementType.LIGHTER);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.GLIDER);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.GLIDER);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.BLOCK);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.GLIDER);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.GLIDER);
  }

  @computed
  get fieldWidth(): number{
    return this._fieldWidth;
  }

  @computed
  get fieldHeight(): number {
    return this._fieldHeight;
  }

  @observable
  public field: Array<Array<number>>;

  setFieldSize = (width:number, height:number): boolean => {
    if (width<0 || height<0) return false;
    this.update(width, height);
  }

  @action
  zoomIn = () => {
    this.setFieldSize(this._fieldWidth + 10, this._fieldHeight + 6);
  }

  @action
  zoomOut = () => {
    this.setFieldSize(this._fieldWidth - 10, this._fieldHeight - 6);
  }

  nextStep = () => {
    this.update();
  }

  @action
  update = (width?:number, height?:number) => {
    const justResize = !!width && !!height;
    let newField: Array<Array<number>> = new Array<Array<number>>();

    if (justResize) {
      this._fieldWidth = width;
      this._fieldHeight = height;
    }
    for (let y = 0; y <= this._fieldHeight; y++) {
      let row:number[]  = new Array<number>();
      for (let x = 0; x <=this._fieldWidth; x++){
        row.push(
          (x === 0 || x === this._fieldWidth || y === 0 || y === this._fieldHeight)
            ? 0
            : this.checkState(y,x, !justResize));
      }
      newField.push(row);
    }
    this.field = newField;
  }

  @action
  clear = () => {
    this.field = new Array<Array<number>>();
    for (let y = 0; y <= this._fieldHeight; y++) {
      let row:number[]  = new Array<number>();
      for (let x = 0; x <= this._fieldWidth; x++){
        row.push(0);
      }
      this.field.push(row);
    }
  }

  @action
  put = (x:number, y:number, type:ConwayElementType) => {
    let figure = mapConwayElementTypeToArray(type);
    figure.forEach((row, indexY) => {
      row.forEach((value, indexX) => {
        this.field[y+indexY][x+indexX] = figure[indexY][indexX];
      })
    })
  }

  checkState  = (y: number,x: number, nextStep:boolean = false) => {
    if (nextStep) {
      let count = 0;
      (this.field[y-1][x-1] === 1 && count++);
      (this.field[y-1][x+0] === 1 && count++);
      (this.field[y-1][x+1] === 1 && count++);
      (this.field[y-0][x-1] === 1 && count++);
      // (this.field[y+0][x+0] === 1 && count++);
      (this.field[y-0][x+1] === 1 && count++);
      (this.field[y+1][x-1] === 1 && count++);
      (this.field[y+1][x+0] === 1 && count++);
      (this.field[y+1][x+1] === 1 && count++);
      return (count===3 && this.field[y+0][x+0] === 0)
        ?1
        :((count===2 ||count===3) && this.field[y+0][x+0]===1
            ?1
            :0
        );
    }
    return (y<this.field.length&&x<this.field[y].length)
      ?this.field[y][x]
      :0;
  }
}
