export class HumidityRequest {
    humidity: number;
    humidityMinThreshold: number;
    humidityMaxThreshold: number;

    constructor(humidity: 0, humidityMinThreshold: 0, humidityMaxThreshold: 0) {
        this.humidity = humidity;
        this.humidityMinThreshold = humidityMinThreshold;
        this.humidityMaxThreshold = humidityMaxThreshold;
    }
}