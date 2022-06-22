<script setup leng="ts">
import TopBtn from "@/components/detector/TopBtn.vue";
import Camera from "@/components/detector/Camera.vue";
import BottomBtn from "@/components/detector/BottomBtn.vue";
</script>

<template>
  <section class="detector" aria-label="Detector">
    <TopBtn class="top-btn-wrap" />
    <Camera class="camera-wrap" />
    <BottomBtn class="bottom-btn-wrap" />
  </section>
</template>

<style lang="scss" scoped>
.detector {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $lomin-deep-black;
  display: flex;
  flex-direction: column;

  .top-btn-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .camera-wrap {
    height: 80vh;
    background-color: $lomin-deep-black;
  }

  .bottom-btn-wrap {
    height: 20vh;
    background-color: $lomin-deep-black;
  }
}
</style>
