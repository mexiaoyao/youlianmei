import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

import "./assets/style/common.less";

Vue.config.productionTip = false;

console.log(`前端版本号：${process.env.currentVersion || require("../package.json").version}`);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
