export class Temperature {
    id: number;
    temperature: number;
    maxThreshold: number;
    minThreshold: number;
    status: string;

    constructor(
        id: number = 0,
        temperature: number = 0,
        maxThreshold: number = 0,
        minThreshold: number = 0,
        status: string = ''
    ) {
        this.id = id;
        this.temperature = temperature;
        this.maxThreshold = maxThreshold;
        this.minThreshold = minThreshold;
        this.status = status;
    }
}