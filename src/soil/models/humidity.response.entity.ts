export class HumidityResponse {
    humidity: number;
    humidityMinThreshold: number;
    humidityMaxThreshold: number;
    humidityStatus: string;

    constructor(humidity: number, humidityMinThreshold: number, humidityMaxThreshold: number, humidityStatus: string) {
        this.humidity = humidity;
        this.humidityMinThreshold = humidityMinThreshold;
        this.humidityMaxThreshold = humidityMaxThreshold;
        this.humidityStatus = humidityStatus;
    }
}