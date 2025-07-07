export class WaterCapacityRequest{
    id: number;
    waterAmount: number;

    constructor(id: number = 0, waterAmount: number = 0) {
        this.id = id;
        this.waterAmount = waterAmount;
    }
}