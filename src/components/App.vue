<script setup lang="ts">
import ToastProvider from "@/components/providers/ToastProvider.vue";
import DialogProvider from "@/components/providers/DialogProvider.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { setModel, setCanvasTEST, getImgRotate } from "@/utils";

import img1 from "@/assets/doc_test017.jpg";

const store = useStore();
const router = useRouter();
const { isLoading } = storeToRefs(store);

const onLoadedModel = async () => {
  await setModel();
  isLoading.value = false;
  router.push(constants.detector.path);

  callback();
};
onLoadedModel();

const callback = () => {
  const i = new Image();
  i.src = img1;
  i.onload = () => {
    const img = getImgRotate(i);
    // document.body.appendChild(img);
  };
  // setCanvasTEST(img1);
  // setCanvasTEST(img2);
  // setCanvasTEST(img3);
  // setCanvasTEST(img4);
  // setCanvasTEST(img5);
  // setCanvasTEST(img6);
};
</script>

<template>
  <main>
    <ToastProvider>
      <DialogProvider>
        <router-view></router-view>
      </DialogProvider>
    </ToastProvider>
  </main>
</template>

<style lang="scss">
@import "@/scss/_reset.scss";
@import "@/scss/_global.scss";

main {
  position: relative;
  max-width: 512px;
  width: 100%;
  height: 100vh;

  .dialog {
    button {
      color: black;
    }
  }
}
</style>
