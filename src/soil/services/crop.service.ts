import {CropRequest} from "../models/crop.request.entity";
import http from "@/shared/services/http-common.service";
import {CropReferenceResponse} from "@/soil/models/crop-reference.response.entity";
import {CropLightResponse} from "@/soil/models/crop.light.response.entity";
import {CropDetailedResponse} from "@/soil/models/crop-detailed.response.entity";
import {TemperatureResponse} from "@/soil/models/temperature.response.entity";
import {TemperatureRequest} from "@/soil/models/temperature.request.entity";
import {HumidityRequest} from "@/soil/models/humidity.request.entity";
import {HumidityResponse} from "@/soil/models/humidity.response.entity";
export class CropService {
    endpoint: string = "/crop"

    async createCrop(cropRequest: CropRequest): Promise<CropReferenceResponse>{
        return http.post(this.endpoint, cropRequest);
    }

    async getCropsByUserId(userId: number): Promise<CropReferenceResponse[]> {
        return http.get(`${this.endpoint}/${userId}`);
    }

    async getReferenceCropById(cropId: number): Promise<CropReferenceResponse>{
        return http.get(`${this.endpoint}/${cropId}/reference`);
    }

    async getLightCropById(cropId: number): Promise<CropLightResponse>{
        return http.get(`${this.endpoint}/${cropId}/light`);
    }

    async getDetailedCropById(cropId: number): Promise<CropDetailedResponse>{
        return http.get(`${this.endpoint}/${cropId}/detailed`);
    }

    async updateTemperatureByCropId(cropId: number, temperatureRequest: TemperatureRequest): Promise<TemperatureResponse>{
        return http.put(`${this.endpoint}/${cropId}/temperature`, temperatureRequest);
    }

    async patchTemperatureByCropId(cropId: number, temperature: number): Promise<string>{
        return http.patch(`${this.endpoint}/${cropId}/temperature`, temperature);
    }

    async updateHumidityByCropId(cropId: number, humidityRequest: HumidityRequest): Promise<HumidityResponse>{
        return http.put(`${this.endpoint}/${cropId}/humidity`, humidityRequest);
    }

    async patchHumidityByCropId(cropId: number, humidity: number): Promise<string>{
        return http.patch(`${this.endpoint}/${cropId}/humidity`, humidity);
    }

    async deleteByCropId(cropId: number): Promise<string> {
        return http.delete(`${this.endpoint}/${cropId}`);
    }
}