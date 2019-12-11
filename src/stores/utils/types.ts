export enum ConwayElementType {
  //static
  BLOCK,
  //fligher
  GLIDER,
  LIGHTER
}

export const mapConwayElementTypeToArray = (type:ConwayElementType) => {
  switch (type) {
    case ConwayElementType.BLOCK:
      return [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0],
      ];
    case ConwayElementType.GLIDER:
      return [
        [1,0,1],
        [0,1,1],
        [0,1,0],
      ];
    case ConwayElementType.LIGHTER:
      return [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ];
    default: return [0];
  }
}