import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  status: boolean = false;   // ตัวแปรสำหรับควบคุมการล็อกอิน  false ยังไม่ล็อกอิน / true ล็อกอินแล้ว
  constructor() { }
  ajax(url) {
    alert(url);
  }
}
