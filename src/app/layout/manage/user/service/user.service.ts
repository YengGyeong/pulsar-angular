import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { PageInfo } from '../../../common/model/page-info';
import { Search } from 'src/app/layout/search-form/search';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(pageInfo: PageInfo): Observable<any[]> {
    const params = new HttpParams()
      .set('pNo', pageInfo.pNo.toString())
      .set('pSize', pageInfo.pSize.toString())
      .set('dir', pageInfo.dir)
      .set('key', pageInfo.key);

    return this.http.get<User[]>(this.usersUrl, {params});
  }

  public getCount() {
    return this.http.get<number>(this.usersUrl + "/count");
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
  
  public findByConditions(pageInfo: PageInfo, searchList: Search[]): Observable<any[]> {

    let map = new Map<string, string>();

    map.set('pNo', pageInfo.pNo.toString());
    map.set('pSize', pageInfo.pSize.toString());
    map.set('dir', pageInfo.dir);
    map.set('key', pageInfo.key);

    for(let i=0; i<searchList.length; i++) {
      if(searchList[i].kind == "text" || searchList[i].kind == "select")
        map.set(searchList[i].column, searchList[i].value);
      else if(searchList[i].kind == "date") {
        map.set("startDate", searchList[i].selectValues[0]);
        map.set("endDate", searchList[i].selectValues[1]);
      }
    }

    //map.set('name', )

    const params = new HttpParams()
      .set('pNo', pageInfo.pNo.toString())
      .set('pSize', pageInfo.pSize.toString())
      .set('dir', pageInfo.dir)
      .set('key', pageInfo.key);

    return this.http.get<User[]>(this.usersUrl + "/select", {params});
  }

}
