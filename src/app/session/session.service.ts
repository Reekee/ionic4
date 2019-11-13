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
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router,
  ) { }
  async ajax(url, data, isloading) {
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
            timeout(5000)
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
  linkTo(page, type = false) { // type=false ไม่จำ/ true=จำ
    if (type == false) {
      this.router.navigateByUrl(page, { replaceUrl: true }); // ไม่จำประวัติหน้าก่อนหน้า
    } else {
      this.router.navigateByUrl(page);  // จำประวัติหน้าก่อนหน้า
    }
  }
  setStorage(key, value) {
    return this.storage.set(key, value);
  }
  getStorage(key) {
    return this.storage.get(key);
  }
  removeStorage(key) {
    return this.storage.remove(key);
  }
}
