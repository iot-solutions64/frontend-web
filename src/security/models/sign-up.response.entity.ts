export class SignUpResponse{
    id: number;
    username: string;
    role: Array<string>;

    constructor(id: number, name: string, role: Array<string>) {
        this.id = id;
        this.username = name;
        this.role = role;
    }
}