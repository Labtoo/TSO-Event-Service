import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {EventList} from '../../config/events.config';
import {IEventType, IFields, IEventList, ITimeType} from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endTime:   Date = new Date('01.20.2022 17:20');
  startTime: Date = new Date('01.01.2022 11:00');

  constructor(private http: HttpClient) { }

  getCurrentTime(): Observable<any> {
    return this.http.get('http://worldtimeapi.org/api/timezone/Europe/Moscow')
    .pipe(catchError(
      (error) => {
        console.log(error);
        return throwError('Cant get time');
      }
    ));
  }

  getEventList():IEventList[] {
    let fullEventlist: IEventList[] = [];
    EventList?.forEach(elem => {
      fullEventlist.push(elem);
    })
    return fullEventlist;
  }

}
