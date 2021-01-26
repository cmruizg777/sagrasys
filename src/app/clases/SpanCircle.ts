export class SpanCircle {

  public x = 0;
  public y = 0;
  public id;
  public color = 'green';

  constructor(id) {
    this.id = id;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
  public setPosition(x, y){
    this.x = x;
    this.y = y;
  }
  public getId(){
    return this.id;
  }
}

