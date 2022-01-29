export interface IEventList {
    EventName: IEventType,
    Start: string,
    End: string,
    Fields?: IFields[],
}
export interface IFields {
    ID: number,
    Value: number,
    CycleInSeconds: number,
    Icon: string
}
export interface INeedToAdd {
    ID: number,
    needToAdd: number,
    distance: number
}
export type IEventType = 'NewYear' | 'ValentinesDay';
export type ITimeType = 'Start' | 'End';

export interface IAdventure {
    name: string,
    icon: string,
    percent70: number,
    percent30: number,
    description: string,
    needToFinish?: string,
    loot?: string
  }
