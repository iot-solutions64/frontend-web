import { expect, test, beforeEach } from "vitest";
import { CropService } from "../../src/soil/services/crop.service.ts";

// Mock de localStorage
beforeEach(() => {
    global.localStorage = {
        getItem: (key) => {
            if (key === "token") return "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0NzM0OTA4OCwiZXhwIjoxNzQ3OTUzODg4fQ._yzVAAy-OPMuD44N2UsyfZ-9TR3gQWiixqcjEXMdGpaalKIzZGDQru8RY7OVFEHZ";
            return null;
        },
        setItem: (key, value) => {},
        removeItem: (key) => {},
        clear: () => {},
    };
});


test("Get all crops of user 1", async () => {
    const cropsService = new CropService();
    const response = await cropsService.getCropsByUserId(1);
    console.log("crops:", response.data);
    expect(response.status).toBe(200);
})

test("Get all crops of non-existent user", async () => {
    const cropsService = new CropService();
    try {
        const response = await cropsService.getCropsByUserId(-1);
    } catch (e) {
        console.log("error:", e.response.status);
        expect(e.response.status).toBe(401);
    }

})