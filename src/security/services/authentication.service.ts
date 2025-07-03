import {SignInRequest} from "@/security/models/sign-in.request.entity";
import {SignUpRequest} from "@/security/models/sign-up.request.entity";
import {SignInResponse} from "@/security/models/sign-in.response.entity";
import {SignUpResponse} from "@/security/models/sign-up.response.entity";
import http from "@/shared/services/http-common.service";

export class AuthenticationService {
    endpoint: string = "/authentication";
    async signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse>{
        const response = await http.post(`${this.endpoint}/sign-up`, signUpRequest);
        return new SignUpResponse(
          response.data.id,
          response.data.username,
          response.data.role
        );
    }

    async signIn(signInRequest: SignInRequest):Promise<SignInResponse>{
        const response = await http.post(`${this.endpoint}/sign-in`, signInRequest);
        return new SignInResponse(
          response.data.id,
          response.data.username,
          response.data.token
        );
    }
}