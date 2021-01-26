export class Square {
  private color = 'blue';
  private x = 0;
  private y = 0;
  private width = 0;
  private heigth = 0;

  constructor(private ctx: CanvasRenderingContext2D) {}

  public setPosition(x, y){
    this.x = x;
    this.y = y;
  }
  public setDim(w , h){
    this.width = w;
    this.heigth = h;
  }
  public draw(x = this.x, y = this.y, w = this.width, h = this.heigth) {
    this.ctx.moveTo( x, y); // This was the line you were looking for
    this.ctx.lineWidth = 2;
    this.ctx.globalAlpha = 0.6;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x,y,w,h)
    /*
    this.ctx.lineTo( x + w, y);
    this.ctx.lineTo( x + w, y + h);
    this.ctx.lineTo( x    , y + h);
    this.ctx.lineTo( x , y);*/

  }


}
