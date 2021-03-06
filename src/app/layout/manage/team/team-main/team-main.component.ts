import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Team } from '../model/team';
import { TeamService } from '../service/team.service';
import { TeamDetailComponent } from '../team-detail/team-detail.component';
import { TeamFormComponent } from '../team-form/team-form.component';
import { PageInfo } from '../../../common/model/page-info';
import { Search } from 'src/app/layout/search-form/search';
import { TeamSearch } from '../model/team-searach';

@Component({
  selector: 'app-team-main',
  templateUrl: './team-main.component.html',
  styleUrls: ['./team-main.component.css']
})
export class TeamMainComponent implements OnInit {

  searchList: Search[] = [
    {
      kind: "text",
      label: "팀번호",
      column: 'id',
      value: ""
    },
    {
      kind: "text",
      label: "팀이름",
      column: 'name',
      value: ""
    }
    
  ];

  displayedColumns: string[] = ['select', 'id', 'name'];
  tableHeaders: string[] = ['ID', '부서명'];
  pageInfo: PageInfo=new PageInfo(0, 5, "asc", "id");
  length: number;
  list: Team[];

  constructor(
    public dialog: MatDialog,
    private teamService: TeamService) {
  }

  ngOnInit() {
    this.getTeams();
  }

  // 목록 불러오기 - 서비스 호출
  getTeams() {

    let teamSearch: TeamSearch = this.getSearchDataSetting(this.searchList);
    this.teamService.getTeams(this.pageInfo, teamSearch).subscribe(data => {
      this.list = data;
    });
    this.teamService.getCount(teamSearch).subscribe(data => {
      this.length = data;
    });
  }

  teamListEventHandler(event: any) {

    if(event instanceof PageInfo) {
      this.pageInfo = event;
      this.getTeams();

    } else {
      if(event.state === "openGet") {
        this.openGet(this.list[event.idx]);
      }
    }
  }

  // 조회
  openGet(team: Team) {
    const dialogRef = this.dialog.open(TeamDetailComponent, {
      width: '600px',
      height: '400px',
      data: team
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "openUpdate") {
        this.openUpdate(team);
      } else if (result === "openDelete") {
        this.openDelete(team.id);
      }
    });
  }  

  // 버튼(조회) - 수정
  openUpdate(team: Team) {
    const dialogRef = this.dialog.open(TeamFormComponent, {
      width: '400px',
      height: '300px',
      data: {state: "update", team: team}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.teamService.updateTeam(result).subscribe(data => {
          this.getTeams();
        });
      }
    });
  } 

  // 버튼(조회) - 삭제
  openDelete(id: number) {
    if(confirm("정말 삭제하시겠습니까?")) {
      this.teamService.deleteTeam(id).subscribe(data => {
        this.length -= 1;
        this.getTeams();
      });
    }
  }  

  // 버튼 - 생성
  openForm() {
    const dialogRef = this.dialog.open(TeamFormComponent, {
      width: '400px',
      height: '300px',
      data: {state: "add", team: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.teamService.addTeam(result).subscribe(data => {
          this.length += 1;
          this.getTeams();
        });
      }
    });
  }

  // 버튼 - 삭제
  deleteChecked() {
    // 체크박스 선택 모두 삭제
  }

  selectDataList(searchReqList: Search[]) {
    this.searchList = searchReqList;
    this.getTeams();
  }

  getSearchDataSetting(searchList: Search[]) : TeamSearch{
    let search = new TeamSearch();
    
    search.id = Number(searchList[0].value);
    search.name = searchList[1].value;

    return search;
  }
}