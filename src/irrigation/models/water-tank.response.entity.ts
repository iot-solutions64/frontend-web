export class WaterTankResponse {
    id: number;
    name: string;
    waterAmountRemaining: number;
    maxWaterCapacity: number;
    status: string;

    constructor(id: number, name: string, waterAmountRemaining: number, maxWaterCapacity: number, status: string) {
        this.id = id;
        this.name = name;
        this.waterAmountRemaining = waterAmountRemaining;
        this.maxWaterCapacity = maxWaterCapacity;
        this.status = status;
    }
}