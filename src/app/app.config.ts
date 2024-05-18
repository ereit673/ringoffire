import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-2ae12","appId":"1:578535188697:web:55e486266bc025d465f6c8","storageBucket":"ring-of-fire-2ae12.appspot.com","apiKey":"AIzaSyA3f1g1O51gOeSYEme5utLMp7DyJOGgV4Q","authDomain":"ring-of-fire-2ae12.firebaseapp.com","messagingSenderId":"578535188697"})), provideFirestore(() => getFirestore())]
};
