import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamRoutingModule } from './team-routing.module';
import { TeamFormComponent } from './team-form/team-form.component';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [
    TeamListComponent,
    TeamDetailComponent,
    TeamFormComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    LayoutModule
  ],
  entryComponents: [
    TeamFormComponent
  ]
})
export class TeamModule { }
