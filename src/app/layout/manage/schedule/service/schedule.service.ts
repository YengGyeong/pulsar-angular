import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageInfo } from '../../../common/model/page-info';
import { Schedule } from '../model/schedule';
import { ScheduleSearch } from '../model/schedule-search';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private schedulesUrl: string;

  constructor(private http: HttpClient) {
    this.schedulesUrl = 'http://localhost:8080/schedules';
  }

  public getSchedules(pageInfo: PageInfo, search: ScheduleSearch): Observable<any[]> {
    let params = new HttpParams()
      .set('pNo', pageInfo.pNo.toString())
      .set('pSize', pageInfo.pSize.toString())
      .set('dir', pageInfo.dir)
      .set('key', pageInfo.key);

    Object.keys(search).forEach(function (key) {
      params = params.append(key, search[key]);
    })

    return this.http.get<Schedule[]>(this.schedulesUrl, {params});
  }

  public getCount(search: ScheduleSearch) {
    let params = new HttpParams();
    Object.keys(search).forEach(function (key) {
      params = params.append(key, search[key]);
    })

    return this.http.get<number>(this.schedulesUrl + "/count", {params});
  }

  public getSchedule(trgId: string) {
    return this.http.get<Schedule>(this.schedulesUrl + "/" + trgId);
  }

  public addSchedule(schedule: Schedule) {
    return this.http.post<Schedule>(this.schedulesUrl, schedule);
  }

  public updateSchedule(schedule: Schedule) {
    return this.http.put<Schedule>(this.schedulesUrl, schedule);
  }

  public deleteSchedule(trgId: string) {
    return this.http.delete<Schedule>(this.schedulesUrl + "/" + trgId);
  }

  public runOnce(schedule: Schedule) {
    return this.http.get(this.schedulesUrl + "/runOnce/" + schedule.trgGroup + "/" + schedule.trgId);
  }

  public resume(schedule: Schedule) {
    return this.http.get(this.schedulesUrl + "/resume/" + schedule.trgGroup + "/" + schedule.trgId);
  }

  public resumeAll(group: string) {
    return this.http.get(this.schedulesUrl + "/resumeAll/" + group);
  }

  public pause(schedule: Schedule) {
    return this.http.get(this.schedulesUrl + "/pause/" + schedule.trgGroup + "/" + schedule.trgId);
  }

  public pauseAll(group: string) {
    return this.http.get(this.schedulesUrl + "/pauseAll/" + group);
  }


}
