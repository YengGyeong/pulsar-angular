import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';

import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { PageInfo } from '../../../common/model/page-info';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'team'];

  // MatPaginator Inputs
  pageInfo: PageInfo;
  length: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    public dialog: MatDialog,
    private userService: UserService) {
      this.pageInfo = new PageInfo(0, 5, "asc", "id");
  }

  ngOnInit() {
    this.findAll();
    this.userService.getCount().subscribe(data => {
      this.length = data;
    });
  }

  // 목록 불러오기 - 서비스 호출
  findAll() {
    this.userService.findAll(this.pageInfo).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // 페이징
  paginate(pageEvent: PageEvent) {
    this.pageInfo.pNo = pageEvent.pageIndex;
    this.pageInfo.pSize = pageEvent.pageSize;
    this.findAll();
  }

  // 정렬
  sortData(sort: Sort) {
    this.pageInfo.dir = sort.direction;
    this.pageInfo.key = sort.active;
    this.findAll();
  }

  // 조회
  openGet(user: User) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: '600px',
      height: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }  
 
  // 버튼 - 생성
  openForm() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      height: '300px',
      data: {state: "add", user: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  // 버튼 - 삭제
  openDelete() {

  }
  
}
