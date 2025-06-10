import {defineStore} from "pinia";
import {AuthenticationService} from "./authentication.service";
import {SignInRequest} from "../models/sign-in.request.entity";
import {Router} from "vue-router";
import {SignInResponse} from "../models/sign-in.response.entity";
import {SignUpRequest} from "../models/sign-up.request.entity";
import {SignUpResponse} from "../models/sign-up.response.entity";

const authenticationService = new AuthenticationService();

/**
 * Authentication store definition
 * @summary
 * This store is used to manage the user authentication state.
 * It provides getters to access the current user id, username, and token.
 * It also provides actions to sign in, sign up, and sign out.
 */
export const useAuthenticationStore = defineStore('authentication', {
    state: () => ({
        signedIn: false as boolean,
        userId: 0 as number,
        username: '' as string
    }),

    getters: {
        /**
         * Check if the user is signed in
         */
        isSignedIn: (state): boolean => state.signedIn,

        /**
         * Get the current user id
         */
        currentUserId: (state): number => state.userId,

        /**
         * Get the current username
         */
        currentUsername: (state): string => state.username,

        /**
         * Get the current token from local storage
         */
        currentToken: (): string | null => localStorage.getItem('token')
    },

    actions: {
        /**
         * Sign in the user
         * @param signInRequest - The sign-in request
         * @param router - The router instance
         */
        async signIn(signInRequest: SignInRequest, router: Router): Promise<void> {
            try {
                const response = await authenticationService.signIn(signInRequest);
                const signInResponse = new SignInResponse(
                    response.data.id,
                    response.data.username,
                    response.data.token
                );

                this.signedIn = true;
                this.userId = signInResponse.id;
                this.username = signInResponse.username;
                localStorage.setItem('token', signInResponse.token);

                console.log(signInResponse);
                router.push('terrains');
            } catch (error) {
                console.error(error);
                router.push({ name: 'sign-in' });
            }
        },

        /**
         * Sign up the user
         * @param signUpRequest - The sign-up request
         * @param router - The router instance
         */
        async signUp(signUpRequest: SignUpRequest, router: Router): Promise<void> {
            try {
                const response = await authenticationService.signUp(signUpRequest);
                const signUpResponse = new SignUpResponse(response.data.message);
                console.log(signUpResponse);
                router.push({ name: 'sign-in' });
            } catch (error) {
                console.error(error);
                router.push({ name: 'sign-up' });
            }
        },

        /**
         * Sign out the user
         * @param router - The router instance
         */
        async signOut(router: Router): Promise<void> {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            localStorage.removeItem('token');
            router.push({ name: 'sign-in' });
        }
    }
});