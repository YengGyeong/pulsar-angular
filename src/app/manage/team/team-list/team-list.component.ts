import { Component, OnInit } from '@angular/core';
import { Search } from '../../../layout/components/search-form/search';
import { MatTableDataSource, PageEvent, Sort, MatDialog } from '@angular/material';
import { Team } from '../model/team';
import { TeamService } from '../service/team.service';
import { PageInfo } from '../../../common/model/page-info';
import { TeamFormComponent } from '../team-form/team-form.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  searchList: Search[] = [
    {
      kind: "text",
      label: "팀이름",
      value: "pulsar"
    },
    {
      kind: "select",
      label: "유형",
      selectValues: ["A", "B", "C"],
      value: ""
    },
    {
      kind: "popup",
      label: "부서",
      url: "abbb/sss",
      value: ""
    },
    {
      kind: "date",
      label: "활동날짜",
      selectDates: ["2019-05-14", "2019-05-16"],
      value: ""
    },
    {
      kind: "date",
      label: "활동날짜",
      selectDates: ["2019-05-11", "2019-05-12"],
      value: ""
    }
  ];

  dataSource = new MatTableDataSource<Team>();
  displayedColumns: string[] = ['select', 'id', 'name'];

  // MatPaginator Inputs
  pageInfo: PageInfo;
  length: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor( public dialog: MatDialog, private teamService: TeamService) {
      this.pageInfo = new PageInfo(0, 5, "asc", "id");
  }

  selectDataList(searchReqList: Search[]) {
    console.log(searchReqList);
  }


  // 목록 불러오기 - 서비스 호출
  findAll() {
    this.teamService.findAll(this.pageInfo).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // 페이징
  pageChange(pageEvent: PageEvent) {
    this.pageInfo.pNo = pageEvent.pageIndex;
    this.pageInfo.pSize = pageEvent.pageSize;
    this.findAll();
  }

  // 정렬
  sortData(sort: Sort) {
    this.pageInfo.dir = sort.direction;
    this.pageInfo.key = sort.active;
    this.findAll();
  }

  // 조회
  openGet() {
    const dialogRef = this.dialog.open(TeamFormComponent, {
      width: '400px',
      height: '200px',
      data: {name: "", animal: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }  
 
  // 버튼 - 생성
  openForm() {
    const dialogRef = this.dialog.open(TeamFormComponent, {
      width: '400px',
      height: '200px',
      data: {name: "", animal: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  // 버튼 - 삭제
  openDelete() {

  }
  
  ngOnInit() {
    this.findAll();
    this.teamService.getCount().subscribe(data => {
      this.length = data;
    });
  }
}
