export class TemperatureResponse {
    temperature: number;
    temperatureMinThreshold: number;
    temperatureMaxThreshold: number;
    temperatureStatus: string;

    constructor(temperature: number, temperatureMinThreshold: number, temperatureMaxThreshold: number, temperatureStatus: string) {
        this.temperature = temperature;
        this.temperatureMinThreshold = temperatureMinThreshold;
        this.temperatureMaxThreshold = temperatureMaxThreshold;
        this.temperatureStatus = temperatureStatus;
    }
}