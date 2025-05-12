import { Subsystem } from "./subsystem.entity";

export class System {
    id: number;
    name: string;
    cropId: number;
    batteryLevel: number;
    subsystems: Subsystem[];

    constructor(
        id: number = 0,
        name: string = "",
        cropId: number = 0,
        batteryLevel: number = 0,
        subsystems: Subsystem[] = []
    ) {
        this.id = id;
        this.name = name;
        this.cropId = cropId;
        this.batteryLevel = batteryLevel;
        this.subsystems = subsystems;
    }
}
