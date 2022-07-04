<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import Copyright from "@/components/common/Copyright.vue";
import Preview from "@/components/common/Preview.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import {
  getSquare,
  getDetectCirclePath,
  drawDetectLines,
  drawPath,
} from "@/utils";

let RECT_WIDTH = 0;
let RECT_HEIGHT = 0;
let REQUEST_ANIMATION_FRAME = 0;
let DETECT_COUNT = 0;
let MAX_DETECT_COUNT = 0;
let IS_DETECT = false;

/*
 * ----- 16:9 -----
 * 3840 * 2160 (UHD)
 * 2560 * 1440 (QHD)
 * 1920 * 1080 (FHD)
 * 1600 * 900 (HD+)
 * 1280 * 720 (HD)
 * 960 * 540 (qHD)
 * 640 * 360 (nHD)
 */

const VIDEO_WIDTH = 540;
const VIDEO_HEIGHT = 960;

const DETECT_RESOLUTION = {
  WIDTH: 2560,
  HEIGHT: 1440,
};

const CAPTURE_RESOLUTION = {
  WIDTH: 2160,
  HEIGHT: 3840,
};

const IS_MOBILE = navigator.userAgent.toLocaleLowerCase().includes("mobile");

const store = useStore();
const { video, cameraHeight, cameraWidth, isLoader, isCapture } =
  storeToRefs(store);

const stream = ref<MediaStream | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const wrapper = ref<HTMLElement | null>(null);

const getStream = async () => {
  if (!video.value) {
    return;
  }
  try {
    cancelAnimationFrame(REQUEST_ANIMATION_FRAME);
    const initalConstrains = {
      audio: false,
      video: {
        facingMode: "environment",
        width: {
          ideal: DETECT_RESOLUTION.WIDTH,
        },
        height: {
          ideal: DETECT_RESOLUTION.HEIGHT,
        },
      },
    };
    const cameraConstrainsts = {
      audio: false,
      video: {
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
      },
    };
    if (!navigator.mediaDevices.getUserMedia) {
      return;
    }
    stream.value = await navigator.mediaDevices.getUserMedia(
      !IS_MOBILE ? cameraConstrainsts : initalConstrains
    );

    video.value.srcObject = stream.value;

    video.value.addEventListener("loadeddata", async (event) => {
      if (stream.value) {
        isLoader.value = false;
      }
      await setBoundingClientRect();
      detect();
    });
  } catch (error) {
    console.log(error);
    store.onDialog("alert", [
      "텍스트스코프 자동 인식 기능 이용을 위해서는",
      "카메라 엑세스 권한이필요합니다.",
    ]);
    isLoader.value = false;
  }
};

const detect = (t = 0) => {
  if (isCapture.value) {
    return;
  }
  if (!IS_DETECT) {
    IS_DETECT = true;
    store.capture(async (img) => {
      if (DETECT_COUNT === 0) {
        if (!canvas.value || !ctx.value) {
          return;
        }
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
        const square = await getSquare(img);
        const options = {
          xRatio: canvas.value.width / img.naturalWidth,
          yRatio: canvas.value.height / img.naturalHeight,
        };
        if (square) {
          drawDetectLines(ctx.value, square, options);
          const circles = getDetectCirclePath(square, options);
          drawPath(ctx.value, circles);
        }
      }
      DETECT_COUNT = DETECT_COUNT === MAX_DETECT_COUNT ? 0 : DETECT_COUNT + 1;
      IS_DETECT = false;
      REQUEST_ANIMATION_FRAME = requestAnimationFrame(detect);
    });
  }
};

const setBoundingClientRect = () => {
  if (!wrapper.value || !video.value || !canvas.value) {
    return;
  }
  const rect = wrapper.value.getBoundingClientRect();
  const videoRect = video.value.getBoundingClientRect();

  const p = document.querySelector(".tmp")!;
  p.innerHTML = `${videoRect.width} * ${videoRect.height}`;

  RECT_WIDTH = rect.width;
  RECT_HEIGHT = rect.height;
  cameraWidth.value = videoRect.width;
  cameraHeight.value = videoRect.height;

  // video.value.width = RECT_WIDTH;
  video.value.height = RECT_HEIGHT;

  const videoFitRect = video.value.getBoundingClientRect();
  ctx.value = canvas.value.getContext("2d");
  canvas.value.width = videoFitRect.width;
  canvas.value.height = videoFitRect.height;
};

const stopCallback = () => {
  if (video.value) {
    video.value.pause();
    video.value.src = "";
  }
  if (stream.value) {
    stream.value.getTracks()[0].stop();
    stream.value = null;
  }
  if (ctx.value && canvas.value) {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
  cancelAnimationFrame(REQUEST_ANIMATION_FRAME);
};

watch(isCapture, () => {
  if (isCapture.value) {
    getStream();
  }
});

onMounted(async () => {
  isLoader.value = true;
  await getStream();
});

onUnmounted(() => {
  stopCallback();
});
</script>

<template>
  <article ref="wrapper" aria-label="camera wrapper" class="camera-wrapper">
    <div class="video-wrap">
      <video ref="video" autoplay muted playsInline />
      <canvas ref="canvas" class="line-view"></canvas>
    </div>
    <p class="tmp" />
    <Copyright class="copyright" />
    <Preview :is-push="true" :stop-callback="stopCallback" class="float" />
  </article>
</template>

<style lang="scss" scoped>
.camera-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .video-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .line-view {
      position: absolute;
    }
  }

  .float {
    position: absolute;
    left: 0;
    bottom: -10px;
  }

  .copyright {
    position: absolute;
    bottom: 75px;
    opacity: 0.5;
  }

  .tmp {
    position: absolute;
    color: #fff;
    bottom: 95px;
  }
}
</style>
