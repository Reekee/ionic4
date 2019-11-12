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

  constructor(
    private session: SessionService,
    private router: Router,
    private storage: Storage,
  ) { }
  logout() {
    //alert("AAAAAA")
    this.session.status = false;
    this.router.navigateByUrl("/login", { replaceUrl: true });
    this.storage.remove('status');
  }
}
