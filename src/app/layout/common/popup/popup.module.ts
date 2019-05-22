import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  PopupComponent } from './popup.component';
import { MatInputModule, MatButtonModule, MatDialog, MatDialogModule } from '@angular/material';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { LayoutModule } from '../../layout.module';

@NgModule({
  declarations: [  PopupComponent ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    PopupComponent
  ]
})
export class PopupModule { }
