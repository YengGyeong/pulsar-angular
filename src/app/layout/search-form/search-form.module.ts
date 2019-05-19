import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form.component';
import { FormsModule } from '@angular/forms';
import { PulsarMaterialModule } from 'src/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SearchFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    PulsarMaterialModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  exports: [
    SearchFormComponent
  ]
})
export class SearchFormModule { }
