import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results:any

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.storage.get('results').then((val) => {
      console.log(val)
      this.results=val
    });
  }

  ionViewWillEnter(){
  }
}
