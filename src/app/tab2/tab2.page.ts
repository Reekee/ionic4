import { Component } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data = [];
  constructor(
    private session: SessionService
  ) {
    this.loadData();
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
