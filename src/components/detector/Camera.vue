<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Copyright from "@/components/common/Copyright.vue";
import Preview from "@/components/common/Preview.vue";
import { useStore } from "@/store";
// import { storeToRefs } from "pinia";
// import {} from "@/utils";

let RECT_WIDTH = 0;
let RECT_HEIGHT = 0;
let CAMERA_WIDTH = 0;
let CAMERA_HEIGHT = 0;
let ANIMATIONFRAME = null;
let IS_DETECT = false;

const VIDEO_WIDTH = 3840;
const VIDEO_HEIGHT = 2160;
const IS_MOBILE = navigator.userAgent.toLocaleLowerCase().includes("mobile");

const store = useStore();

const stream = ref<MediaStream | null>(null);
const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);

const getStream = async () => {
  if (!video.value) {
    return;
  }
  try {
    const initalConstrains = {
      audio: false,
      video: {
        facingMode: "environment",
        width: { ideal: VIDEO_WIDTH },
        height: { ideal: VIDEO_HEIGHT },
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

    video.value.addEventListener("loadeddata", (event) => {
      setBoundingClientRect();
    });
  } catch (error) {
    console.log(error);
    store.onToast("카메라 정보를 가져올 수 없습니다.");
  }
};

const animate = async (t = 0) => {
  if (!video.value) {
    return;
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = CAMERA_WIDTH;
  canvas.height = CAMERA_HEIGHT;

  ctx.drawImage(video.value, 0, 0, CAMERA_WIDTH, VIDEO_HEIGHT);

  const dataUrl = await canvas.toDataURL();
  const imgEl = new Image();
  imgEl.src = dataUrl;
  imgEl.onload = async () => {
    console.log("img loaded", imgEl.naturalWidth, imgEl.naturalHeight);
    document.body.appendChild(imgEl);
  };
};

const setBoundingClientRect = () => {
  if (!wrapper.value || !video.value) {
    return;
  }
  const rect = wrapper.value.getBoundingClientRect();
  const videoRect = video.value.getBoundingClientRect();
  RECT_WIDTH = rect.width;
  RECT_HEIGHT = rect.height;
  CAMERA_WIDTH = videoRect.width;
  CAMERA_HEIGHT = videoRect.height;

  video.value.width = RECT_WIDTH;
};

onMounted(async () => {
  await getStream();
  // await setBoundingClientRect();

  setTimeout(() => {
    animate();
  }, 3000);
});

onUnmounted(() => {
  if (!video.value || !stream.value) {
    return;
  }
  video.value.pause();
  video.value.src = "";
  stream.value.getTracks()[0].stop();
});
</script>

<template>
  <article ref="wrapper" aria-label="camera wrapper" class="camera-wrapper">
    <div class="video-wrap">
      <video ref="video" autoplay muted playsInline />
      <canvas ref="canvas"></canvas>
    </div>
    <Copyright class="copyright" />
    <Preview class="float" />
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

  .float {
    position: absolute;
    left: 0;
    bottom: -10px;
  }

  .copyright {
    position: absolute;
    bottom: 95px;
    opacity: 0.5;
  }
}
</style>
