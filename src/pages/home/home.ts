import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverController, ViewController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Result } from '@zxing/library';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  results: Result[]

  constructor(public navCtrl: NavController, private storage: Storage,
    public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
  }

  presentPopover(myEvent, result) {
    let popover = this.popoverCtrl.create(PopoverPage, result);
    popover.present({
      ev: myEvent
    });
  }

  ionViewWillEnter() {
    this.storage.get('results').then((val) => {
      if (val) {
        this.results = val.reverse()
      } else {
        this.results = new Array<Result>();
      }
      console.log(val)
    });
  }

  clearHistory() {
    const confirm = this.alertCtrl.create({
      title: 'Clear the history?',
      message: 'Do you really want to clear all the history?',
      buttons: [
        {
          text: 'Nope',
          handler: () => {
            console.log('Nope clicked');
          }
        },
        {
          text: 'Sure',
          handler: () => {
            this.storage.set('results', null)
            this.results = null
            console.log('Sure clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}

@Component({
  template: `
    <ion-list>
      <ion-list-header>Options</ion-list-header>
      <button ion-item *ngIf="link" (click)="openInBrowser()">Open in browser</button>
      <button ion-item *ngIf="!link" (click)="copy()">Copy it</button>
      <button ion-item (click)="close()">{{ result.timestamp }}</button>
    </ion-list>
  `
})
export class PopoverPage {
  result: Result
  link: boolean
  constructor(public viewCtrl: ViewController, private navParams: NavParams,
    private iab: InAppBrowser, private clipboard: Clipboard,
    public toastCtrl: ToastController) { }

  close() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.result = this.navParams.data;

      let newDate: Date = new Date();
      newDate.setTime(this.result.timestamp);
      // Wed Jun 18 2014 
      this.result.timestamp = newDate.toDateString()

      this.link = this.result.text.indexOf('http') == 0 ? true : false;
    }
  }

  openInBrowser() {
    const browser = this.iab.create(this.result.text, "_system");
    browser.close();
  }

  copy() {
    this.clipboard.copy(this.result.text);
    const toast = this.toastCtrl.create({
      message: 'Copied to clipboard',
      duration: 3000
    });
    toast.present();
    close();
  }

}
