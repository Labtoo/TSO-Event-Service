import {DataService} from "src/app/system/services/data.service";
import {IEventType, ITimeType} from '../interface/interface';

export class FieldForm {

    constructor(
        public value: number,
        public cycleInSeconds: number,
        public distance: number,
    ) {}

    public get needToAdd() {
        return 0; //this.cyclesLeft - this.fieldValue;
    }

    public get defaultDistance() {
        return 12;
    }

    public get progBarValue() {
        return 0;
    }

    protected get cyclesLeft() {
        return 0; //Math.round(this.eventLength / (this.fieldBaseCycle + this.fieldDistance));
    }

}
