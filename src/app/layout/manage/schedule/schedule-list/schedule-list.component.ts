import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { PageInfo } from '../../../common/model/page-info';
import { Schedule } from '../model/schedule';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent {

  @Input() displayedColumns: string[];
  @Input() pageInfo: PageInfo;
  @Input() length: number;
  @Input() set list(theList:  Schedule[]) {
    this.dataSource.data = theList;
    this.scheduleList = theList;
  };
  @Output() event = new EventEmitter<any>();

  dataSource = new MatTableDataSource<Schedule>();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  scheduleList: Schedule[];

  constructor() {}

  // 페이징
  paginate(pageEvent: PageEvent) {
    this.pageInfo.pNo = pageEvent.pageIndex;
    this.pageInfo.pSize = pageEvent.pageSize;
    this.event.emit(this.pageInfo);
  }

  // 정렬
  sortData(sort: Sort) {
    this.pageInfo.dir = sort.direction;
    this.pageInfo.key = sort.active;
    this.event.emit(this.pageInfo);
  }

  // row 선택 - 한번클릭
  selectRow(idx: number) {
    const className = 'selected-row';
    let preSelected = document.getElementsByClassName(className);
    let curSelected = document.getElementById(this.scheduleList[idx].trgId);
    let result = {"state":"selectRow", "idx":idx};
    
    if(curSelected.classList.contains(className)) { //토글
      result.idx = -1;
      curSelected.classList.remove(className);
    } else {
      if(preSelected.length != 0) { //이전선택 취소
        preSelected[0].classList.remove(className); 
      }
      curSelected.classList.add(className);
    }

    this.event.emit(result);
  }

  // 조회 - 더블클릭
  openGet(idx: number) {

    let result = {"state":"openGet", "idx":idx};
    this.event.emit(result);
  } 

}
