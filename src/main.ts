import firebase from "firebase";
import { createApp } from "vue";
import Vue from "./App.vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

const firebaseConfig = {
  apiKey: "AIzaSyAU6LNmfMm1HFBUbFXkL0TPNaq30zhJFes",
  authDomain: "vue-slack-clone-tutorial.firebaseapp.com",
  projectId: "vue-slack-clone-tutorial",
  storageBucket: "vue-slack-clone-tutorial.appspot.com",
  messagingSenderId: "952125196351",
  appId: "1:952125196351:web:0076b77a0db21a3b6dd08a",
  measurementId: "G-4GLMSB0P6L",
};

firebase.initializeApp(firebaseConfig);

new Vue({
  el: "#app",
  router,
  store,
  render: (h: any) => h(App),
}).$mount("#app");
