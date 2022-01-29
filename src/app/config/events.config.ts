import {IEventType, IFields, IEventList} from '../system/interface/interface';

export const EventList: IEventList[] = [
    {
        EventName: "NewYear",
        Start: "12.01.2022 11:00",
        End: "12.01.2022 11:00"
    },
    {
        EventName: "ValentinesDay",
        Start: "01.19.2022 11:00",
        End: "02.11.2022 17:20",
        Fields: <IFields[]> [
            {
                "ID": 1,
                "Value": 100,
                "CycleInSeconds": 2100,
                "Icon": "flower_farm"
            },
            {
                "ID": 2,
                "Value": 100,
                "CycleInSeconds": 2100,
                "Icon": "flower_farm"
            },
            {
                "ID": 3,
                "Value": 100,
                "CycleInSeconds": 2100,
                "Icon": "flower_farm"
            }
        ]
    }
]
