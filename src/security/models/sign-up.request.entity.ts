export class SignUpRequest {
    username: string;
    password: string;
    role: Array<string>;

    constructor(username: string, password: string, role: Array<string>) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}