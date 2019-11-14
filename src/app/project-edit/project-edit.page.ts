import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {
  project_id = '';
  project: any = {};
  constructor(
    private route: ActivatedRoute,
    private session: SessionService
  ) { }
  ngOnInit() {
    this.project_id = this.route.snapshot.paramMap.get('id');
    let url = this.session.api + "project-get-once.php";
    this.session.ajax(url, {
      project_id: this.project_id,
    }, true).then((res: any) => {
      if (res.status == true) {
        this.project = res.data;
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
  edit() {
    let url = this.session.api + "project-edit.php";
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
}
