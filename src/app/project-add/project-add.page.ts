import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.page.html',
  styleUrls: ['./project-add.page.scss'],
})
export class ProjectAddPage implements OnInit {
  project: any = {};
  constructor() { }

  ngOnInit() {
  }
  add() {

  }
  validate() {
    console.log(this.project.project_name);
    if (!this.project.project_name) return true;
    if (!this.project.project_detail) return true;
    if (!this.project.project_date) return true;
    if (!this.project.project_amount) return true;
    return false;
  }
}
