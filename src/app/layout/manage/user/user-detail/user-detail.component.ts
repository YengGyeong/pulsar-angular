import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../model/user';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  // 버튼 - 수정
  openUpdate() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      height: '300px',
      data: {state: "update", user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  // 버튼 - 삭제
  openDelete() {

  }

}
