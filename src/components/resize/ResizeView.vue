<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import {
  getDetectFitPath,
  getDetectCirclePath,
  drawPath,
  drawDetectLines,
} from "@/utils";

let IS_CIRCLE_RESIZE = false;
let IS_FIT_RESIZE = false;
let SELECT_CIRCLE_DERECTION = 0;
let SELECT_FIT_DERECTION = 0;
let START_X = 0;
let START_Y = 0;

const store = useStore();
const { current, isLoader, square } = storeToRefs(store);

const wrap = ref<HTMLDivElement | null>(null);
const imgEl = ref<HTMLImageElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

isLoader.value = true;

const setCtx = async () => {
  if (
    !canvas.value ||
    !ctx.value ||
    !wrap.value ||
    !current.value ||
    !imgEl.value ||
    !square.value
  ) {
    return;
  }
  const rectImg = imgEl.value.getBoundingClientRect();
  const width = rectImg.width;
  const height = rectImg.height;
  const xRatio = width / current.value.img.naturalWidth;
  const yRatio = height / current.value.img.naturalHeight;

  current.value.circlePath = await getDetectCirclePath(square.value, {
    xRatio,
    yRatio,
  });

  current.value.fitPath = await getDetectFitPath(square.value, {
    xRatio,
    yRatio,
  });

  canvas.value.width = width;
  canvas.value.height = height;

  drawDetectLines(ctx.value, square.value, { xRatio, yRatio });
  drawPath(ctx.value, current.value.circlePath);
  drawPath(ctx.value, current.value.fitPath);
};

const handlePathSelect = (e: TouchEvent) => {
  if (!canvas.value || !ctx.value || !current.value) {
    return;
  }

  const rect = canvas.value.getBoundingClientRect();
  const clientX = e.touches[0].clientX;
  const clientY = e.touches[0].clientY;
  const offsetX = rect.left;
  const offsetY = rect.top;
  const x = clientX - offsetX;
  const y = clientY - offsetY;

  for (let i = 0; i < current.value.circlePath.length; i++) {
    if (
      !ctx.value.isPointInPath(
        current.value.circlePath[i],
        Math.floor(x),
        Math.floor(y)
      )
    ) {
      continue;
    }
    IS_CIRCLE_RESIZE = true;
    SELECT_CIRCLE_DERECTION = i;
    break;
  }
  if (!IS_CIRCLE_RESIZE) {
    for (let i = 0; i < current.value.fitPath.length; i++) {
      if (
        !ctx.value.isPointInPath(
          current.value.fitPath[i],
          Math.floor(x),
          Math.floor(y)
        )
      ) {
        continue;
      }
      IS_FIT_RESIZE = true;
      SELECT_FIT_DERECTION = i;
      break;
    }
  }

  const startX = clientX - offsetX;
  const startY = clientY - offsetY;
  START_X = startX;
  START_Y = startY;
};

const handlePathResize = (e: TouchEvent) => {
  if (!IS_CIRCLE_RESIZE && !IS_FIT_RESIZE) {
    return;
  }
  if (!current.value || !canvas.value || !square.value) {
    return;
  }

  const rectCanvas = canvas.value.getBoundingClientRect();
  const wRatio = rectCanvas.width / current.value.img.naturalWidth;
  const hRatio = rectCanvas.height / current.value.img.naturalHeight;
  const rect = canvas.value.getBoundingClientRect();
  const clientX = e.touches[0].clientX;
  const clientY = e.touches[0].clientY;
  const offsetX = rect.left;
  const offsetY = rect.top;
  const x = clientX - offsetX;
  const y = clientY - offsetY;

  const dx = (START_X - x) / wRatio;
  const dy = (START_Y - y) / hRatio;
  START_X = x;
  START_Y = y;
  if (IS_CIRCLE_RESIZE) {
    switch (SELECT_CIRCLE_DERECTION) {
      case 0:
        square.value.cx = square.value.cx - dx;
        square.value.cy = square.value.cy - dy;
        break;
      case 1:
        square.value.lines[0].dx = square.value.lines[0].dx - dx;
        square.value.lines[0].dy = square.value.lines[0].dy - dy;
        break;
      case 2:
        square.value.lines[1].dx = square.value.lines[1].dx - dx;
        square.value.lines[1].dy = square.value.lines[1].dy - dy;
        break;
      case 3:
        square.value.lines[2].dx = square.value.lines[2].dx - dx;
        square.value.lines[2].dy = square.value.lines[2].dy - dy;
        break;
      default:
        break;
    }
  } else if (IS_FIT_RESIZE) {
    switch (SELECT_FIT_DERECTION) {
      case 0:
        square.value.cx = square.value.cx - dx;
        square.value.cy = square.value.cy - dy;
        square.value.lines[0].dx = square.value.lines[0].dx - dx;
        square.value.lines[0].dy = square.value.lines[0].dy - dy;
        break;
      case 1:
        square.value.lines[0].dx = square.value.lines[0].dx - dx;
        square.value.lines[0].dy = square.value.lines[0].dy - dy;
        square.value.lines[1].dx = square.value.lines[1].dx - dx;
        square.value.lines[1].dy = square.value.lines[1].dy - dy;
        break;
      case 2:
        square.value.lines[1].dx = square.value.lines[1].dx - dx;
        square.value.lines[1].dy = square.value.lines[1].dy - dy;
        square.value.lines[2].dx = square.value.lines[2].dx - dx;
        square.value.lines[2].dy = square.value.lines[2].dy - dy;
        break;
      case 3:
        square.value.lines[2].dx = square.value.lines[2].dx - dx;
        square.value.lines[2].dy = square.value.lines[2].dy - dy;
        square.value.cx = square.value.cx - dx;
        square.value.cy = square.value.cy - dy;
        break;
      default:
        break;
    }
  }
  setCtx();
};

const handlePathResized = () => {
  IS_CIRCLE_RESIZE = false;
  IS_FIT_RESIZE = false;
};

onMounted(async () => {
  if (!canvas.value || !imgEl.value || !current.value) {
    return;
  }
  ctx.value = canvas.value.getContext("2d");
  square.value = JSON.parse(JSON.stringify(current.value.square));
  const cloneImg = current.value.img.cloneNode(true) as HTMLImageElement;

  imgEl.value.src = cloneImg.src;
  imgEl.value.onload = async () => {
    await setCtx();
    isLoader.value = false;
  };
});
</script>

<template>
  <article ref="" class="middle">
    <div ref="wrap" class="wrap">
      <img ref="imgEl" alt="" />
      <div class="canvas-wrap">
        <canvas
          ref="canvas"
          class="canvas"
          @touchstart="handlePathSelect"
          @touchmove="handlePathResize"
          @touchend="handlePathResized"
        ></canvas>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.middle {
  height: 100%;

  .wrap {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 100%;
    }

    .canvas-wrap {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
