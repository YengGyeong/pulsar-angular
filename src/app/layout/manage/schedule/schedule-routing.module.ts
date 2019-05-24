import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleMainComponent } from './schedule-main/schedule-main.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';

const routes : Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: ScheduleMainComponent },
  { path: 'list', component:  ScheduleListComponent },
  { path: 'detail', component: ScheduleDetailComponent },
  { path: 'form', component: ScheduleFormComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ScheduleRoutingModule { }
