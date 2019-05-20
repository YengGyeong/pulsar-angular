import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Search } from './search';
// import {NgbModal, ModalDismissReasons, NgbDate, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog } from '@angular/material';
import { UserListComponent } from '../manage/user/user-list/user-list.component';


@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  model: any;
  _searchList: Search[];
  gridHeight: any; 

  constructor( public dialog: MatDialog ) { }

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

    this.gridHeight = (70 + (searchList.length/3) * 20) + "px";
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


  breakpoint;

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
    this.breakpoint = (event.target.innerWidth >= 1200) ? 3 : 2;
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.breakpoint = (window.innerWidth >= 1200) ? 3 : 2;
  }

  openDialog(url: string) {
    alert(url);
  }



    // dialogRef.afterClosed().subscribe(result => {
    //   if(result != null) {
    //     this.userService.addUser(result).subscribe(data => {
    //       this.length += 1;
    //       this.getUsers();
    //     });
    //   }
    // });


}
