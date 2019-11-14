import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'project-add', loadChildren: './project-add/project-add.module#ProjectAddPageModule' },
  { path: 'project-detail/:id', loadChildren: './project-detail/project-detail.module#ProjectDetailPageModule' },
  { path: 'project-edit/:id', loadChildren: './project-edit/project-edit.module#ProjectEditPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
