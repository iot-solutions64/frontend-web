export class WaterTankRequest {
    name: string;
    maxWaterCapacity: number;
    userId: number;

    constructor(name: string = "", maxWaterCapacity: number = 0, userId: number = 0) {
        this.name = name;
        this.maxWaterCapacity = maxWaterCapacity;
        this.userId = userId;
    }
}