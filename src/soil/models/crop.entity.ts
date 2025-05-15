export class Crop {
    id: number;
    name: string;
    maxLiters: number;
    autoIrrigation: boolean;
    tankId: number;

    constructor(
        id: number = 0,
        name: string = '',
        maxLiters: number = 0,
        autoIrrigation: boolean = false,
        tankId: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.maxLiters = maxLiters;
        this.autoIrrigation = autoIrrigation;
        this.tankId = tankId;
    }
}