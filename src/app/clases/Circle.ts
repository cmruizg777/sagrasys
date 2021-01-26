export class Circle {

  private x = 0;
  private y = 0;
  private radius = 0;

  constructor(private ctx: CanvasRenderingContext2D) {}

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }
  public setPosition(x, y){
    this.x = x;
    this.y = y;
  }
  public setRadius(r){
    this.radius;
  }
  public draw(x = this.x, y = this.y, radius = this.radius) {
    this.ctx.moveTo( x + radius, y ); // This was the line you were looking for
    this.ctx.arc( x, y, radius, 0, Math.PI*2 );
  }
}

