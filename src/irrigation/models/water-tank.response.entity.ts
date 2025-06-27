export class WaterTankResponse {
    name: string;
    waterAmountRemaining: number;
    maxWaterCapacity: number;
    status: string;

    constructor(name: string, waterAmountRemaining: number, maxWaterCapacity: number, status: string) {
        this.name = name;
        this.waterAmountRemaining = waterAmountRemaining;
        this.maxWaterCapacity = maxWaterCapacity;
        this.status = status;
    }
}