<script setup lang="ts">
import BottomBtn from "@/components/resize/BottomBtn.vue";
import TopBtn from "@/components/resize/TopBtn.vue";
import ResizeView from "@/components/resize/ResizeView.vue";

const HEIGHT = `${window.innerHeight}px`;
</script>

<template>
  <section class="resize" aria-label="Resized">
    <!-- <TopBtn class="top" /> -->
    <ResizeView class="middle" />
    <BottomBtn class="bottom" />
  </section>
</template>

<style lang="scss" scoped>
.resize {
  position: relative;
  width: 100%;
  height: v-bind("HEIGHT");
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // .top {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   height: 60px;
  //   background-color: $lomin-deep-black;
  // }

  .middle {
    height: calc(100%);
  }

  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60px;
  }
}
</style>
