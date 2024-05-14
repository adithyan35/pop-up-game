import { Component, OnInit, ViewChildren, computed, effect, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BalloonComponent } from './components/balloon/balloon.component';
import { IBalloon } from './balloon.interface';
import { Balloon } from './balloon.class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BalloonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
 balloonsOnScreen = 5;
 balloons: IBalloon [] = [];
 score = 0;
 missed = signal(0);
 maxMissess= 10;
 gameOver = computed(() =>{
  return this.missed() ==this.maxMissess;
 });
 balloonElements = ViewChildren(BalloonComponent);

createBalloonsOnDemand = effect(() => {
  if (this.balloonElements().length < this.balloonsOnScreen) {
    this.balloons = [ ... this.balloons, new Balloon()];
  }
})
 ngOnInit(): void {
   this.startGame();
 }
 startGame(){
  this.missed.set(0);
  this.score =0;
  this.balloons = new Array(this.balloonsOnScreen)
  .fill(0)
  .map(() => new Balloon());
 }

 balloonPopHandler(balloonId:string) {
  this.score++;
  this.balloons = this.balloons.filter(
    (balloon) => balloon.id !== balloonId  );
    this.balloons =[...this.balloons, new Balloon()]
    this.balloons.push(new Balloon());

 }

 balloonMissHandler(balloonId: string){
  this.missed.update((val) => val + 1);
  this.balloons = this.balloons.filter(
    (balloon) => balloon.id !== balloonId  );
 }
}

