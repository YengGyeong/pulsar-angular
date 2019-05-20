import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team } from '../model/team';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<TeamDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public team: Team) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  // 버튼 - 수정
  openUpdate() {
    this.dialogRef.close("openUpdate");
  }

  // 버튼 - 삭제
  openDelete() {
    this.dialogRef.close("openDelete");
  }

}
