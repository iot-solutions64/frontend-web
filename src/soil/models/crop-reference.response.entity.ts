export class CropReferenceResponse {
    cropId: number;
    userId: number;
    temperatureId: number;
    humidityId: number;
    waterTankId: number;
    cropName: string;

    constructor(
        cropId: number,
        userId: number,
        temperatureId: number,
        humidityId: number,
        waterTankId: number,
        cropName: string
    ) {
        this.cropId = cropId;
        this.userId = userId;
        this.temperatureId = temperatureId;
        this.humidityId = humidityId;
        this.waterTankId = waterTankId;
        this.cropName = cropName;
    }
}