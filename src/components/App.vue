<script setup lang="ts">
import { getModel } from "@/utils";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";

const store = useStore();
const router = useRouter();
const { isLoading, model } = storeToRefs(store);

const onLoadedModel = async () => {
  model.value = await getModel();
  isLoading.value = false;
  router.push(constants.detector.path);
};
onLoadedModel();
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style leng="scss">
@import "@/scss/_reset.scss";
@import "@/scss/_global.scss";

main {
  max-width: 512px;
  width: 100%;
  height: 100vh;
}
</style>
