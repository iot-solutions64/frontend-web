export class TemperatureRequest {
    temperature: number;
    temperatureMinThreshold: number;
    temperatureMaxThreshold: number;

    constructor(temperature: 0, temperatureMinThreshold: 0, temperatureMaxThreshold: 0) {
        this.temperature = temperature;
        this.temperatureMinThreshold = temperatureMinThreshold;
        this.temperatureMaxThreshold = temperatureMaxThreshold;
    }
}