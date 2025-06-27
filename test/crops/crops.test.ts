import { describe, test, expect } from "vitest";
import { CropService } from "@/soil/services/crop.service";
import {TemperatureRequest} from "@/soil/models/temperature.request.entity";
import {TemperatureThresholdRequest} from "@/soil/models/temperature-threshold.request.entity";
import {HumidityRequest} from "@/soil/models/humidity.request.entity";

const cropService = new CropService();

describe("CropService Integration Tests", () => {

    test("Get all crops of user 1", async () => {
        const response = await cropService.getCropsByUserId(1);
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThanOrEqual(0);
    });

    test("Get light crops of user 1", async () => {
        const response = await cropService.getLightCropsByUserId(1);
        expect(Array.isArray(response)).toBe(true);
    });

    test("Get reference crop by ID", async () => {
        const crop = await cropService.getReferenceCropById(1);
        expect(crop.cropId).toBe(1);
    });

    test("Get light crop by ID", async () => {
        const crop = await cropService.getLightCropById(1);
        expect(crop.cropId).toBe(1);
    });

    test("Get detailed crop by ID", async () => {
        const crop = await cropService.getDetailedCropById(1);
        expect(crop.cropId).toBe(1);
        expect(typeof crop.temperature).toBe("number");
    });

    test("Patch temperature by crop ID", async () => {
        const result = await cropService.patchTemperatureByCropId(1, {
            temperature: 23
        } as TemperatureRequest);
        expect(typeof result).toBe("string");
    });

    test("Patch temperature threshold by crop ID", async () => {
        const response = await cropService.patchTemperatureThresholdByCropId(1, {
            temperatureMinThreshold: 18,
            temperatureMaxThreshold: 30
        } as TemperatureThresholdRequest);

        expect(response.temperatureMinThreshold).toBeLessThanOrEqual(response.temperatureMaxThreshold);
    });

    test("Patch humidity by crop ID", async () => {
        const result = await cropService.patchHumidityByCropId(1, {
            humidity: 45
        } as HumidityRequest);
        expect(typeof result).toBe("string");
    });

    test("Patch humidity threshold by crop ID", async () => {
        const result = await cropService.patchHumidityThresholdByCropId(1, 45);
        expect(result.humidity).toBe(45);
    });

    test("Delete crop by ID (assuming crop with ID 99 exists and is deletable)", async () => {
        const result = await cropService.deleteByCropId(99);
        expect(typeof result).toBe("string");
    });

    test("Handle error when crop ID not found", async () => {
        try {
            await cropService.getReferenceCropById(-1);
        } catch (e: any) {
            expect(e.response?.status).toBeGreaterThanOrEqual(400);
        }
    });
});