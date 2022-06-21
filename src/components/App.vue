<script setup lang="ts">
import * as utils from "@/utils/boundary_detector.js";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";

const store = useStore();
const router = useRouter();
const { load } = utils;
const { isLoading, model } = storeToRefs(store);

const onLoadedModel = async () => {
  model.value = await load("./model/model.json");
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
