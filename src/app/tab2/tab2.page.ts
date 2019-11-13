import { Component } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data = [];
  private subscription: Subscription;
  constructor(
    private router: Router,
    private session: SessionService
  ) {
    this.subscription = this.router.events.subscribe(async (event: any) => {
      if (event instanceof NavigationEnd && event.url === '/tabs/tab2') {
        this.loadData();
      }
    });
  }
  loadData() {
    let url = "http://localhost/ionic/project-get.php";
    this.session.ajax(url, {

    }, true).then((res: any) => {
      if (res.status == true) {
        this.data = res.data;
      } else {
        alert(res.message);
      }
    });
  }
  add() {
    this.session.linkTo('/project-add', true);
  }
}
