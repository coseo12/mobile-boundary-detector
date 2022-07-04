<script setup lang="ts">
import BottomBtn from "@/components/resize/BottomBtn.vue";
import TopBtn from "@/components/resize/TopBtn.vue";
import ResizeView from "@/components/resize/ResizeView.vue";

const HEIGHT = `${window.innerHeight}px`;
</script>

<template>
  <section class="resize" aria-label="Resized">
    <TopBtn class="top" />
    <ResizeView class="middle" />
    <BottomBtn class="bottom" />
  </section>
</template>

<style lang="scss" scoped>
.resize {
  width: 100%;
  height: v-bind("HEIGHT");
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .top {
    height: 60px;
  }

  .middle {
    height: calc(100% - 120px);
  }

  .bottom {
    height: 60px;
  }
}
</style>
