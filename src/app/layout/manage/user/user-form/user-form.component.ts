import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../model/user';
import { Team } from '../../team/model/team';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  state: string;
  user: User;

  constructor(
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
  openSelect() {
    
  }
  
}
