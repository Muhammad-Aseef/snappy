import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
// Modules
import ecommerceStoreModule from "@/views/apps/e-commerce/eCommerceStoreModule";
import app from "./app";
import appConfig from "./app-config";
import verticalMenu from "./vertical-menu";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});
export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    app,
    appConfig,
    verticalMenu,
    "app-ecommerce": ecommerceStoreModule,
  },

  strict: process.env.DEV,

  state: {
    userData: {
      userID: 0,
      categoryId: 0,
      username: "",
      password: "",
      rememberMe: false,
      isLoggedIn: false,
      userType: 0,
      roles: null,
    },
    snappyUser: null,
  },
  mutations: {
    setSnappyUser(state, val) {
      state.snappyUser = val;
    },
  },
});
