<script setup leng="ts">
import Preview from "@/components/common/Preview.vue";
import BottomBtn from "@/components/edit/BottomBtn.vue";
import ImageView from "@/components/edit/ImageView.vue";

const HEIGHT = `${window.innerHeight}px`;
</script>

<template>
  <section aria-label="Edit" class="edit">
    <ImageView class="top" />
    <Preview class="middle" />
    <BottomBtn class="bottom" />
  </section>
</template>

<style lang="scss" scoped>
.edit {
  width: 100%;
  height: v-bind("HEIGHT");
  background-color: $lomin-deep-black;
  display: flex;
  flex-direction: column;

  .top {
    height: calc(100vh - 160px);
  }

  .middle {
    position: relative;
    bottom: -10px;
  }

  .bottom {
    width: 100%;
    height: 60px;
  }
}
</style>
