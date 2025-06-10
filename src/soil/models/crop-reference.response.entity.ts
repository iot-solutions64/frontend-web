export class CropReferenceResponse {
    cropId: number;
    userId: number;
    temperatureId: number;
    humidityId: number;
    waterTankId: number;
    cropName: string;

    constructor(
        cropId: 0,
        userId: 0,
        temperatureId: 0,
        humidityId: 0,
        waterTankId: 0,
        cropName: ""
    ) {
        this.cropId = cropId;
        this.userId = userId;
        this.temperatureId = temperatureId;
        this.humidityId = humidityId;
        this.waterTankId = waterTankId;
        this.cropName = cropName;
    }
}