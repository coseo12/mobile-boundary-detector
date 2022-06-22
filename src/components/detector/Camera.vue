<script setup lang="ts">
import Copyright from "@/components/common/Copyright.vue";
import Preview from "@/components/detector/Preview.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { documents } = storeToRefs(store);
</script>

<template>
  <article aria-label="camera wrapper" class="camera-wrapper">
    <div class="video-wrap">
      <video />
    </div>
    <Copyright class="copyright" />
    <Preview />
  </article>
</template>

<style lang="scss" scoped>
.camera-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .video-wrap {
    width: 100%;
    height: 100%;
    background-color: $point-blue;
  }

  .copyright {
    position: absolute;
    bottom: 95px;
    opacity: 0.5;
  }
}
</style>
