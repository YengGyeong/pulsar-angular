import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { PageInfo } from '../../../common/model/page-info';
import { Search } from 'src/app/layout/search-form/search';
import { Team } from '../../team/model/team';
import { UserSearch } from '../model/uesr-search';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public getUsers(pageInfo: PageInfo): Observable<any[]> {
    const params = new HttpParams()
      .set('pNo', pageInfo.pNo.toString())
      .set('pSize', pageInfo.pSize.toString())
      .set('dir', pageInfo.dir)
      .set('key', pageInfo.key);

    return this.http.get<User[]>(this.usersUrl, {params});
  }

  public getCount(search: UserSearch) {

    let params = new HttpParams();
    Object.keys(search).forEach(function (key) {
      params = params.append(key, search[key]);
    })
    return this.http.get<number>(this.usersUrl + "/count", {params});
  }
  public getUser(id: number) {
    return this.http.get<User>(this.usersUrl + "/" + id);
  }
  public addUser(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  public updateUser(user: User) {
    return this.http.put<User>(this.usersUrl, user);
  }

  public deleteUsers(users: User[]) {
    //return this.http.delete<User>(this.usersUrl);
  }

  public deleteUser(id: number) {
    return this.http.delete<User>(this.usersUrl + "/" + id);
  }

  public findByConditions(pageInfo: PageInfo, search: UserSearch): Observable<any[]> {

    let params = new HttpParams()
    .set('pNo', pageInfo.pNo.toString())
    .set('pSize', pageInfo.pSize.toString())
    .set('dir', pageInfo.dir)
    .set('key', pageInfo.key);
  
     Object.keys(search).forEach(function (key) {
       params = params.append(key, search[key]);
     })

    return this.http.get<User[]>(this.usersUrl + "/conditions", {params});
  }

}
