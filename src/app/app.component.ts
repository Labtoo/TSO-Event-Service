import { Component } from '@angular/core';

export type EventName = 'newyear' | 'valentine' | "easter" | "summer" | "birthday" | "halloween";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  state: EventName = "valentine";
  value = 'primary';

  get showValentinesDay() {
    return this.state === 'valentine';
  }

  showState(name:EventName) {
    this.state = name;
  }
}
