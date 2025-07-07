import {CropRequest} from "../models/crop.request.entity";
import http from "@/shared/services/http-common.service";
import {CropReferenceResponse} from "@/soil/models/crop-reference.response.entity";
import {CropLightResponse} from "@/soil/models/crop-light.response.entity";
import {CropDetailedResponse} from "@/soil/models/crop-detailed.response.entity";
import {TemperatureResponse} from "@/soil/models/temperature.response.entity";
import {TemperatureRequest} from "@/soil/models/temperature.request.entity";
import {HumidityRequest} from "@/soil/models/humidity.request.entity";
import {HumidityResponse} from "@/soil/models/humidity.response.entity";
import {TemperatureThresholdRequest} from "@/soil/models/temperature-threshold.request.entity";
import {HumidityThresholdRequest} from "@/soil/models/humidity-threshold.request.entity";

export class CropService {
    endpoint: string = "/crop"

    async createCrop(cropRequest: CropRequest): Promise<CropReferenceResponse>{
        const response = await http.post(this.endpoint, cropRequest);
        return new CropReferenceResponse(
            response.data.cropId,
            response.data.userId,
            response.data.temperatureId,
            response.data.humidityId,
            response.data.waterTankId,
            response.data.cropName
        );
    }

    async getCropsByUserId(userId: number): Promise<CropReferenceResponse[]> {
        const response = await http.get(`${this.endpoint}/user/${userId}/reference`);
        return response.data.map(
            (crop: CropReferenceResponse) =>
                new CropReferenceResponse(
                    crop.cropId,
                    crop.userId,
                    crop.temperatureId,
                    crop.humidityId,
                    crop.waterTankId,
                    crop.cropName
            ));
    }

    async getLightCropsByUserId(userId: number): Promise<CropLightResponse[]>{
        const response = await http.get(`${this.endpoint}/user/${userId}/light`);
        return response.data.map(
            (crop: CropLightResponse) =>
                new CropLightResponse(
                    crop.cropId,
                    crop.cropName,
                    crop.userId,
                    crop.temperature,
                    crop.humidity,
                    crop.waterAmountRemaining,
                    crop.irrigationStartTime,
                    crop.irrigationDurationInMinutes,
                    crop.irrigationStatus
                )
        );
    }

    async getReferenceCropById(cropId: number): Promise<CropReferenceResponse>{
        const response = await http.get(`${this.endpoint}/${cropId}/reference`);
        return new CropReferenceResponse(
            response.data.cropId,
            response.data.userId,
            response.data.temperatureId,
            response.data.humidityId,
            response.data.waterTankId,
            response.data.cropName
        );
    }

    async getLightCropById(cropId: number): Promise<CropLightResponse>{
        const response = await http.get(`${this.endpoint}/${cropId}/light`);
        return new CropLightResponse(
            response.data.cropId,
            response.data.cropName,
            response.data.userId,
            response.data.temperature,
            response.data.humidity,
            response.data.waterAmountRemaining,
            response.data.irrigationStartTime,
            response.data.irrigationDurationInMinutes,
            response.data.irrigationStatus
        );
    }

    async getDetailedCropById(cropId: number): Promise<CropDetailedResponse>{
        const response = await http.get(`${this.endpoint}/${cropId}/detailed`);
        return new CropDetailedResponse(
            response.data.cropId,
            response.data.cropName,
            response.data.userId,
            response.data.temperature,
            response.data.temperatureMinThreshold,
            response.data.temperatureMaxThreshold,
            response.data.temperatureStatus,
            response.data.humidity,
            response.data.humidityMinThreshold,
            response.data.humidityMaxThreshold,
            response.data.humidityStatus,
            response.data.waterTankName,
            response.data.waterAmountRemaining,
            response.data.maxWaterCapacity,
            response.data.waterTankStatus,
            response.data.irrigationHourFrequency,
            response.data.irrigationStartDate,
            response.data.irrigationStartTime,
            response.data.irrigationDisallowedStartTime,
            response.data.irrigationDisallowedEndTime,
            response.data.irrigationDurationInMinutes,
            response.data.irrigationStatus,
            response.data.irrigationMaxWaterUsage
        );
    }

    async patchTemperatureByCropId(cropId: number, temperatureRequest: TemperatureRequest): Promise<string>{
        const response = await http.patch(`${this.endpoint}/${cropId}/temperature`, temperatureRequest);
        return String(response.data);
    }

    async patchTemperatureThresholdByCropId(cropId: number, temperatureThresholdRequest: TemperatureThresholdRequest): Promise<TemperatureResponse>{
        const response = await http.patch(`${this.endpoint}/${cropId}/temperature-threshold`, temperatureThresholdRequest);
        return new TemperatureResponse(response.data.temperature, response.data.temperatureMinThreshold, response.data.temperatureMaxThreshold, response.data.temperatureStatus);
    }

    async patchHumidityByCropId(cropId: number, humidityRequest: HumidityRequest): Promise<string>{
        const response = await http.put(`${this.endpoint}/${cropId}/humidity`, humidityRequest);
        return String(response.data);
    }

    async patchHumidityThresholdByCropId(cropId: number, humidityThresholdRequest: HumidityThresholdRequest): Promise<HumidityResponse>{
        const response = await http.patch(`${this.endpoint}/${cropId}/humidity-threshold`, humidityThresholdRequest);
        return new HumidityResponse(response.data.humidity, response.data.humidityMinThreshold, response.data.humidityMaxThreshold, response.data.humidityStatus);
    }

    async deleteByCropId(cropId: number): Promise<string> {
        const response = await http.delete(`${this.endpoint}/${cropId}`);
        return String(response.data);
    }
}