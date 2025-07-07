<script setup lang="ts">
import {computed, ref} from 'vue';
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../models/sign-in.request.entity.js";
import {ResponseState} from "@/shared/models/response-states.enum";

const username = ref("");
const password = ref("");
const isSignInSuccessful = ref(ResponseState.NOT_EXECUTED);

const showSignInComponent = computed(() => {
  return ((isSignInSuccessful.value === ResponseState.NOT_EXECUTED) || (isSignInSuccessful.value === ResponseState.FAILURE));
});

const error = computed(() => {
  if(isSignInSuccessful.value === ResponseState.FAILURE) {
    if(username.value === "" || password.value === "") return "Datos incompletos";
    else return "Nombre y/o usuario incorrectos";
  }
  else return "";
});

async function OnSignIn() {
  if (username.value === "" || password.value === "") {
    isSignInSuccessful.value = ResponseState.FAILURE;
    return;
  }
  isSignInSuccessful.value = ResponseState.LOADING;
  let authenticationStore = useAuthenticationStore();
  const signInRequest = new SignInRequest(username.value, password.value);
  const response = await authenticationStore.signIn(signInRequest);
  (response)? isSignInSuccessful.value = ResponseState.SUCCESSFUL : isSignInSuccessful.value = ResponseState.FAILURE;
}
</script>

<template>
  <div class="container">
    <div class="left">
      <img src="/assets/images/hydrosmart-logo.png" style="width: 350px; height: 350px;" alt="software logo" />
    </div>
    <div class="right">
      <pv-card class="login-card" style="width: 550px; height: 560px;" v-if="showSignInComponent">
        <template #title>
          <h3>Iniciar Sesión</h3>
          <p v-if="error !== ''">{{error}}</p>
        </template>
        <template #content>
          <div class="login-form">
            <div class="card flex justify-center">
              <pv-ifta-label style="margin: 0 auto; width: 80%;">
                <pv-icon-field style="margin: 0 auto;">
                  <pv-input-icon class="pi pi-user" />
                  <pv-input-text id="username" v-model="username" variant="filled" style="width: 100%;" type="text"/>
                </pv-icon-field>
                <label for="username">Usuario</label>
              </pv-ifta-label>
            </div>
            <div class="card flex justify-center">
              <pv-ifta-label style="margin: 0 auto; width: 80%;">
                <pv-icon-field style="margin: 0 auto;">
                  <pv-input-icon class="pi pi-key" />
                  <pv-input-text id="password"
                                 v-model="password"
                                 variant="filled"
                                 style="width: 100%;"
                                 type="password"
                                 />
                </pv-icon-field>
                <label for="password">Contraseña</label>
              </pv-ifta-label>
            </div>
            <pv-button @click="OnSignIn" label="Acceder" style="margin: 0 auto; width: 60%;" />
            <router-link to="/signup"
                         style="text-decoration: none; color:var(--text-color);">
              ¿No tienes cuenta? <u>Regístrate aquí</u>
            </router-link>
          </div>
        </template>
      </pv-card>
      <div style="width: 550px; height: 560px; display: flex; align-items: center; justify-content: center" v-else>
        <pv-progress-spinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
                             animationDuration=".5s" aria-label="Custom ProgressSpinner"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left {
  width: 50%;
  height: 100%;
  background-image: url("/assets/images/riego.jpeg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

h3 {
  text-align: center;
}

p {
  text-align: center;
  font-weight: 400;
  color: var(--error-color);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.login-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
}

a {
  text-align: center;
}

@media (max-width: 768px) {
  .left {
    display: none;
  }

  .right {
    width: 100%;
    padding: 5px;
  }
}
</style>