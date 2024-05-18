import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameService } from '../models/game.service';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, addDoc, doc, getDoc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable, Subscription, single } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  private firestore: Firestore = inject(Firestore);
  items$: Observable<any> | undefined;
  items: Subscription | undefined;
 

  game = inject(GameService);
  
  gameId: any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      let singleGame = this.getSingleDocRef('games', params['id']);
      
      this.items$ = docData(singleGame);   

      this.items = this.items$.subscribe((game) => {
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack= game.stack;
        this.game.drawCardAnimation = game.drawCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });

  }

  drawCard() {
    if (!this.game.drawCardAnimation) {
      this.game.drawCardAnimation = true;
      this.game.currentCard = this.game.stack.pop();

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();
    }
    setTimeout(() => {
      if (this.game.currentCard != undefined) {
        this.game.playedCards.push(this.game.currentCard);
      }
      this.game.drawCardAnimation = false;
      this.saveGame();
    }, 1000)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name != undefined) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  getSingleDocRef(colId:string, docId:string){
    return doc(collection(this.firestore, colId), docId);
  }

  async saveGame(){
    await updateDoc(this.getSingleDocRef('games', this.gameId), this.game.toJson());
  }

}

