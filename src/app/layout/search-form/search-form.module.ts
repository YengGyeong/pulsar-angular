import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form.component';
import { FormsModule } from '@angular/forms';
import { PulsarMaterialModule } from 'src/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import {Component} from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { PopupModule } from '../common/popup/popup.module';



@NgModule({
  declarations: [SearchFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    PulsarMaterialModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    PopupModule
  ],
  exports: [
    SearchFormComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ko-KR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class SearchFormModule { }
