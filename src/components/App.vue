<script setup lang="ts">
import { onMounted } from "vue";
import DialogProvider from "@/components/providers/DialogProvider.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { setModel, getSquare, drawDetectLines } from "@/utils";

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
  const img = document.createElement("img");
  img.src = img1;
  img.onload = async () => {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const square = await getSquare(img);

    if (!square) {
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = 320;
    canvas.height = 320;

    ctx.drawImage(img, 0, 0, 320, 320);
    drawDetectLines(ctx, square, {
      xRatio: 320 / width,
      yRatio: 320 / height,
    });
    document.body.appendChild(canvas);
    console.log(square);
  };
};
</script>

<template>
  <main>
    <DialogProvider>
      <router-view></router-view>
    </DialogProvider>
  </main>
</template>

<style lang="scss">
@import "@/scss/_reset.scss";
@import "@/scss/_global.scss";

main {
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
