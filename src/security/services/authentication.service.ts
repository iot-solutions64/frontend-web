import {SignInRequest} from "@/security/models/sign-in.request.entity";
import {SignUpRequest} from "@/security/models/sign-up.request.entity";
import http from "@/shared/services/http-common.service";
import {SignInResponse} from "@/security/models/sign-in.response.entity";
import {SignUpResponse} from "@/security/models/sign-up.response.entity";

export class AuthenticationService {
    endpoint: string = "/authentication";
    signUp(signUpRequest: SignUpRequest) :Promise<SignUpResponse>{
        return http.post(`${this.endpoint}/sign-up`, signUpRequest);
    }

    signIn(signInRequest: SignInRequest):Promise<SignInResponse>{
        return http.post(`${this.endpoint}/sign-in`, signInRequest);
    }
}