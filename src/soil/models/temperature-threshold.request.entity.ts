export class TemperatureThresholdRequest {
    temperatureMinThreshold: number;
    temperatureMaxThreshold: number;

    constructor(temperatureMinThreshold: 0, temperatureMaxThreshold: 0) {
        this.temperatureMinThreshold = temperatureMinThreshold;
        this.temperatureMaxThreshold = temperatureMaxThreshold;
    }
}