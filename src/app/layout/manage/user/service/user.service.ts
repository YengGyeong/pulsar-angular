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

  public getUsers(pageInfo: PageInfo): Observable<any[]> {
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

  public findByConditions(pageInfo: PageInfo, searchList: Search[]): Observable<any[]> {

    const params = new HttpParams()
      .set('pNo', pageInfo.pNo.toString())
      .set('pSize', pageInfo.pSize.toString())
      .set('dir', pageInfo.dir)
      .set('key', pageInfo.key)
      .set('name', "J");

    return this.http.get<User[]>(this.usersUrl + "/select", {params});
  }

}
