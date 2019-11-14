import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {
  project: any = {};
  constructor() { }

  ngOnInit() {
  }
  validate() {
    if (!this.project.project_name) return true;
    if (!this.project.project_detail) return true;
    if (!this.project.project_date) return true;
    if (!this.project.project_amount) return true;
    return false;
  }
}
