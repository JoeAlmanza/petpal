<template>
  <div class="container">
    <div class="row bg-dark text-light navbartop d-flex align-items-center">
      <div class="col-6 d-flex justify-content-center align-items-center">
        <i class="fa fa-paw fa-2x" aria-hidden="true"></i><h2>PetPal</h2>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button
          class="btn btn-success"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button class="btn btn-danger" @click="logout" v-else>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      if (this.$auth.isAuthenticated) {
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
      }
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    },
  },
};
</script>

<style>
.navbartop {
  height: 10vh;
}
.logo {
  height: 8vh;
}
</style>
