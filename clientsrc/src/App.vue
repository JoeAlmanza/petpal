<template>
  <div id="app">
    <navbar />
    <router-view />
    <my-footer v-if="$route.name != 'Home'" />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import MyFooter from "@/components/MyFooter";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    }
  },
  components: {
    Navbar,
    MyFooter,
  },
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";
#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
