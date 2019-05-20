import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Team } from '../model/team';
import { TeamService } from '../service/team.service';
import { TeamFormComponent } from '../team-form/team-form.component';
import { PageInfo } from '../../../common/model/page-info';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

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
  

}


