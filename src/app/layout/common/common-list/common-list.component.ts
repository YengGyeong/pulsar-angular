import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { Team } from '../../manage/team/model/team';
import { PageInfo } from '../../common/model/page-info';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.css']
})
export class CommonListComponent {

  dataSource = new MatTableDataSource<Team>();
  @Input() displayedColumns: string[];
  @Input() length: number;
  @Input() set list(list: Team[]) {
    this.dataSource.data = list;
  }

  @Output() pageChange = new EventEmitter<any>();

  // MatPaginator Inputs
  pageInfo: PageInfo;
  pageSizeOptions: number[] = [5, 10, 25, 100];

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

}
