export class CropDetailedResponse {
    cropId: number;
    cropName: string;
    userId: number;
    temperature: number;
    temperatureMinThreshold: number;
    temperatureMaxThreshold: number;
    temperatureStatus: string;
    humidity: number;
    humidityMinThreshold: number;
    humidityMaxThreshold: number;
    humidityStatus: string;
    waterTankName: string;
    waterAmountRemaining: number;
    maxWaterCapacity: number;
    waterTankStatus: string;
    irrigationHourFrequency: number;
    irrigationStartDate: string; // YYYY-MM-DD
    irrigationStartTime: string; // HH:mm:ss
    irrigationDisallowedStartTime: string; // HH:mm:ss
    irrigationDisallowedEndTime: string; // HH:mm:ss
    irrigationDurationInMinutes: number;
    irrigationStatus: string;
    irrigationMaxWaterUsage: number;

    constructor(
        cropId: number,
        cropName: string,
        userId: number,
        temperature: number,
        temperatureMinThreshold: number,
        temperatureMaxThreshold: number,
        temperatureStatus: string,
        humidity: number,
        humidityMinThreshold: number,
        humidityMaxThreshold: number,
        humidityStatus: string,
        waterTankName: string,
        waterAmountRemaining: number,
        maxWaterCapacity: number,
        waterTankStatus: string,
        irrigationHourFrequency: number,
        irrigationStartDate: string,
        irrigationStartTime: string,
        irrigationDisallowedStartTime: string,
        irrigationDisallowedEndTime: string,
        irrigationDurationInMinutes: number,
        irrigationStatus: string,
        irrigationMaxWaterUsage: number
    ) {
        this.cropId = cropId;
        this.cropName = cropName;
        this.userId = userId;
        this.temperature = temperature;
        this.temperatureMinThreshold = temperatureMinThreshold;
        this.temperatureMaxThreshold = temperatureMaxThreshold;
        this.temperatureStatus = temperatureStatus;
        this.humidity = humidity;
        this.humidityMinThreshold = humidityMinThreshold;
        this.humidityMaxThreshold = humidityMaxThreshold;
        this.humidityStatus = humidityStatus;
        this.waterTankName = waterTankName;
        this.waterAmountRemaining = waterAmountRemaining;
        this.maxWaterCapacity = maxWaterCapacity;
        this.waterTankStatus = waterTankStatus;
        this.irrigationHourFrequency = irrigationHourFrequency;
        this.irrigationStartDate = irrigationStartDate;
        this.irrigationStartTime = irrigationStartTime;
        this.irrigationDisallowedStartTime = irrigationDisallowedStartTime;
        this.irrigationDisallowedEndTime = irrigationDisallowedEndTime;
        this.irrigationDurationInMinutes = irrigationDurationInMinutes;
        this.irrigationStatus = irrigationStatus;
        this.irrigationMaxWaterUsage = irrigationMaxWaterUsage;
    }
}