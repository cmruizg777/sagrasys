import { Component, ElementRef, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { Circle } from '../clases/Circle';
import { SpanCircle } from '../clases/SpanCircle';
import { Square } from '../clases/Square';
import { EventMqttService } from '../services/event.mqtt.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  /*
  ctx : CanvasRenderingContext2D;
  width : number;
  circles: Circle[];*/
  circles: SpanCircle[];
  @ViewChild('frame', { static: true })
  frame: ElementRef<HTMLDivElement>;
  @ViewChild('zone', { static: true })
  zone: ElementRef<HTMLDivElement>;
  width: number;
  oldwidth : number;
  height: number = 100;
  factor = 1;

  vacasFuera = 0;
  vacasDentro = 0;

  private deviceId: string;
  subscription: Subscription;
  constructor(
    private readonly eventMqtt: EventMqttService,
  ) { }



  ngOnInit(): void {
    this.subscribeToTopic();
    this.width = this.frame.nativeElement.offsetWidth;
    this.oldwidth = this.width;

    this.height = this.width;
    let counter = 0;
    let temp : SpanCircle[] = [];

    const wz = this.zone.nativeElement.offsetWidth;
    const hz = this.zone.nativeElement.offsetHeight;
    const pz = this.width*0.1;

    while (counter < 40){
      counter++;
      let circle = new SpanCircle(counter);
      const x = Math.round(Math.random() * this.width);
      const y = Math.round(Math.random() * this.height);
      circle.setPosition(x , y);
      if (x + 10 < pz || x + 10 > pz + wz || y + 10 < pz || y + 10 > pz + wz){
        circle.color = 'red';
        this.vacasFuera++;
      }else{
        this.vacasDentro++;
      }
      temp.push(circle);
    }
    this.circles = temp;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.width = this.frame.nativeElement.offsetWidth;
    this.factor = this.width/this.oldwidth;
    this.height = this.width;
  }

  private subscribeToTopic() {
    console.log('Me voy a subscribir');
    this.subscription = this.eventMqtt.topic()
        .subscribe((data: IMqttMessage) => {
            let item = JSON.parse(data.payload.toString());
            console.log(item)
            this.changePosition(item);
        });
  }
  changePosition(item){
    const x = Math.round(item.x * this.width);
    const y = Math.round(item.y * this.height);
    const index = item.id ;
    this.circles[index].setPosition(x,y);
    const wz = this.zone.nativeElement.offsetWidth;
    const pz = this.width*0.1;
    if (x + 10 < pz || x + 10 > pz + wz || y + 10 < pz || y + 10 > pz + wz){
      if(this.circles[index].color == 'green'){
        this.vacasFuera++;
        this.vacasDentro--;
      }
      this.circles[index].color = 'red';

    }else{
      if(this.circles[index].color == 'red'){
        this.vacasFuera--;
        this.vacasDentro++;
      }
      this.circles[index].color = 'green';

    }
  }
}

/*
this.ctx = this.canvas.nativeElement.getContext('2d');
    //this.canvas.nativeElement.style.height = this.canvas.nativeElement.style.width;

    let counter = 0;
    const radius = 5;
    const w = this.canvas.nativeElement.width;
    const h = this.canvas.nativeElement.height;
    const r = 5;
    this.ctx.beginPath();
    const square = new Square(this.ctx);
    const paddingW = 0.1*w;
    const paddingH = 0.1*h;
    const wz = 0.8*w;
    const hz = 0.8*h;
    square.draw(paddingW, paddingH, wz, hz);
    this.ctx.stroke();
    this.ctx.fill();
    while (counter < 40){
      let circle = new Circle(this.ctx);
      const x = Math.round(Math.random() * w);
      const y = Math.round(Math.random() * h);

      circle.draw(x,y,r);
      let color = '#28a745';
      if (x < paddingW || x > wz + paddingW || y < paddingH || y > hz + paddingH){
        color = 'red';
      }
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.strokeText(counter.toString(),x,y,10);

      counter++;
    }
 */
