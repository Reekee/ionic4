import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.page.html',
  styleUrls: ['./project-add.page.scss'],
})
export class ProjectAddPage implements OnInit {
  project = {};
  constructor() { }

  ngOnInit() {
  }

}
