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
    let url = this.session.api + "project-get.php";
    this.session.ajax(url, {

    }, true).then((res: any) => {
      if (res.status == true) {
        this.data = res.data;
      } else {
        alert(res.message);
      }
    }).catch(err => {
      this.session.showAlert(err);
    });
  }
  add() {
    this.session.linkTo('/project-add', true);
  }
  del(item) {
    this.session.showConfirm("ลบไหม?").then(rs => {
      if (rs == true) {
        let url = this.session.api + "project-del.php";
        this.session.ajax(url, {
          project_id: item.project_id
        }, true).then((res: any) => {
          if (res.status == true) {
            this.loadData();
          } else {
            this.session.showConfirm(res.message);
          }
        });
      }
    });
  }
  view(item) {
    this.session.linkTo('/project-detail/' + item.project_id);
  }
  edit(item) {
    this.session.linkTo('/project-edit/' + item.project_id);
  }
}
