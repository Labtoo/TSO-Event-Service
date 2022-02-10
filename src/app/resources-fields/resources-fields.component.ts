import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DataService} from 'src/app/system/services/data.service';
//import {FieldForm} from 'src/app/system/model/field-form.model';
import {MainService} from 'src/app/system/services/main.service';
import {IEventType, IFields, IEventList, INeedToAdd} from '../system/interface/interface';

@Component({
  selector: 'app-resources-fields',
  templateUrl: './resources-fields.component.html',
  styleUrls: ['./resources-fields.component.scss']
})
export class ResourcesFieldsComponent implements OnInit {
  
  @Input() fieldForm: IFields;
  @Output() needToAdd = new EventEmitter();

  public class: string = "resources-fields";
  public value: number = 0;
  public cycleInSeconds: number = 0;
  public distance: number = 24;
  public distanceTooltip: string;
  public eventLength: number = 0;
  public income: number = 0;
  public secondsIn21Days = 1814400;
  public timeToEmpty = 0;
  public timeToEmptyFormated = '';
  public multiplier: number[] = [1,4,6,8];

  public progBarValue: number = 0;
  
  public needToAddValue: number = 0;
  public needToAddObject: INeedToAdd;
  public cyclesLeft: number = 0;
  
  resourceForm = new FormGroup({
    fieldValueInput: new FormControl(),
    fieldDistanceInput: new FormControl(this.distance),
  });
  
  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.value = this.fieldForm.Value;
    this.cycleInSeconds = this.fieldForm.CycleInSeconds;
    this.resourceForm.patchValue({'fieldValueInput': this.value});
    this.updateFields();
    this.subscribeToFormChanges();
    //this.cyclesLeft = this.mainService.
    //console.log('ValentinesDay', 'Start', this.dataService.getEventTime('ValentinesDay', 'Start'));
    //console.log(this.mainService.getTimeLeft('ValentinesDay'));
  }

  subscribeToFormChanges() {
    this.resourceForm.valueChanges.subscribe(() => {
      this.updateFields();
    });
  }

  updateFields() {
    this.value = this.resourceForm.get('fieldValueInput')?.value;
    this.distance = this.resourceForm.get('fieldDistanceInput')?.value;
    this.calcValues();
  }

  calcValues() {
    let fullFieldCycle = this.cycleInSeconds + this.distance;
    //need to add
    this.cyclesLeft = Math.round(this.mainService.getTimeLeftInSeconds('ValentinesDay') 
    / fullFieldCycle);
    if ((this.cyclesLeft - this.value) > 0) {
      this.needToAddValue = this.cyclesLeft - this.value;
    } else {
      this.needToAddValue = 0;
    }
    //time to empty
    this.getTimeToEmpty();
    //income
    this.income = Math.floor(this.secondsIn21Days / fullFieldCycle);
    //create object
    this.needToAddObject = {
      ID: this.fieldForm.ID,
      needToAdd: this.needToAddValue,
      distance: this.distance
    }
    //emit
    this.needToAdd.emit(this.needToAddObject);

  }

  getTimeToEmpty() {
    this.timeToEmpty = this.value * (this.cycleInSeconds + this.distance);
    let hours = '' + Math.floor(this.timeToEmpty / 3600 % 24);
    let days = Math.floor(this.timeToEmpty / 86400);
    if (days === 0) {
      this.timeToEmptyFormated = `${hours} ч.`;  
    } else {
      this.timeToEmptyFormated = `${days} дн. ${hours} ч.`;
    }
    return days;
  }

  getClassOfDistance(time:number): string {
    if (time < 13) {
      this.distanceTooltip = 'Идеально построенная ферма';
      return 'green';
    } else if (time >= 13 && time <= 40) {
      this.distanceTooltip = 'Оптимальное расстояние до склада';
      return 'yellow';
    } else {
      this.distanceTooltip = 'Стоит подумать о перестановке фермы поближе к складу';
      return 'red';
    }
  }

  // getProgBarValue() {
  //   return this.getFieldValue() / this.getNeedToAdd();
  // }

}
