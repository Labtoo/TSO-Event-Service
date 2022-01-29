import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {DataService} from 'src/app/system/services/data.service';
import {IEventType, IFields, IEventList, INeedToAdd} from '../system/interface/interface';
import {EventList} from '../config/events.config';
import {FormControl, FormGroup} from '@angular/forms';
import {MainService} from 'src/app/system/services/main.service';

@Component({
  selector: 'app-resource-fileds-list',
  templateUrl: './resource-fileds-list.component.html',
  styleUrls: ['./resource-fileds-list.component.scss']
})
export class ResourceFiledsListComponent implements OnInit, OnChanges, AfterViewInit {

  public class: string = "resources-fields-list";
  public fieldsArray: IFields[] = this.getFields('ValentinesDay');
  needToAddObject:INeedToAdd[] = [];
  overalNeedToAdd: number;
  public multiplier: number[] = [1,4,6,8];
  public isPud: boolean = true;

  overalForm = new FormGroup({
    groupMultiplier: new FormControl(this.multiplier[3]),
    groupPudChecker: new FormControl(this.isPud),
  });

  constructor(private dataService: DataService,
    private mainService: MainService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    this.subscribeToFormChanges();
  }

  subscribeToFormChanges() {
    this.overalForm.valueChanges.subscribe(() => {
      this.updateFields();
    });
  }

  updateFields() {
    this.isPud = this.overalForm.get('groupPudChecker')?.value;
    if (this.isPud) {
      this.multiplier = [1,4,6,8];
    } else {
      this.multiplier = [1,2,3,4];
    }
    //this.calcValues();
  }

  getFields(event:IEventType) {
    let FieldsArray: IFields[] = [];
    EventList.forEach(element => {
      if (element.EventName === event) {
        element.Fields?.forEach(field => {
          FieldsArray.push(field)
        })
      }
    });
    return FieldsArray;
  }

  takeOutput(item: INeedToAdd) {
    this.overalNeedToAdd = 0;
    if(!this.needToAddObject.find(obj => obj.ID === item.ID)) {
      this.needToAddObject.push(item);
    } else {
      this.needToAddObject.find( (obj,index) => {
        if (obj.ID === item.ID) {
          this.needToAddObject[index] = item;
        }
      })
    }
    this.needToAddObject.forEach(element => {
      this.overalNeedToAdd += element.needToAdd;
    });
    this.mainService.setOveralNeedToAdd(this.overalNeedToAdd);
  }

}
