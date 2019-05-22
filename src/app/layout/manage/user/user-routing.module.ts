import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMainComponent } from './user-main/user-main.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: UserMainComponent },
  { path: 'list', component: UserListComponent },
  { path: 'detail', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
