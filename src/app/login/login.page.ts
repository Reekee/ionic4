import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session/session.service';

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
    private session: SessionService
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
        this.session.status = true;
        this.session.user = data.user;
        this.session.setStorage('status', true);
        this.session.setStorage('user', data.user);
        //this.router.navigateByUrl("/tabs/tab1", { replaceUrl: true });
        this.session.linkTo("/tabs/tab1", false);
      } else {
        alert("Login ไม่ผ่าน");
      }
    })
  }
}
