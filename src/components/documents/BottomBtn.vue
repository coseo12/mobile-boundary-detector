<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { isDrag } = storeToRefs(store);

const onDelete = () => {};
</script>

<template>
  <article v-show="isDrag" class="bottom-btn">
    <button type="button" class="delete" @touchend="onDelete">삭제</button>
  </article>
</template>

<style lang="scss" scoped>
.bottom-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  .delete {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 5px;
    background-color: $lomin-deep-orange;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
