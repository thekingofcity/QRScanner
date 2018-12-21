import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BrowserQRCodeReader, Result } from '@zxing/library';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  results: Result[];
  codeReader: BrowserQRCodeReader
  constructor(public navCtrl: NavController, private storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.get('results').then((val) => {
      if (val) {
        this.results = val
      } else {
        this.results = new Array<Result>();
      }
    })

    this.codeReader = new BrowserQRCodeReader();

    this.codeReader.getVideoInputDevices()
      .then(videoInputDevices => {
        videoInputDevices.forEach(
          device => console.log(`${device.label}, ${device.deviceId}`)
        );
        const firstDeviceId = videoInputDevices[1].deviceId;

        this.codeReader.decodeFromInputVideoDevice(firstDeviceId, 'video')
          .then(result => {
            this.codeReader.reset()
            console.log(result)

            this.results.push(result)
            this.storage.set('results', this.results)

            this.navCtrl.push(HomePage, {
              // test : "aaa"
            });
          })
          .catch(err => console.error(err));

      })
      .catch(err => console.error(err));
  }

  ionViewWillLeave() {
    this.codeReader.reset()
  }
}
