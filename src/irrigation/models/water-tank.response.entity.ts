export class WaterTankResponse {
    name: string;
    waterAmountRemaining: number;
    maxWaterCapacity: number;
    status: string;

    constructor(name: "", waterAmountRemaining: 0, maxWaterCapacity: 0, status: "") {
        this.name = name;
        this.waterAmountRemaining = waterAmountRemaining;
        this.maxWaterCapacity = maxWaterCapacity;
        this.status = status;
    }
}