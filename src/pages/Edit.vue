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

  .middle {
    position: relative;
    display: flex;
    align-items: center;
    height: 100px;
    min-height: 80px;
  }

  .bottom {
    width: 100%;
    height: 80px;
  }
}
</style>
