export class WaterTankRequest {
    name: string;
    maxWaterCapacity: number;
    userId: number;

    constructor(name: "", maxWaterCapacity: 0, userId: 0) {
        this.name = name;
        this.maxWaterCapacity = maxWaterCapacity;
        this.userId = userId;
    }
}