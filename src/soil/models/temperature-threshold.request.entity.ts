export class TemperatureThresholdRequest {
    temperatureMinThreshold: number;
    temperatureMaxThreshold: number;

    constructor(temperatureMinThreshold: number = 0, temperatureMaxThreshold: number = 0) {
        this.temperatureMinThreshold = temperatureMinThreshold;
        this.temperatureMaxThreshold = temperatureMaxThreshold;
    }
}