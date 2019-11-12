import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  login() {
    let url = "http://localhost/ionic/login.php";
    this.http.post(url, JSON.stringify({
      username: this.username,
      password: this.password
    }), { responseType: 'text' }).subscribe((res: any) => {
      //alert(res);
      let data = JSON.parse(res);
      if (data.status == true) {
        this.router.navigateByUrl("/tabs/tab1", { replaceUrl: true });
      } else {
        alert("Login ไม่ผ่าน");
      }
    })
  }
}
