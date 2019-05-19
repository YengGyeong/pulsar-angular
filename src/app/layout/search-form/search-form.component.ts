import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Search } from './search';
// import {NgbModal, ModalDismissReasons, NgbDate, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  model: any;
  _searchList: Search[];
  constructor() { }

  @Input()
  set searchList(searchList:Search[]) {
    searchList.forEach(function(v) {
      if(v.kind == "date") {
        v.selectDates.forEach(function(v1, index, array){
          array[index] = new Date(v1);
        })
      }
    });
    this._searchList = searchList;
  }
  get searchList() {
    return this._searchList;
  }

  @Output() sendEvent = new EventEmitter<Search[]>();

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  sendToParent(searchList) {
    console.log(searchList);
   
    searchList.forEach(function(v) {
      if(v.kind == "date") {
        v.selectDates.forEach(function(v1, index, array){
          var d = new Date(v1),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          v.selectValues[index] = [year, month, day].join('-');
        })
      }
    });
    
    console.log(searchList);

    this.sendEvent.emit(searchList);
  }

  

  ngOnInit() {
  }

  openDialog(url: string) {
    console.log(url);
  }

}
