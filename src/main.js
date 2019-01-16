import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/icons";

import "@/assets/css/arita-heiti.css";
import UI from "../../web.main.run/src/ui";
Vue.use(UI);
import "../../web.main.run/src/ui/style/style.styl";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
