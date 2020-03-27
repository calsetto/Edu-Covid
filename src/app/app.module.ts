import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'

import { environment } from '../environments/environment';
import { SigninComponent } from './signin/signin.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MapaComponent } from './mapa/mapa.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3qd293fNODeK6lQPChMVhvU2nixxRYjE'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
