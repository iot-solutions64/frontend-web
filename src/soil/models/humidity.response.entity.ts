export class HumidityResponse {
    humidity: number;
    humidityMinThreshold: number;
    humidityMaxThreshold: number;
    humidityStatus: string;

    constructor(humidity: 0, humidityMinThreshold: 0, humidityMaxThreshold: 0, humidityStatus: "") {
        this.humidity = humidity;
        this.humidityMinThreshold = humidityMinThreshold;
        this.humidityMaxThreshold = humidityMaxThreshold;
        this.humidityStatus = humidityStatus;
    }
}