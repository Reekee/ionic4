import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  status: boolean = false;   // ตัวแปรสำหรับควบคุมการล็อกอิน  false ยังไม่ล็อกอิน / true ล็อกอินแล้ว
  user = {};                 // ตัวแปรสำหรับเก็บข้อมูลของผู้ใช้ที่ล็อกอิน 
  constructor() { }
  ajax(url) {
    alert(url);
  }
}
