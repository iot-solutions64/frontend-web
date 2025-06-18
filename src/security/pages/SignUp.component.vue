<script setup lang="ts">
import {computed, ref} from 'vue';
import {SignUpRequest} from "@/security/models/sign-up.request.entity.js";
import {useAuthenticationStore} from "@/security/services/authentication.store";
import {ResponseState} from "@/shared/models/response-states.enum";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSignUpSuccessful = ref(ResponseState.NOT_EXECUTED);

const error = computed(() => {
  if(isSignUpSuccessful.value === ResponseState.FAILURE){
    if(username.value === "" || password.value === "" || confirmPassword.value === "") return "Datos incompletos";
    else if(password.value !== confirmPassword.value) return "Las contraseñas no coinciden";
    else return "";
  }
  else if(isSignUpSuccessful.value === ResponseState.ERROR) return "Error al crear usuario";
  else return "";
});

async function onSignUp() {
  if (username.value === "" || password.value === "" || confirmPassword.value === "") {
    isSignUpSuccessful.value = ResponseState.FAILURE;
    return;
  }
  let authenticationStore = useAuthenticationStore();
  let signUpRequest = new SignUpRequest(username.value, password.value, ["ROLE_USER"]);
  const response = await authenticationStore.signUp(signUpRequest);
  (response)? isSignUpSuccessful.value = ResponseState.SUCCESSFUL : isSignUpSuccessful.value = ResponseState.ERROR;
}
</script>

<template>
  <div class="container">
    <div class="left">
      <img src="/assets/images/hydrosmart-logo.png" style="width: 350px; height: 350px;" alt="software logo" />
    </div>
    <div class="right">
      <pv-card class="signup-card" style="width: 550px; height: 620px;">
        <template #title>
          <h3>Crear cuenta</h3>
          <p v-if="error !== ''">{{ error }}</p>
        </template>
        <template #content>
          <div class="signup-form">
            <pv-ifta-label style="margin: 0 auto; width: 80%;">
              <pv-icon-field>
                <pv-input-icon class="pi pi-user" />
                <pv-input-text v-model="username" variant="filled" style="width: 100%;" type="text" />
              </pv-icon-field>
              <label>Usuario</label>
            </pv-ifta-label>

            <pv-ifta-label style="margin: 0 auto; width: 80%;">
              <pv-icon-field>
                <pv-input-icon class="pi pi-key" />
                <pv-input-text v-model="password" variant="filled" style="width: 100%;" type="password" />
              </pv-icon-field>
              <label>Contraseña</label>
            </pv-ifta-label>

            <pv-ifta-label style="margin: 0 auto; width: 80%;">
              <pv-icon-field>
                <pv-input-icon class="pi pi-check" />
                <pv-input-text v-model="confirmPassword" variant="filled" style="width: 100%;" type="password" />
              </pv-icon-field>
              <label>Confirmar Contraseña</label>
            </pv-ifta-label>

            <pv-button @click="onSignUp" label="Registrarse" style="margin: 0 auto; width: 60%;" />
            <router-link to="/login"
                         style="text-decoration: none; color:var(--text-color);">
              ¿Ya tienes cuenta? <u>Inicia sesión</u>
            </router-link>
          </div>
        </template>
      </pv-card>
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

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.signup-card {
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
