import { createRouter, createWebHashHistory } from "vue-router";
import { routes, constants } from "./routes";
import { useStore } from "@/store";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  next();

  // const store = useStore();
  // if (store.isLoading && to.name !== "loading") {
  //   next("/loading");
  // } else {
  //   next();
  // }
});

export { constants };
