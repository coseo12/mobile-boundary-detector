import { createApp } from "vue";
import App from "@/components/App.vue";
import { createPinia } from "pinia";
import { router } from "@/router/";

createApp(App).use(createPinia()).use(router).mount("#app");
