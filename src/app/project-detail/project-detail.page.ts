import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {
  project_id = '';
  project = {};
  constructor(
    private route: ActivatedRoute,
    private session: SessionService
  ) { }
  ngOnInit() {
    this.project_id = this.route.snapshot.paramMap.get('id');
    //alert(this.project_id);

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
}
