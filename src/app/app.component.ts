import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  constructor() { }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyAI17vFm-KjTZ7SVLoStuNdIIHMQ5D5kxk',
      authDomain: 'recipe-book-c539c.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
