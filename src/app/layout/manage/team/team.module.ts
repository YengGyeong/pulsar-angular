import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamRoutingModule } from './team-routing.module';
import { TeamFormComponent } from './team-form/team-form.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchFormModule } from '../../search-form/search-form.module';
import { CommonListComponent } from '../../common/common-list/common-list.component';

@NgModule({
  declarations: [
    TeamListComponent,
    TeamDetailComponent,
    TeamFormComponent,
    CommonListComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    TeamRoutingModule
  ],
  entryComponents: [
    TeamDetailComponent,
    TeamFormComponent
  ]
})
export class TeamModule { }
