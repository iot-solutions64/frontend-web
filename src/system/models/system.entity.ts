import { Subsystem } from "./subsystem.entity";

export class System {
    id: number;
    cropId: number;
    batteryLevel: number;
    subsystems: Subsystem[];

    constructor(
        id: number = 0,
        cropId: number = 0,
        batteryLevel: number = 0,
        subsystems: Subsystem[] = []
    ) {
        this.id = id;
        this.cropId = cropId;
        this.batteryLevel = batteryLevel;
        this.subsystems = subsystems;
    }
}
