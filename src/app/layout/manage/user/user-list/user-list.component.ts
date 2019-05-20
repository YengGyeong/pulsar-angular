import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';

import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { PageInfo } from '../../../common/model/page-info';
import { Search } from 'src/app/layout/search-form/search';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  searchList: Search[] = [
    {
      kind: "text",
      label: "이름",
      column: "name",
      value: ""
    },
    {
      kind: "select",
      label: "부서",
      column: "team",
      selectValues: ["영업팀", "개발팀", "인사팀"],
      //selectUrl: "/searchTeamNameList",
      value: ""
    },
    {
      kind: "popup",
      label: "부서",
      column: "team",
      url: "abbb/sss",
      value: ""
    },
    {
      kind: "date",
      label: "입사일",
      column : "hire_date",
      selectDates: ["2019-05-14", "2019-05-16"],
      value: "",
      selectValues: []
    }
  ];

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'join', 'team'];

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
    this.getUsers();
    this.userService.getCount().subscribe(data => {
      this.length = data;
    });
  }

  // 목록 불러오기 - 서비스 호출
  getUsers() {
    this.userService.getUsers(this.pageInfo).subscribe(data => {
      this.dataSource.data = data;
      console.log(data);
    });
  }

  // 페이징
  paginate(pageEvent: PageEvent) {
    this.pageInfo.pNo = pageEvent.pageIndex;
    this.pageInfo.pSize = pageEvent.pageSize;
    this.getUsers();
  }

  // 정렬
  sortData(sort: Sort) {
    this.pageInfo.dir = sort.direction;
    this.pageInfo.key = sort.active;
    this.getUsers();
  }

  // 조회
  openGet(user: User) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: '600px',
      height: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "openUpdate") {
        this.openUpdate(user);
      } else if (result === "openDelete") {
        this.openDelete(user.id);
      }
    });
  }  

  // 버튼(조회) - 수정
  openUpdate(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      height: '300px',
      data: {state: "update", user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.userService.updateUser(result).subscribe(data => {
          this.getUsers();
        });
      }
    });
  } 

  // 버튼(조회) - 삭제
  openDelete(id: number) {
    if(confirm("정말 삭제하시겠습니까?")) {
      this.userService.deleteUser(id).subscribe(data => {
        this.length -= 1;
        this.getUsers();
      });
    }
  }  

  // 버튼 - 생성
  openForm() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      height: '300px',
      data: {state: "add", user: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
        this.userService.addUser(result).subscribe(data => {
          this.length += 1;
          this.getUsers();
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
    this.userService.findByConditions(this.pageInfo, searchReqList).subscribe(data => {
      this.dataSource.data = data;
    });
    this.userService.getCount().subscribe(data => {
      this.length = data;
    });
  }

}
