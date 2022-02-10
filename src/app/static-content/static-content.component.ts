import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-content',
  templateUrl: './static-content.component.html',
  styleUrls: ['./static-content.component.scss']
})
export class StaticContentComponent implements OnInit {

  class: string = 'static-content';

  constructor() { }

  ngOnInit(): void {
  }

}
