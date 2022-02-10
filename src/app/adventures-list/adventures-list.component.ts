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
})
export class AdventuresListComponent implements OnInit, AfterViewInit {

  class = 'adventures-list';
  overalNeedToAdd: number = 0;
  isValentine: boolean = false;
  isPremium: boolean = false;
  columnsHeader = ['icon', 'name', 'loot', 'needToFinish', 'guide'];
  expandedElement: IAdventure | null;
  adventureList: IAdventure [];
  headerText: string;

  buffForm = new FormGroup({
    valentine: new FormControl(this.isValentine),
    premium: new FormControl(this.isPremium),
  });

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.overalNeedToAdd$.subscribe((val) => {
      this.overalNeedToAdd = val;
      this.prepareTableData();
    });
    this.subscribeToFormChanges();
    this.calcValues();
  }

  ngAfterViewInit(): void {
      
  }

  prepareTableData() {
    this.adventureList.forEach(element => {
      element.needToFinish = 'от ' + Math.floor(this.overalNeedToAdd / element.percent30) 
        + ' до ' + Math.floor(this.overalNeedToAdd / element.percent70);
      element.loot = '' + element.percent70 + ' / ' + element.percent30;
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
        element.percent30 = Math.round(element.percent30 * 1.5);
        element.percent70 = Math.round(element.percent70 * 1.5);
      });
    }
    if (this.isValentine && this.isPremium) {
      this.adventureList.forEach(element => {
        element.percent30 = Math.round(element.percent30 * 3 * 1.5);
        element.percent70 = Math.round(element.percent70 * 3 * 1.5);
      });
    }
  }

}
