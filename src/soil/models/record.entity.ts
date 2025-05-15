export class Record {
    id: number;
    date: string;
    humidity: number;
    humidityStatus: string;
    temperature: number;
    temperatureStatus: string;

    constructor(
        id: number = 0,
        date: string = '',
        humidity: number = 0,
        humidityStatus: string = '',
        temperature: number = 0,
        temperatureStatus: string = ''
    ) {
        this.date = date;
        this.humidity = humidity;
        this.humidityStatus = humidityStatus;
        this.temperature = temperature;
        this.temperatureStatus = temperatureStatus;
    }
}