<script setup lang="ts">
import { onMounted } from "vue";
import DialogProvider from "@/components/providers/DialogProvider.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import {
  setModel,
  getSquare,
  drawDetectLines,
  drawPath,
  getDetectCirclePath,
  getDetectFitPath,
} from "@/utils";

import img1 from "@/assets/doc_test017.jpg";
import img2 from "@/assets/doc_test019.jpg";
import img3 from "@/assets/doc_test056.jpg";
import img4 from "@/assets/doc_test060.jpg";
import img5 from "@/assets/doc_test063.jpg";
import img6 from "@/assets/doc_test068.jpg";

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
  setCanvas(img1);
  setCanvas(img2);
  setCanvas(img3);
  setCanvas(img4);
  setCanvas(img5);
  setCanvas(img6);
};

const setCanvas = (src: string) => {
  const img = document.createElement("img");
  img.src = src;
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
    drawPath(
      ctx,
      getDetectCirclePath(square, {
        xRatio: 320 / width,
        yRatio: 320 / height,
      })
    );

    drawPath(
      ctx,
      await getDetectFitPath(square, {
        xRatio: 320 / width,
        yRatio: 320 / height,
      }),
      "line"
    );
    document.body.appendChild(canvas);
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
