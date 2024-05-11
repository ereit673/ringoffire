import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameService } from '../models/game.service';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game = inject(GameService);
  currentCard: string | undefined = '';
  drawCardAnimation = false;

  constructor(public dialog: MatDialog){}

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
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}

