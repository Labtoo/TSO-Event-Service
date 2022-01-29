import { AfterViewInit, Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MainService} from 'src/app/system/services/main.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AdventureList} from '../config/vday-adventure.config';
import {IEventType, IAdventure, IEventList, INeedToAdd} from '../system/interface/interface';

@Component({
  selector: 'app-adventures-list',
  templateUrl: './adventures-list.component.html',
  styleUrls: ['./adventures-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdventuresListComponent implements OnInit, AfterViewInit {

  class: string = 'adventures-list';
  overalNeedToAdd: number = 0;
  isValentine: boolean = true;
  isPremium: boolean = false;
  columnsHeader = ['icon', 'name', 'loot', 'needToFinish'];
  expandedElement: IAdventure | null;
  adventureList: IAdventure [];

  buffForm = new FormGroup({
    valentine: new FormControl(this.isValentine),
    premium: new FormControl(this.isPremium),
  });

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.overalNeedToAdd$.subscribe((val) => {
      console.log(val);
      this.overalNeedToAdd = val;
      this.prepareTableData();
    });
    this.subscribeToFormChanges();
    this.calcValues();
    console.log('before', this.overalNeedToAdd);
    setTimeout(() => {
      console.log('after', this.overalNeedToAdd);
    }, 3000);
  }

  ngAfterViewInit(): void {
      
  }

  prepareTableData() {
    this.adventureList.forEach(element => {
      element.needToFinish = '' + Math.floor(this.overalNeedToAdd / element.percent70) 
        + '/' + Math.floor(this.overalNeedToAdd / element.percent30);
      element.loot = '' + element.percent70 + '/' + element.percent30;
    });
  }

  subscribeToFormChanges() {
    this.buffForm.valueChanges.subscribe(() => {
      this.updateForm();
      this.prepareTableData();
    });
  }

  updateForm() {
    this.isValentine = this.buffForm.get('valentine')?.value;
    this.isPremium = this.buffForm.get('premium')?.value;
    this.calcValues();
  }

  calcValues() {
    this.adventureList = JSON.parse(JSON.stringify(AdventureList));
    if (this.isValentine && !this.isPremium) {
      this.adventureList.forEach(element => {
        element.percent30 *= 3;
        element.percent70 *= 3;
      });
    }
    if (!this.isValentine && this.isPremium) {
      this.adventureList.forEach(element => {
        element.percent30 = Math.floor(element.percent30 * 1.5);
        element.percent70 = Math.floor(element.percent70 * 1.5);
      });
    }
    if (this.isValentine && this.isPremium) {
      this.adventureList.forEach(element => {
        element.percent30 = Math.floor(element.percent30 * 3 * 1.5);
        element.percent70 = Math.floor(element.percent70 * 3 * 1.5);
      });
    }
  }

}
