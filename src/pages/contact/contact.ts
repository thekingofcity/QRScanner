import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import { Diagnostic } from '@ionic-native/diagnostic';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  cameraPreviewOpts: CameraPreviewOptions
  pictureOpts: CameraPreviewPictureOptions

  //constructor(public navCtrl: NavController, private cameraPreview: CameraPreview, private diagnostic: Diagnostic) {
  constructor(public navCtrl: NavController, private cameraPreview: CameraPreview) {
    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
    this.cameraPreviewOpts = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };
    // picture options
    this.pictureOpts = {
      width: 1280,
      height: 1280,
      quality: 85
    }


    // let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
    // let errorCallback = (e) => console.error(e);
    // this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
    this.initializePreview();
  }

  initializePreview() {
    // start camera
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });

  }

  // take a picture
  takepicture() {
    console.log("\nTaking picture\n")
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      // this.picture = 'data:image/jpeg;base64,' + imageData;
      console.log('data:image/jpeg;base64,' + imageData)
    }, (err) => {
      console.log(err);
      // this.picture = 'assets/img/test.jpg';
    });
  }

}
