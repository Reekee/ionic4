import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  status: boolean = false;   // ตัวแปรสำหรับควบคุมการล็อกอิน  false ยังไม่ล็อกอิน / true ล็อกอินแล้ว
  user = {};                 // ตัวแปรสำหรับเก็บข้อมูลของผู้ใช้ที่ล็อกอิน 
  public api = "http://localhost/ionic/";     // ตัวแปรสำหรับชี้ที่ตั้งของ Api
  public apiTimeout: number = 5000; // ตัวแปรควบคุมเมื่อติดต่อ api ไม่ได้เกิน 5 วินาทีให้ timeout ออก
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router,
  ) { }
  public async ajax(url, data, isloading) {
    let loading: any;
    if (isloading == true) {
      loading = await this.loadingCtrl.create({
        message: "กำลังประมวลผล",
      });
      await loading.present();
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.post(url, JSON.stringify(data), { responseType: 'text' })
          .pipe(
            timeout(this.apiTimeout)
          )
          .subscribe((response: any) => {
            if (isloading == true) { loading.dismiss(); }
            try {
              var rs = JSON.parse(response);
              resolve(rs);
            } catch (e) {
              reject(response);
            }
          }, error => {
            if (isloading == true) { loading.dismiss(); }
            reject("ไม่สามารถติดต่อเครื่องแม่ข่ายได้");
          });
      }, 200);
    });
  }
  public linkTo(page, type = false) { // type=false ไม่จำ/ true=จำ
    if (type == false) {
      this.router.navigateByUrl(page, { replaceUrl: true }); // ไม่จำประวัติหน้าก่อนหน้า
    } else {
      this.router.navigateByUrl(page);  // จำประวัติหน้าก่อนหน้า
    }
  }
  public setStorage(key, value) {
    return this.storage.set(key, value);
  }
  public getStorage(key) {
    return this.storage.get(key);
  }
  public removeStorage(key) {
    return this.storage.remove(key);
  }
  public showAlert(message) {     // method สำหรับการแสดง Alert ข้อมูล
    let msg: any = message;
    if (typeof message === 'object') msg = JSON.stringify(message);
    if (typeof message === 'string') msg = message;
    return new Promise(async resolve => {
      const alert = await this.alertCtrl.create({
        header: "แจ้งข้อความ",
        message: msg,
        backdropDismiss: false,
        buttons: [
          {
            text: "ตกลง",
            handler: () => {
              resolve(true);
            }
          },
        ]
      });
      await alert.present();
    });
  }
  public showConfirm(message) {   // method สำหรับการแสดงการยืนยันข้อมูล
    let msg: any = message;
    if (typeof message === 'object') msg = JSON.stringify(message);
    if (typeof message === 'string') msg = message;
    return new Promise(async resolve => {
      let alert = await this.alertCtrl.create({
        header: "คำยืนยัน ?",
        message: msg,
        backdropDismiss: false,
        buttons: [
          {
            text: "ยกเลิก",
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: "ตกลง",
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }
  public async showToast(message, duration = 2000) {  // method สำหรับการแสดง Toast ข้อมูล
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      duration: duration,
      mode: 'ios',
      showCloseButton: true,
      closeButtonText: "ปิด"
    });
    toast.present();
  }
}
