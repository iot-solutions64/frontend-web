import {defineStore} from "pinia";
import {AuthenticationService} from "./authentication.service";
import {SignInRequest} from "../models/sign-in.request.entity";
import router from "../../shared/router";
import {SignInResponse} from "../models/sign-in.response.entity";
import {SignUpRequest} from "../models/sign-up.request.entity";
import {SignUpResponse} from "../models/sign-up.response.entity";

/**
 * Authentication store definition
 * @summary
 * This store is used to manage the user authentication state.
 * It provides getters to access the current user id, username, and token.
 * It also provides actions to sign in, sign up, and sign out.
 */

const authenticationService: AuthenticationService = new AuthenticationService();

export const useAuthenticationStore = defineStore('authentication', {
    persist: true,
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
         */
        async signIn(signInRequest: SignInRequest): Promise<boolean> {
            try {
                const signInResponse: SignInResponse = await authenticationService.signIn(signInRequest);
                this.signedIn = true;
                this.userId = signInResponse.id;
                this.username = signInResponse.username;
                localStorage.setItem('token', signInResponse.token);
                await router.push('/crops');
                return true;
            } catch (error) {
                console.error(error);
                await router.push('/login');
                return false;
            }
        },

        /**
         * Sign up the user
         * @param signUpRequest - The sign-up request
         */
        async signUp(signUpRequest: SignUpRequest): Promise<boolean> {
            try {
                const response = await authenticationService.signUp(signUpRequest);
                const signUpResponse = new SignUpResponse(response.id,response.username, response.role);
                await router.push('/login');
                return true;
            } catch (error) {
                console.error(error);
                await router.push('/signup');
                return false;
            }
        },

        /**
         * Sign out the user
         */
        async signOut(): Promise<void> {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            localStorage.removeItem('token');
            await router.push('/login');
        }
    }
});