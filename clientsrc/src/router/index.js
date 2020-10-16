import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
// @ts-ignore
import Swipe from "../Pages/Swipe.vue";
// @ts-ignore
import PetDetails from "../Pages/PetDetails.vue";
import { authGuard } from "@bcwdev/auth0-vue";
import { api } from "../store/AxiosService.js";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/swipepage",
    name: "Swipe",
    component: Swipe,
    beforeEnter: authGuard,
  },
  {
    path: "/petdetails/:id",
    name: "PetDetails",
    component: PetDetails,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
