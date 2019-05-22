import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';

import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { PageInfo } from '../../../common/model/page-info';
import { Search } from 'src/app/layout/search-form/search';
import { Observable } from 'rxjs';
import { Team } from '../../team/model/team';
import { UserSearch } from '../model/uesr-search';

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
      kind: "popup",
      label: "팀",
      column: "team",
      value: ""
    },
    {
      kind: "date",
      label: "입사일",
      column : "join",
      selectDates: ["2019-05-14", "2019-05-16"],
      value: "",
      selectValues: []
    },
    {
      kind: "select",
      label: "부서",
      column: "team",
      selectValues: ["영업팀", "개발팀", "인사팀"],
      //selectUrl: "/searchTeamNameList",
      value: ""
    }
  ];

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'join', 'team'];

  // MatPaginator Inputs
  pageInfo: PageInfo;
  length: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  search: UserSearch = new UserSearch();

  constructor(
    public dialog: MatDialog,
    private userService: UserService) {
      this.pageInfo = new PageInfo(0, 5, "asc", "id");
  }

  ngOnInit() {
    this.getUsers();

    this.userService.getCount(this.search).subscribe(data => {
      this.length = data;
    });
  }

  // 목록 불러오기 - 서비스 호출
  getUsers() {
    

    // this.userService.getUsers(this.pageInfo).subscribe(data => {
    //   this.dataSource.data = data;
    //   console.log(data);
    // });
    let userSearch: UserSearch = this.getSearchDataSetting(this.searchList);
    this.userService.findByConditions(this.pageInfo, userSearch).subscribe(data => {
      this.dataSource.data = data;
    });
    this.userService.getCount(userSearch).subscribe(data => {
      this.length = data;
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
    this.searchList = searchReqList;

    this.getUsers();
  }

  getSearchDataSetting(searchList: Search[]) : UserSearch{
    let search = new UserSearch();
    //user.id = 0;
    search.name = searchList[0].value;
    search.startDate = (searchList[2] != undefined)? searchList[2].selectValues[0] : "1970-01-01";
    
    if(searchList[2] == undefined) {
      const dateObj = new Date();
      const today = dateObj.getFullYear() + "-" + dateObj.getMonth()+1 + "-" + dateObj.getDate();
      search.endDate = today;
    } else {
      search.endDate = searchList[2].selectValues[1];
    }
    
    search.teamId = 1;

    return search;
  }

}
