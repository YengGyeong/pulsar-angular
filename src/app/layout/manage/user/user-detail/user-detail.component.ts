import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { User } from '../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) {
  }

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
