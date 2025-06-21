import {CropRequest} from "../models/crop.request.entity";
import http from "@/shared/services/http-common.service";
import {CropReferenceResponse} from "@/soil/models/crop-reference.response.entity";
import {CropLightResponse} from "@/soil/models/crop.light.response.entity";
import {CropDetailedResponse} from "@/soil/models/crop-detailed.response.entity";
import {TemperatureResponse} from "@/soil/models/temperature.response.entity";
import {TemperatureRequest} from "@/soil/models/temperature.request.entity";
import {HumidityRequest} from "@/soil/models/humidity.request.entity";
import {HumidityResponse} from "@/soil/models/humidity.response.entity";
import {TemperatureThresholdRequest} from "@/soil/models/temperature-threshold.request.entity";

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
        const response = await http.get(`${this.endpoint}/${userId}`);
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
        const response = await http.get(`${this.endpoint}/${userId}/light`);
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
                ));
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
        return String(response);
    }

    async patchTemperatureThresholdByCropId(cropId: number, temperatureThresholdRequest: TemperatureThresholdRequest): Promise<TemperatureResponse>{
        const response = await http.patch(`${this.endpoint}/${cropId}/temperature-threshold`, temperatureThresholdRequest);
        return new TemperatureResponse(
            response.data.temperature,
            response.data.temperatureMinThreshold,
            response.data.temperatureMaxThreshold,
            response.data.temperatureStatus
        );
    }

    async updateHumidityByCropId(cropId: number, humidityRequest: HumidityRequest): Promise<string>{
        return http.put(`${this.endpoint}/${cropId}/humidity`, humidityRequest);
    }

    async patchHumidityByCropId(cropId: number, humidity: number): Promise<HumidityResponse>{
        return http.patch(`${this.endpoint}/${cropId}/humidity`, humidity);
    }

    async deleteByCropId(cropId: number): Promise<string> {
        return http.delete(`${this.endpoint}/${cropId}`);
    }
}