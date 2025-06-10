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
        cropId: 0,
        cropName: "",
        userId: 0,
        temperature: 0,
        humidity: 0,
        waterAmountRemaining: 0,
        irrigationStartTime: "",
        irrigationDurationInMinutes: 0,
        irrigationStatus: ""
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