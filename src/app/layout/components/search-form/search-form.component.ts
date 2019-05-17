import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Search } from './search';
import {NgbModal, ModalDismissReasons, NgbDate, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
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
          array[index] = new NgbDate(Number(v1.substring(0,4)), Number(v1.substring(5,7)),  Number(v1.substring(8,10)));
        })
      }
    });
    this._searchList = searchList;
  }
  get searchList() {
    return this._searchList;
  }

  @Output() sendToParent = new EventEmitter<Search[]>();

  ngOnInit() {

  }

  openDialog(url: string) {
    console.log(url);
  }

}
