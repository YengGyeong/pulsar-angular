import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../model/user';
import { Team } from '../../team/model/team';
import { TeamService } from '../../team/service/team.service';
import { PageInfo } from '../../../common/model/page-info';
import { TeamSearch } from '../../team/model/team-searach';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  state: string;
  user: User;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.state = data.state;
      if(data.user == null) {
        this.user = new User();
        this.user.team = new Team();
      } else {
        this.user = {...data.user};
      }
  }

  // 버튼 - x , 취소
  closeDialog(): void {
    this.dialogRef.close();
  }

  // 버튼 - 검색
  openSelectTeam() {
    const dialogRef = this.dialog.open(SelectTeamDialog, {
      width: '600px',
      height: '400px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("11");
      console.log(result);
      if(result != null) {
        this.user.team = result;
      }
    });    
  }
  
}


@Component({
  selector: 'select-team-dialog',
  templateUrl: 'select-team-dialog.html',
})
export class SelectTeamDialog {

  displayedColumns: string[] = ['id', 'name'];
  tableHeaders: string[] = ['ID', '부서명'];
  pageInfo: PageInfo=new PageInfo(0, 5, "asc", "id");
  length: number;
  list: Team[];

  selectedTeam: Team;

  constructor(
    public dialog: MatDialog,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<SelectTeamDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {
  }

  ngOnInit() {
    this.getTeams();
    let team: TeamSearch = new Team();
    this.teamService.getCount(team).subscribe(data => {
      this.length = data;
    });
  }

  // 목록 불러오기 - 서비스 호출
  getTeams() {
    let team: TeamSearch = new Team();
    this.teamService.getTeams(this.pageInfo, team).subscribe(data => {
      this.list = data;
    });
  }

  teamListEventHandler(event: any) {
    if(event instanceof PageInfo) {
      this.pageInfo = event;
      this.getTeams();
    } else if(Number.isInteger(event)) {
      this.selectedTeam = (event != -1) ? this.list[event] : null;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  selectTeam(): void {
    this.dialogRef.close(this.selectedTeam);
  }

}









