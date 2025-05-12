export class Humidity {
    id: number;
    humidity: number;
    maxThreshold: number;
    minThreshold: number;
    status: string;

    constructor(
        id: number = 0,
        humidity: number = 0,
        maxThreshold: number = 0,
        minThreshold: number = 0,
        status: string = ''
    ) {
        this.id = id;
        this.humidity = humidity;
        this.maxThreshold = maxThreshold;
        this.minThreshold = minThreshold;
        this.status = status;
    }
}