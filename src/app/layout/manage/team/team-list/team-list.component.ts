import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';

import { Team } from '../model/team';
import { TeamService } from '../service/team.service';
import { TeamDetailComponent } from '../team-detail/team-detail.component';
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
      column: 'z',
      value: "pulsar"
    },
    {
      kind: "select",
      label: "유형",
      selectValues: ["A", "B", "C"],
      column: 'z',
      value: "B"
    },
    {
      kind: "popup",
      label: "부서",
      url: "abbb/sss",
      column: 'z',
      value: ""
    },
    {
      kind: "date",
      label: "활동날짜",
      selectDates: ["2019-05-14", "2019-05-16"],
      column: 'z',
      value: "",
      selectValues: []
    }
  ];

  dataSource = new MatTableDataSource<Team>();
  displayedColumns: string[] = ['select', 'id', 'name'];

  // MatPaginator Inputs
  pageInfo: PageInfo;
  length: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    public dialog: MatDialog,
    private teamService: TeamService) {
      this.pageInfo = new PageInfo(0, 5, "asc", "id");
  }

  ngOnInit() {
    this.getTeams();
    this.teamService.getCount().subscribe(data => {
      this.length = data;
    });
  }

  // 목록 불러오기 - 서비스 호출
  getTeams() {
    this.teamService.getTeams(this.pageInfo).subscribe(data => {
      this.dataSource.data = data;
      console.log(data);
    });
  }

  // 페이징
  paginate(pageEvent: PageEvent) {
    this.pageInfo.pNo = pageEvent.pageIndex;
    this.pageInfo.pSize = pageEvent.pageSize;
    this.getTeams();
  }

  // 정렬
  sortData(sort: Sort) {
    this.pageInfo.dir = sort.direction;
    this.pageInfo.key = sort.active;
    this.getTeams();
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
    console.log('받아온 거 '+searchReqList);
  }

}


