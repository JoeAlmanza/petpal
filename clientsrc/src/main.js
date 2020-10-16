import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Auth0Plugin, onAuth } from "@bcwdev/auth0-vue";
import { domain, clientId, audience } from "./authConfig";
// @ts-ignore
import { VueHammer } from "vue2-hammer";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");

// @ts-ignore
Vue.use(VueHammer);
VueHammer.config.swipe = {
  threshold: 180,
};
