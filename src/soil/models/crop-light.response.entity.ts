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
        cropId: number = 0,
        cropName: string = '',
        userId: number = 0,
        temperature: number = 0,
        humidity: number = 0,
        waterAmountRemaining: number = 0,
        irrigationStartTime: string = '',
        irrigationDurationInMinutes: number = 0,
        irrigationStatus: string = ''
    ) {
        this.cropId = cropId;
        this.cropName = cropName;
        this.userId = userId;
        this.temperature = temperature;
        this.humidity = humidity;
        this.waterAmountRemaining = waterAmountRemaining;
        this.irrigationStartTime = irrigationStartTime;
        this.irrigationDurationInMinutes = irrigationDurationInMinutes;
        this.irrigationStatus = irrigationStatus;
    }
}