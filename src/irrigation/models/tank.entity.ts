export class Tank {
    id: number;
    name: string;
    remainingLiters: number;
    totalLiters: number;

    constructor(
        id: number = 0,
        name: string = '',
        remainingLiters: number = 0,
        totalLiters: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.remainingLiters = remainingLiters;
        this.totalLiters = totalLiters;
    }
}