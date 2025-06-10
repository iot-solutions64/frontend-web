export class TemperatureResponse {
    temperature: number;
    temperatureMinThreshold: number;
    temperatureMaxThreshold: number;
    temperatureStatus: string;

    constructor(temperature: 0, temperatureMinThreshold: 0, temperatureMaxThreshold: 0, temperatureStatus: "") {
        this.temperature = temperature;
        this.temperatureMinThreshold = temperatureMinThreshold;
        this.temperatureMaxThreshold = temperatureMaxThreshold;
        this.temperatureStatus = temperatureStatus;
    }
}