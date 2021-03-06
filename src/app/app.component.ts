import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SessionService } from './session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private session: SessionService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /// check data of login
      /*
      this.storage.get("status").then(rs => {
        if (rs == true) {
          this.session.status = true;
          this.storage.get("user").then(rs2 => {
            this.session.user = rs2;
          });
          this.router.navigateByUrl("/tabs/tab1", { replaceUrl: true });
        } else {
          this.router.navigateByUrl("/login", { replaceUrl: true });
        }
      });*/
      let rs = await this.storage.get("status");
      if (rs == true) {
        this.session.status = true;
        this.session.user = await this.storage.get("user");
        this.router.navigateByUrl("/tabs/tab1", { replaceUrl: true });
      } else {
        this.router.navigateByUrl("/login", { replaceUrl: true });
      }
      /*
            let status;
            await this.storage.get("status").then(rs => {
              alert("AAA");
              status = rs;
            });
            alert("BBB");
      */






    });
  }
}
