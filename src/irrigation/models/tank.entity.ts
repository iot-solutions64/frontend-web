export class Tank {
    id: number;
    name: string;
    remainingLiters: number;
    totalLiters: number;
    status: string;

    constructor(
        id: number = 0,
        name: string = '',
        remainingLiters: number = 0,
        totalLiters: number = 0,
        status: string = 'ACTIVATED'
    ) {
        this.id = id;
        this.name = name;
        this.remainingLiters = remainingLiters;
        this.totalLiters = totalLiters;
        this.status = status;
    }
}