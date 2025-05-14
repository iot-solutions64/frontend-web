export class Subsystem {
    id: number;
    name: string;
    value: number | null;
    status: string;
    active: boolean;


    constructor(
        id: number = 0,
        name: string = '',
        value: number = 0,
        status: string = '',
        active: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.status = status;
        this.active = active;
    }
}