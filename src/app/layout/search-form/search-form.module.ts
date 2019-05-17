import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [SearchFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ]
})
export class SearchFormModule { }
