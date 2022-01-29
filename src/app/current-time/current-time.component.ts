import {Component, OnInit} from '@angular/core';
import {MainService} from 'src/app/system/services/main.service';

// export interface CurrentTime {
//   datetime: string;
// }

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss']
})
export class CurrentTimeComponent implements OnInit {

  class: string = 'timer';
  currentTime:number = 0;
  endOfEventTime:number = 0;
  timeLeft:string = '';

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  days: number = 0;
  weeks: number = 0;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.storeAndShareTime = this.mainService.getCurrentAPITime();
    //this.timeLeft = this.mainService.getTimeToEndOfEvent();
    //this.endOfEventTime = this.mainService.
    this.assignTimeUnits();
    this.timeLeft = `${this.days} ${this.hours}:${this.minutes}`;
  }

  assignTimeUnits() {
    this.seconds = this.mainService.getTimeLeft('ValentinesDay') / 1000;
    this.minutes = Math.floor(this.seconds / 60 % 60);
    this.hours = Math.floor(this.seconds / 3600 % 24);
    this.days = Math.floor(this.seconds / 86400);
  }
}
