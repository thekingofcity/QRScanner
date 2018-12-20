import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  results: any

  constructor(public navCtrl: NavController, private storage: Storage, public popoverCtrl: PopoverController) {
    this.storage.get('results').then((val) => {
      console.log(val)
      this.results = val
    });
  }

  presentPopover(myEvent, result) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  ionViewWillEnter() {
  }
}

@Component({
  template: `
    <ion-list>
      <ion-list-header>Ionic</ion-list-header>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController, private navParams: NavParams) { }

  close() {
    this.viewCtrl.dismiss();
  }
}
