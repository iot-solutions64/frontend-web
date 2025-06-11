import {WaterTankResponse} from "@/irrigation/models/water-tank.response.entity";
import http from "@/shared/services/http-common.service";
import {WaterTankRequest} from "@/irrigation/models/water-tank.request.entity";
import {WaterRemainingRequest} from "@/irrigation/models/water-remaining.request.entity";
import {WaterTankNameRequest} from "@/irrigation/models/water-tank-name.request.entity";

export class WaterTankService{
    endpoint = "/water-tanks";

    async getWaterTankById(waterTankId: number): Promise<WaterTankResponse>{
        return http.get(`${this.endpoint}/${waterTankId}`);
    }

    async getAllWaterTanksByUserId(userId: number): Promise<WaterTankResponse[]>{
        return http.get(`${this.endpoint}/user/${userId}`);
    }

    async createWaterTank(waterTankRequest: WaterTankRequest): Promise<WaterTankResponse>{
        return http.post(this.endpoint, waterTankRequest);
    }

    async patchWaterRemaining(waterRemainingRequest: WaterRemainingRequest): Promise<WaterTankResponse>{
        return http.patch(`${this.endpoint}/water-remaining`, waterRemainingRequest);
    }

    async patchWaterTankName(waterTankNameRequest: WaterTankNameRequest): Promise<WaterTankResponse>{
        return http.patch(`${this.endpoint}/name`, waterTankNameRequest);
    }

    async patchWaterTankStatus(waterTankId: number, status: string): Promise<WaterTankResponse>{
        return http.patch(`${this.endpoint}/${waterTankId}/status/${status}`);
    }

    async deleteWaterTankById(waterTankId: number): Promise<string>{
        return http.delete(`${this.endpoint}/${waterTankId}`);
    }
}