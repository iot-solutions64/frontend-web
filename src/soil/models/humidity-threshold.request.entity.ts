export class HumidityThresholdRequest {
    humidityMaxThreshold: number;
    humidityMinThreshold: number;

    constructor(humidityMinThreshold: number = 0, humidityMaxThreshold: number = 0) {
        this.humidityMinThreshold = humidityMinThreshold;
        this.humidityMaxThreshold = humidityMaxThreshold;
    }
}