import { Component } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user = {};
  constructor(
    private session: SessionService,
    private router: Router,
    private storage: Storage,
  ) {
    this.user = this.session.user;
  }
  logout() {
    //alert("AAAAAA")
    this.session.status = false;
    this.session.user = {};
    this.router.navigateByUrl("/login", { replaceUrl: true });
    this.storage.remove('status');
    this.storage.remove('user');
  }
}
