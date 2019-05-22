import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { PageInfo } from '../../../common/model/page-info';
import { Team } from '../model/team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})

export class TeamListComponent {

  @Input() displayedColumns: string[];
  @Input() tableHeaders: string[];
  @Input() pageInfo: PageInfo;
  @Input() length: number;
  @Input() set list(theList:  Team[]) {
    this.dataSource.data = theList;
    this.teamList = theList;
  };
  @Output() event = new EventEmitter<any>();

  dataSource = new MatTableDataSource<Team>();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  teamList: Team[];

  constructor() {
    this.pageInfo=new PageInfo(0, 5, "asc", "id");
  }

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

  // row 선택
  selectRow(idx: number) {
    const className = 'selected-row';
    let preSelected = document.getElementsByClassName(className);
    let curSelected = document.getElementById(this.teamList[idx].id.toString());
    let selectedIdx;
    
    if(curSelected.classList.contains(className)) { //토글
      selectedIdx = -1;
      curSelected.classList.remove(className);
    } else {
      selectedIdx = idx;
      if(preSelected.length != 0) { //이전선택 취소
        preSelected[0].classList.remove(className); 
      }
      curSelected.classList.add(className);
    }

    this.event.emit(selectedIdx);
  }

}


