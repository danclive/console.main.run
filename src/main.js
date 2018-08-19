import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import UI from "../../web.main.run/src/ui"
Vue.use(UI);
import "../../web.main.run/src/ui/style/style.styl"

Vue.config.productionTip = false;

var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

console.log(app.$router.options.routes)
console.log(app.$route)