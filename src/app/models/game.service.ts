import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public currentCard: string | undefined = '';
  public drawCardAnimation = false;

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('ace_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
    }

    this.shuffle(this.stack);

  }

  public toJson() {
    return {
      players: this.players,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      currentCard: this.currentCard,
      drawCardAnimation: this.drawCardAnimation
    };
  }

  shuffle(array: string[]) {
    let currentIndex = this.stack.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
}
