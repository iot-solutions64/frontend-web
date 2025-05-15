import { expect, test, beforeEach } from "vitest";
import { AuthenticationService } from "../../src/security/services/authentication.service.js";
import {LoginResponse} from "../../src/security/models/login-response.entity.js";

// Mock de localStorage
beforeEach(() => {
    global.localStorage = {
        getItem: (key) => null,
        setItem: (key, value) => {},
        removeItem: (key) => {},
        clear: () => {},
    };
});

test("User login successful", async () => {
    const authService = new AuthenticationService();
    const response = await authService.signIn("string", "string");
    const loginResponse = LoginResponse.fromJson(response.data);
    console.log("loginResponse:", loginResponse);
    expect(loginResponse.token).toBeDefined();
});

test("User login fail", async () => {
    const authService = new AuthenticationService();
    try {
        const response = await authService.signIn("invalidUser", "invalidPassword");
    } catch(e) {
        console.log("error:", e.response.status);
        expect(e.response.status).toBe(401);
    }
});