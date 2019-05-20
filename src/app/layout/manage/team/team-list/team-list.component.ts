import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Team } from '../model/team';
import { TeamService } from '../service/team.service';
import { TeamFormComponent } from '../team-form/team-form.component';
import { PageInfo } from '../../../common/model/page-info';
import { Search } from 'src/app/layout/search-form/search';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
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
      value: "B"
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
      value: "",
      selectValues: []
    }
  ];

  displayedColumns: string[] = ['select', 'id', 'name'];
  length: number;
  list: Team[];

  constructor(
    public dialog: MatDialog,
    private teamService: TeamService) {
  }

  ngOnInit() {
    this.findAll(new PageInfo(0, 5, "asc", "id"));
    this.teamService.getCount().subscribe(data => {
      this.length = data;
    });
  }

  pageEventHandler(pageInfo: PageInfo) {
    this.findAll(pageInfo);
  }

  // 목록 불러오기 - 서비스 호출
  findAll(pageInfo: PageInfo) {
    this.teamService.findAll(pageInfo).subscribe(data => {
      this.list = data;
    });
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
  
  selectDataList(searchReqList: Search[]) {
    console.log('받아온 거 '+searchReqList);
  }

}


