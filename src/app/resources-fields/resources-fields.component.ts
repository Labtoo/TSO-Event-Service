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
  public distance: number = 12;
  public eventLength: number = 0;
  public income: number = 0;

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
    //need to add
    this.cyclesLeft = Math.round(this.mainService.getTimeLeftInSeconds('ValentinesDay') 
    / (this.cycleInSeconds + this.distance));
    if ((this.cyclesLeft - this.value) > 0) {
      this.needToAddValue = this.cyclesLeft - this.value;
    } else {
      this.needToAddValue = 0;
    }
    //pud

    //income
    this.income = this.needToAddValue * this.resourceForm.get('fieldMultiplier')?.value;
    //create object
    this.needToAddObject = {
      ID: this.fieldForm.ID,
      needToAdd: this.needToAddValue,
      distance: this.distance
    }
    //emit
    this.needToAdd.emit(this.needToAddObject);

  }

  // getProgBarValue() {
  //   return this.getFieldValue() / this.getNeedToAdd();
  // }

}
