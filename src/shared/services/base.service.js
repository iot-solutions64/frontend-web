import axios from "axios"

export class BaseService {
    httpOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    constructor(endpoint) {
        this.baseURL = import.meta.env.VITE_API_URL;
        this.endpoint = endpoint;
        this.token = localStorage.getItem('token');
    }

    setToken() {
        this.token = localStorage.getItem('token');
        this.httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        }
    }

    endpointPath() {
        return `${this.baseURL}/${this.endpoint}`;
    }

    getOne(id){
        this.setToken();
        return axios.get(`${this.endpointPath()}/${id}`, this.httpOptions);
    }

    getAll(){
        this.setToken();
        return axios.get(this.endpointPath(), this.httpOptions);
    }

    create(data){
        this.setToken();
        return axios.post(this.endpointPath(), data, this.httpOptions);
    }

    update(id, data){
        this.setToken();
        return axios.put(`${this.endpointPath()}/${id}`, data, this.httpOptions);
    }

    delete(id){
        this.setToken();
        return axios.delete(`${this.endpointPath()}/${id}`, this.httpOptions);
    }

}