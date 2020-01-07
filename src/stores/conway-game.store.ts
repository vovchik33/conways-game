import {action, observable} from "mobx";
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {injectable} from "inversify";
import {
  ConwayElementType,
  nextStep,
  putFigure
} from "cellural-automats/dist/cellural-automats/conways-game-life";

import {
  createField,
  FieldType
} from "cellural-automats/dist/cellural-automats/common/utils";

@injectable()
export class ConwayGameStore {
  stream$: Observable<string>;

  constructor() {
    this.stream$ = from("SomeTEXT")
      .pipe(
        map(  (w: string) => (w + ' world!'))
      );
    this.setFieldSize(100, 60);
    this.put(5,5,ConwayElementType.LIGHTER);
    this.put(15,5,ConwayElementType.LIGHTER);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.GLIDER);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.GLIDER);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.BLOCK);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.GLIDER);
    this.put(Math.random()*40+5,Math.random()*40+5,ConwayElementType.GLIDER);
  }

  get fieldWidth(): number{
    return (this.field && this.field.length>0)? this.field[0].length: 0;
  }

  get fieldHeight(): number {
    return (this.field)? this.field.length: 0;
  }

  @observable
  public field: FieldType<number>;

  setFieldSize = (width:number, height:number): boolean => {
    this.field = createField(width, height, 0);
    return true;
  }

  @action
  zoomIn = () => {
    this.setFieldSize(this.fieldWidth + 10, this.fieldHeight + 6);
  }

  @action
  zoomOut = () => {
    this.setFieldSize(this.fieldWidth - 10, this.fieldHeight - 6);
  }

  nextStep = () => {
    this.update();
  }

  @action
  update = () => {
    this.field = nextStep(this.field);
  }

  @action
  clear = () => {
    this.field = createField(this.fieldWidth, this.fieldHeight, 0);
  }

  @action
  put = (x:number, y:number, type:ConwayElementType) => {
    putFigure(this.field, x, y, type);
  }
}
