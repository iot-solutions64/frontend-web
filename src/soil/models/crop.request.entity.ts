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

    constructor(name: string, userId: number, waterTankId: number, temperatureMinThreshold: number, temperatureMaxThreshold: number, humidityMinThreshold: number, humidityMaxThreshold: number, hourFrequency: number, irrigationStartDate: string, irrigationStartTime: string, irrigationDisallowedStartTime: string, irrigationDisallowedEndTime: string, irrigationDurationInMinutes: number, irrigationMaxWaterUsage: number) {
        this.name = name;
        this.userId = userId;
        this.waterTankId = waterTankId;
        this.temperatureMinThreshold = temperatureMinThreshold;
        this.temperatureMaxThreshold = temperatureMaxThreshold;
        this.humidityMinThreshold = humidityMinThreshold;
        this.humidityMaxThreshold = humidityMaxThreshold;
        this.hourFrequency = hourFrequency;
        this.irrigationStartDate = irrigationStartDate;
        this.irrigationStartTime = irrigationStartTime;
        this.irrigationDisallowedStartTime = irrigationDisallowedStartTime;
        this.irrigationDisallowedEndTime = irrigationDisallowedEndTime;
        this.irrigationDurationInMinutes = irrigationDurationInMinutes;
        this.irrigationMaxWaterUsage = irrigationMaxWaterUsage;
    }
}