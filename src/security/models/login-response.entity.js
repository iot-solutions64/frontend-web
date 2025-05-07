export class LoginResponse {
    constructor(token, userId, username) {
        this.token = token;
        this.userId = userId;
        this.username = username;
    }

    static fromJson(json) {
        return new LoginResponse(json.token, json.userId, json.username);
    }
}