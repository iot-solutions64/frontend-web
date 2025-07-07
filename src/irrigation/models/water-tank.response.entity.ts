export class WaterTankResponse {
    id: number;
    name: string;
    waterAmountRemaining: number;
    maxWaterCapacity: number;
    status: string;

    constructor(id: number = 0, name: string = "", waterAmountRemaining: number = 0, maxWaterCapacity: number = 0, status: string = "ERROR") {
        this.id = id;
        this.name = name;
        this.waterAmountRemaining = waterAmountRemaining;
        this.maxWaterCapacity = maxWaterCapacity;
        this.status = status;
    }
}