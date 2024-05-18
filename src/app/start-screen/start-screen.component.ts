import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { GameService } from '../models/game.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router: Router, private firestore: Firestore) {

  }

  async newGame() {
    let game = new GameService();

    await addDoc(collection(this.firestore, "games"), game.toJson()
    ).then((gameInfo) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}
