import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.page.html',
  styleUrls: ['./project-add.page.scss'],
})
export class ProjectAddPage implements OnInit {
  project: any = {};
  constructor(
    private session: SessionService
  ) { }

  ngOnInit() {
  }
  add() {
    let url = this.session.api + "project-add.php";
    this.project.user_id = this.session.user.user_id;
    this.session.ajax(url, this.project, true).then((res: any) => {
      if (res.status == true) {
        this.session.back();
      } else {
        this.session.showAlert(res.message);
      }
    }).catch(err => {
      this.session.showAlert(err);
    });
  }
  validate() {
    if (!this.project.project_name) return true;
    if (!this.project.project_detail) return true;
    if (!this.project.project_date) return true;
    if (!this.project.project_amount) return true;
    return false;
  }
}
