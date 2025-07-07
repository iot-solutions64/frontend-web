export class LoginResponse {
    token: string;
    userId: number;
    username: string;

    constructor(token: string, userId: number, username: string) {
        this.token = token;
        this.userId = userId;
        this.username = username;
    }

    static fromJson(json: any): LoginResponse {
        return new LoginResponse(json.token, json.userId, json.username);
    }
}