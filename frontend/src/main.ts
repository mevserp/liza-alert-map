import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import YmapPlugin from 'vue-yandex-maps'

const app = createApp(App);

const settings = {
  apiKey: '0612139a-61d6-4c5f-8d7a-88ece09588fa',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

app.use(YmapPlugin, settings);
app.use(createPinia());
app.use(router);

app.mount("#app");
