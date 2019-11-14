import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session/session.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data = [];
  data2 = {};
  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private storage: Storage,
    private http: HttpClient,
    private session: SessionService,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner
  ) { }
  set() {
    //alert("Set");
    this.storage.set('status', true);
  }
  get() {
    //alert("Get");
    this.storage.get('status').then((val) => {
      console.log(val);
    });
  }
  remove() {
    //alert("remove");
    this.storage.remove('status');
  }
  async showActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Your Title',
      buttons: [{
        text: 'Album',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          alert('AAA');
        }
      },
      {
        text: 'Camera',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          alert('BBB');
        }
      }]
    });
    await actionSheet.present();
  }
  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: [{
        text: 'OK',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('YYYYYYYYYYYYYYYY');
        }
      }, {
        text: 'NO',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('NNNNNNNNNNN');
        }
      }]
    });
    await alert.present();
  }
  getDataService() {
    let url = "http://10.108.35.202/ionic4/get-data.php";
    this.http.get(url, { responseType: 'text' }).subscribe((res: any) => {
      this.data = JSON.parse(res);
      console.log(this.data);
    })
  }
  getDataService2() {
    let url = "http://10.108.35.202/ionic4/get-data2.php";
    this.http.post(url, JSON.stringify({
      data1: "สมชาย",
      data2: "สมใจ"
    }), { responseType: 'text' }).subscribe((res: any) => {
      this.data2 = JSON.parse(res);
      console.log(this.data2);
    })
  }
  testService() {
    //this.session.ajax("AAAAAAAAAAAAAAAAAAAa");
  }
  showAlert2() {
    this.session.showAlert('ok');
  }
  showConfirm() {
    this.session.showConfirm('Are you confirm?').then(rs => {
      alert(rs);
    });
  }
  showToast() {
    this.session.showToast('ok 222', 5000);
  }
  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
