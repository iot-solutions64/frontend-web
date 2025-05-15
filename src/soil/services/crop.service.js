import {BaseService} from "../../shared/services/base.service.js";
import axios from "axios";

export class CropService extends BaseService {
    constructor() {
        super("crop");
    }

    async getCropsByUserId(userId) {
        this.setToken();
        return axios.get(`${this.endpointPath()}/${userId}`, this.httpOptions);
    }
}