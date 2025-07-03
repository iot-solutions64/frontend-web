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
        const response = await http.get(`${this.endpoint}/user/${userId}`);
        return response.data.map(
            (waterTank: WaterTankResponse) =>
                new WaterTankResponse(
                    waterTank.id,
                    waterTank.name,
                    waterTank.waterAmountRemaining,
                    waterTank.maxWaterCapacity,
                    waterTank.status
                )
        );
    }

    async createWaterTank(waterTankRequest: WaterTankRequest): Promise<WaterTankResponse>{
        const response = await http.post(this.endpoint, waterTankRequest);
        return new WaterTankResponse(
            response.data.id,
            response.data.name,
            response.data.waterAmountRemaining,
            response.data.maxWaterCapacity,
            response.data.status
        );
    }

    async patchWaterRemaining(waterRemainingRequest: WaterRemainingRequest): Promise<WaterTankResponse>{
        const response = await http.patch(`${this.endpoint}/water-remaining`, waterRemainingRequest);
        return new WaterTankResponse(
            response.data.id,
            response.data.name,
            response.data.waterAmountRemaining,
            response.data.maxWaterCapacity,
            response.data.status
        );
    }

    async patchWaterTankName(waterTankNameRequest: WaterTankNameRequest): Promise<WaterTankResponse>{
        const response = await http.patch(`${this.endpoint}/name`, waterTankNameRequest);
        return new WaterTankResponse(
            response.data.id,
            response.data.name,
            response.data.waterAmountRemaining,
            response.data.maxWaterCapacity,
            response.data.status
        );
    }

    async patchWaterTankStatus(waterTankId: number, status: string): Promise<WaterTankResponse>{
        const response = await http.patch(`${this.endpoint}/${waterTankId}/status/${status}`);
        return new WaterTankResponse(
            response.data.id,
            response.data.name,
            response.data.waterAmountRemaining,
            response.data.maxWaterCapacity,
            response.data.status
        );
    }

    async deleteWaterTankById(waterTankId: number): Promise<string>{
        const response = await http.delete(`${this.endpoint}/${waterTankId}`);
        return String(response.data);
    }
}