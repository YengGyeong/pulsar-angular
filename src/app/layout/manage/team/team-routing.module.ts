import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamMainComponent } from './team-main/team-main.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

const routes : Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: TeamMainComponent },
  { path: 'list', component: TeamListComponent },
  { path: 'detail', component: TeamDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TeamRoutingModule { }
