import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { MatDialog } from '@angular/material';

import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { PageInfo } from '../../../common/model/page-info';
import { Search } from 'src/app/layout/search-form/search';
import { UserSearch } from '../model/uesr-search';
import { PopupComponent } from 'src/app/layout/common/popup/popup.component';


@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

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
      column: "name",
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

  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'join', 'team'];
  tableHeaders: string[] = ['ID', '부서명'];
  pageInfo: PageInfo;
  length: number;
  list: User[];
  search: UserSearch = new UserSearch();

  constructor(
    public dialog: MatDialog,
    private userService: UserService) {
      this.pageInfo = new PageInfo(0, 5, "asc", "id");
  }

  ngOnInit() {
    this.getUsers();
  }

  userListEventHandler(event: any) {
    if(event instanceof PageInfo) {
      this.pageInfo = event;
      this.getUsers();
    } else {
      if(event.state === "openGet") {
        this.openGet(this.list[event.idx]);
      }
    }
  }

  // 목록 불러오기 - 서비스 호출
  getUsers() {

    let userSearch: UserSearch = this.getSearchDataSetting(this.searchList);
    this.userService.getUsers(this.pageInfo, userSearch).subscribe(data => {
      this.list = data;
    });
    this.userService.getCount(userSearch).subscribe(data => {
      this.length = data;
    });
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
    this.openDialog("유저삭제","정말 삭제하시겠습니까?", id);
  }  

  openDialog(tit: string, mess: string, id: number): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '350px',
      height: '200px',
      data: {
        title: tit,
        message: mess
      }
    }); 

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Y')
        this.userService.deleteUser(id).subscribe(data => {
          this.length -= 1;
          this.getUsers();
        });
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
    if(searchList[2].selectValues.length == 0){
      search.startDate = "1970-01-01";
      const dateObj = new Date();
      search.endDate = dateObj.getFullYear() + "-" + ((dateObj.getMonth()+1)<10 ? '0'+ (dateObj.getMonth()+1) : (dateObj.getMonth()+1))+ "-" + dateObj.getDate();
    } else {
      search.startDate = searchList[2].selectValues[0];
      search.endDate = searchList[2].selectValues[1];
    }
    search.teamId = Number(searchList[3].value);
    return search;
  }
}
