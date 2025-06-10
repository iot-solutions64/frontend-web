export class CropRequest {
    name: string;
    userId: number;
    waterTankId: number;
    temperatureMinThreshold: number;
    temperatureMaxThreshold: number;
    humidityMinThreshold: number;
    humidityMaxThreshold: number;
    hourFrequency: number;
    irrigationStartDate: string; // ISO format (YYYY-MM-DD)
    irrigationStartTime: string; // HH:mm:ss
    irrigationDisallowedStartTime: string; // HH:mm:ss
    irrigationDisallowedEndTime: string; // HH:mm:ss
    irrigationDurationInMinutes: number;
    irrigationMaxWaterUsage: number;

    constructor(data: CropRequest) {
        this.name = data.name;
        this.userId = data.userId;
        this.waterTankId = data.waterTankId;
        this.temperatureMinThreshold = data.temperatureMinThreshold;
        this.temperatureMaxThreshold = data.temperatureMaxThreshold;
        this.humidityMinThreshold = data.humidityMinThreshold;
        this.humidityMaxThreshold = data.humidityMaxThreshold;
        this.hourFrequency = data.hourFrequency;
        this.irrigationStartDate = data.irrigationStartDate;
        this.irrigationStartTime = data.irrigationStartTime;
        this.irrigationDisallowedStartTime = data.irrigationDisallowedStartTime;
        this.irrigationDisallowedEndTime = data.irrigationDisallowedEndTime;
        this.irrigationDurationInMinutes = data.irrigationDurationInMinutes;
        this.irrigationMaxWaterUsage = data.irrigationMaxWaterUsage;
    }
}