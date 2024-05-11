import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameService } from '../models/game.service';
import { PlayerComponent } from '../player/player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game = inject(GameService);
  currentCard: string | undefined = '';
  drawCardAnimation = false;

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new GameService;
    console.log(this.game);
  }


  drawCard() {
    if (!this.drawCardAnimation) {
      this.drawCardAnimation = true;
      this.currentCard = this.game.stack.pop();

      console.log('New Card:', this.currentCard);
      console.log(this.game);
    }
    setTimeout(() => {
      if (this.currentCard != undefined) {
        this.game.playedCards.push(this.currentCard);
      }
      this.drawCardAnimation = false;
    }, 1000)
  }



}

