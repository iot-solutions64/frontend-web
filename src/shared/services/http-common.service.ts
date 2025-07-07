import axios from "axios";
import {authenticationInterceptor} from "@/security/services/authentication.interceptor";

const baseUrl = import.meta.env.VITE_API_URL;

const http = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
});

http.interceptors.request.use(authenticationInterceptor);

export default http;