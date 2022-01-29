import { Injectable } from '@angular/core';
import {DataService} from 'src/app/system/services/data.service';
import {IEventType, ITimeType} from '../interface/interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  storeAndShareTime: number;
  overalNeedToAdd$ = new Subject<number>();

  constructor(private dataService: DataService) { }

  public setOveralNeedToAdd (val: number) {
    this.overalNeedToAdd$.next(val);
  }

  getCurrentAPITime(): number {
    let currentTime:Date = new Date;
    let response: any;
    this.dataService.getCurrentTime()
      .subscribe(
        (res) => {
          response = res;
          currentTime = response.datetime;
        },
        (error) => {
          console.error('Request failed with error')
          //this.loading = false;
        },
        () => {
          //this.loading = false;
        });
    return currentTime.getTime();
  }

  getEventTime(event:IEventType, time:ITimeType): Date {
    let result: string = '';
    this.dataService.getEventList().forEach(element => {
      if (element.EventName === event) {
        result = element[time];
      } 
    });
    return new Date(result);
  }

  getOveralEventTime(event:IEventType) {
    return this.getEventTime(event,'End').getTime()
           - this.getEventTime(event,'Start').getTime();
  }

  // public get overalEventTime():number {
  //   let startTime:Date = this.dataService.toStartTime();
  //   let endTime:Date = this.dataService.toEndTime();
  //   return endTime.getTime() - startTime.getTime(); 
  // }

  getTimeLeft(event:IEventType):number {
    let currentTime = this.storeAndShareTime;
    let endTime = this.getEventTime(event,'End').getTime()
    return endTime - currentTime;
  }

  getTimeLeftInSeconds(event:IEventType):number {
    let currentTime = this.storeAndShareTime;
    let endTime = this.getEventTime(event,'End').getTime()
    return Math.round((endTime - currentTime) / 1000);
  }

  // public get minutesTotal () {
  //   return this.timeLeft / 60000;
  // }

  // public get secondsTotal () {
  //   return this.timeLeft / 1000;
  // }

  // public get minutes() {
  //   return Math.round(this.timeLeft / 60000 % 60);
  // }

  // public get hours() {
  //   return Math.round(this.timeLeft / 3600000 % 24);
  // }

  // public get days() {
  //   return Math.round(this.timeLeft / 86400000);
  // }





}
