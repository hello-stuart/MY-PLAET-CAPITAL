import { Component } from '@angular/core';

@Component({
  selector: 'app-rain-effect',
  imports: [],
  templateUrl: './rain-effect.component.html',
  styleUrl: './rain-effect.component.css'
})
export class RainEffectComponent {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | any;
  private raindrops: Raindrop[] = [];
  private splashes: Splash[] = [];

  ngOnInit(): void {
    this.canvas = document.getElementById('rainCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.initRain();
    this.animateRain();
  }


  private initRain(): void {
    for (let i = 0; i < 150; i++) {
      this.raindrops.push(new Raindrop(this.canvas.width, this.canvas.height));
    }
  }

  private animateRain(): void {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.raindrops.forEach((drop) => {
      drop.update(() => this.createSplash(drop.x, drop.y)); // Pass splash function
      drop.draw(this.ctx);
    });

    for (let i = this.splashes.length - 1; i >= 0; i--) {
      this.splashes[i].update();
      this.splashes[i].draw(this.ctx);
      if (this.splashes[i].opacity <= 0) {
        this.splashes.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animateRain());
  }

  private createSplash(x: number, y: number): void {
    this.splashes.push(new Splash(x, y));
  }
}

class Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.length = Math.random() * 15 + 10;
    this.speed = Math.random() * 3 + 6;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update(createSplash: (x: number, y: number) => void): void {
    this.y += this.speed;

    if (this.y > window.innerHeight - 10) {
      createSplash(this.x, this.y); // Trigger splash effect
      this.y = Math.random() * -20;
      this.x = Math.random() * window.innerWidth;
    }
  }


  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

class Splash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = Math.random() * 8 + 5;
    this.opacity = 1;
  }

  update(): void {
    this.radius += 0.8;
    this.opacity -= 0.05;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

}
