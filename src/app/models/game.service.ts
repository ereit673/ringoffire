import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  players: string[] = ['Hans', 'Peter', 'Freddy'];
  stack: string[] = [];
  playedCards: string[] = [];
  currentPlayer: number = 0;
  

  constructor() { 
    for (let i = 1; i < 14; i++){
      this.stack.push('ace_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
    }

    this.shuffle(this.stack);
    
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
