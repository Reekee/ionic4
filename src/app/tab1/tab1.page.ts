import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) { }
  set() {
    alert("Set");
  }
  get() {
    alert("Get");
  }
  remove() {
    alert("remove");
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
}
