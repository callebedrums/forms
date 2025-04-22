import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { configuration } from './services/configuration';


(async function () {
  const config = await fetch('/environment.json').then(response => response.json());
  configuration.set(config);

  const pinia = createPinia();
  const app = createApp(App);
  app.use(pinia);
  app.use(router);

  app.mount('#app');
})();



