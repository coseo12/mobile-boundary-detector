import { createApp } from "vue";
import App from "@/components/App.vue";
import { createPinia } from "pinia";
import { router } from "@/router/";

// 사파리 지원 X
// window.screen?.orientation
//   .lock("portrait")
//   .then(() => {
//     console.log("🔒 portrait locked");
//   })
//   .catch(console.error);

createApp(App).use(createPinia()).use(router).mount("#app");
