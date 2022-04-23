import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import YmapPlugin from 'vue-yandex-maps'

const app = createApp(App);

const settings = {
  apiKey: '4ad32e3a-daa3-452b-9214-36ee05203216',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

app.use(YmapPlugin, settings);
app.use(createPinia());
app.use(router);

app.mount("#app");
