import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService.js";
import ns from "../Services/NotificationService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    animals: [],
    activeAnimal: {},
    animalDetails: {},
    favorites: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setFavorites(state, favorites) {
      state.favorites = favorites;
    },
    //SECTION Array Mutations
    setResource(state, payload) {
      state[payload.resource] = payload.data;
    },
    addResource(state, payload) {
      let resource = state[payload.resource];
      if (Array.isArray(resource)) {
        resource.push(payload.data);
      } else {
        console.error(
          "Cannot add to ${payload.resource} as it is not an array"
        );
      }
    },
    //!SECTION Array Mutations

    //SECTION Dictionary Mutations
    setDictionary(state, payload) {
      Vue.set(state[payload.resource], payload.parentId, payload.data);
    },
    addDictionary(state, payload) {
      let resource = state[payload.resource][payload.id];
      resource.push(payload.data);
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit, dispatch, state }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
        if (!res.data.completedQuiz) {
          router.push({ name: "Home" });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getFavorites({ commit }) {
      try {
        let res = await api.get("profile/favorites");
        commit("setFavorites", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //SECTION Array Methods
    async getResource({ commit, state }, payload) {
      try {
        let res = await api.get(payload.path);
        commit("setResource", {
          data: res.data,
          resource: payload.resource,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async create({ dispatch }, payload) {
      try {
        let res = await api.post(payload.path, payload.data);
        dispatch("getResource", {
          path: payload.getPath,
          resource: payload.resource,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async edit({ dispatch }, payload) {
      try {
        await api.put(payload.path, payload.data);
        dispatch("getResource", {
          path: payload.getPath,
          resource: payload.resource,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async delete({ dispatch }, payload) {
      try {
        await api.delete(payload.deletePath);
        router.push({ name: "Profile" });
      } catch (error) {
        console.error(error);
      }
    },
    async getDictionaries({ commit }, payload) {
      try {
        let res = await api.get(payload.path);
        commit("setDictionary", {
          resource: payload.resource,
          data: res.data,
          parentId: payload.parentId,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async createDictionary({ dispatch }, payload) {
      try {
        let res = await api.post(payload.path, payload.data);
        dispatch("getDictionaries", {
          path: payload.getPath,
          resource: payload.resource,
          data: res.data,
          parentId: payload.parentId,
        });
        ns.toast("Saved!", 2000, "success");
      } catch (error) {
        console.error(error);
      }
    },
    async editDictionaries({ dispatch }, payload) {
      try {
        let res = await api.put(payload.path, payload.data);
        dispatch("getDictionaries", {
          path: payload.getPath,
          parentId: payload.parentId,
          resource: payload.resource,
        });
      } catch (error) {}
    },
    async deleteDictionary({ dispatch }, payload) {
      try {
        await api.delete(payload.deletePath);
        dispatch("getDictionaries", {
          resource: payload.resource,
          path: payload.path,
          parentId: payload.parentId,
        });
      } catch (error) {
        console.error(error);
      }
    },
    async addFavorite({ dispatch, commit }, payload) {
      try {
        await api.post(payload.path, payload.data);
      } catch (error) {
        console.error(error);
      }
    },
    //!SECTION Array Methods

    //SECTION Dictionary Methods
    //SECTION Edge Cases
    setActive({ commit }, data) {
      commit("setResource", {
        resource: "activeAnimal",
        data: data,
      });
    },
  },
});
