import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team } from '../../team/model/team';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent {

  state: string;
  team: Team;

  constructor(
    public dialogRef: MatDialogRef<TeamFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.state = data.state;
      if(data.team == null) {
        this.team = new Team();
      } else {
        this.team = {...data.team};
      }
  }

  // 버튼 - x , 취소
  closeDialog(): void {
    this.dialogRef.close();
  }

  // 버튼 - 검색
  openSelect() {
    
  }
  
}
