import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../model/team';
import { PageInfo } from '../../../common/model/page-info';
import { TeamSearch } from '../model/team-searach';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsUrl: string;

  constructor(private http: HttpClient) {
    this.teamsUrl = 'http://localhost:8080/teams';
  }

  public getTeams(pageInfo: PageInfo, search: TeamSearch): Observable<any[]> {
    let params = new HttpParams()
      .set('pNo', pageInfo.pNo.toString())
      .set('pSize', pageInfo.pSize.toString())
      .set('dir', pageInfo.dir)
      .set('key', pageInfo.key);

    Object.keys(search).forEach(function (key) {
      params = params.append(key, search[key]);
    })

    return this.http.get<Team[]>(this.teamsUrl, {params});
  }
  
  public getCount(search: TeamSearch) {
    let params = new HttpParams();
    Object.keys(search).forEach(function (key) {
      params = params.append(key, search[key]);
    })
    return this.http.get<number>(this.teamsUrl + "/count", {params});
  }

  public getTeam(id: number) {
    return this.http.get<Team>(this.teamsUrl + "/" + id);
  }

  public addTeam(team: Team) {
    return this.http.post<Team>(this.teamsUrl, team);
  }

  public updateTeam(team: Team) {
    return this.http.put<Team>(this.teamsUrl, team);
  }

  public deleteTeams(teams: Team[]) {
    //return this.http.delete<Team>(this.teamsUrl);
  }

  public deleteTeam(id: number) {
    return this.http.delete<Team>(this.teamsUrl + "/" + id);
  }
  
}
