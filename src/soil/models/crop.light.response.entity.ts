export class CropLightResponse {
    cropId: number;
    cropName: string;
    userId: number;
    temperature: number;
    humidity: number;
    waterAmountRemaining: number;
    irrigationStartTime: string;
    irrigationDurationInMinutes: number;
    irrigationStatus: string;

    constructor(
        cropId: number,
        cropName: string,
        userId: number,
        temperature: number,
        humidity: number,
        waterAmountRemaining: number,
        irrigationStartTime: string,
        irrigationDurationInMinutes: number,
        irrigationStatus: string
    ) {
        this.cropId = cropId;
        this.userId = userId;
        this.temperature = temperature;
        this.humidity = humidity;
        this.cropName = cropName;
        this.waterAmountRemaining = waterAmountRemaining;
        this.irrigationStartTime = irrigationStartTime;
        this.irrigationDurationInMinutes = irrigationDurationInMinutes;
        this.irrigationStatus = irrigationStatus;
    }
}