import {action, computed, observable} from "mobx";
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {injectable} from "inversify";
import {
  ConwayElementType,
  createField,
  FieldType,
  mapConwayElementTypeToArray,
  nextStep,
  putFigure
} from "cellural-automats";

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
  public field: FieldType<number>;

  setFieldSize = (width:number, height:number): boolean => {
    if (width<0 || height<0) return false;
    this.update();
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
  update = () => {
    this.field = nextStep(this.field);
  }

  @action
  clear = () => {
    this.field = createField(this._fieldWidth, this._fieldHeight, 0);
  }

  @action
  put = (x:number, y:number, type:ConwayElementType) => {
    putFigure(this.field, x, y, type);
  }
}
