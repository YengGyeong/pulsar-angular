import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../layout.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { FormsModule } from '@angular/forms';
import { ScheduleMainComponent } from './schedule-main/schedule-main.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';

@NgModule({
  declarations: [
    ScheduleMainComponent, 
    ScheduleFormComponent, 
    ScheduleListComponent, 
    ScheduleDetailComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ScheduleRoutingModule,
    FormsModule
  ]
})
export class ScheduleModule { }
