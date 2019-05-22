import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent, Sort } from '@angular/material';
import { PageInfo } from '../../common/model/page-info';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.css']
})
export class CommonListComponent {

  @Input() propertyNames: string[];
  @Input() tableHeaders: string[];
  @Input() length: number;
  @Input() list: any[];
  @Input() showCheckBox: boolean;
  @Output() pageChange = new EventEmitter<PageInfo>();

  pageInfo: PageInfo;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  objectKeys = Object.keys;

  constructor() {
    this.pageInfo = new PageInfo(0, 5, "asc", "id");
  }

  // 페이징
  paginate(pageEvent: PageEvent) {
    this.pageInfo.pNo = pageEvent.pageIndex;
    this.pageInfo.pSize = pageEvent.pageSize;
    this.pageChange.emit(this.pageInfo);
  }

  // 정렬
  sortData(sort: Sort) {
    this.pageInfo.dir = sort.direction;
    this.pageInfo.key = sort.active;
    this.pageChange.emit(this.pageInfo);
  }

  selectedRow: any;
  
  // row 선택
  selectRow(idx: number) {
    const className = 'selected-row';
    let preSelected = document.getElementsByClassName(className);
    let curSelected = document.getElementById("row"+idx);
    
    this.selectedRow = {...this.list[idx]};

    if(curSelected.classList.contains(className)) { //토글
      curSelected.classList.remove(className);
    } else {
      if(preSelected.length != 0) { //이전선택 취소
        preSelected[0].classList.remove(className); 
      }
      curSelected.classList.add(className);
    }
  }

  toList(arr: any[]): string[] {
    let result = this.objectKeys(arr);
    result[0] = "obj['team'].name";

    return result;
  }
  

}
