import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent, SelectTeamDialog } from './user-form/user-form.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonListComponent } from '../../common/common-list/common-list.component';
import { FormsModule } from '@angular/forms';
import { UserMainComponent } from './user-main/user-main.component';
import { TeamModule } from '../team/team.module';
import { PopupModule } from '../../common/popup/popup.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserFormComponent,
    CommonListComponent,
    SelectTeamDialog,
    UserMainComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule,
    FormsModule,
    TeamModule,
    PopupModule
  ],
  entryComponents: [
    UserDetailComponent,
    UserFormComponent,
    SelectTeamDialog
  ]
})
export class UserModule { }
