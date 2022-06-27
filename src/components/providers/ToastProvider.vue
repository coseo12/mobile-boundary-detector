<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { toastMsg, isToast } = storeToRefs(store);
</script>

<template>
  <div class="toast" :class="{ on: isToast }">{{ toastMsg }}</div>
  <slot />
</template>

<style lang="scss" scoped>
.toast {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translate(-50%, -300%);
  padding: 5px 15px;
  background-color: $lomin-deep-orange;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 30px;
  z-index: 3;
  transition: transform 0.2s linear;

  &.on {
    transform: translate(-50%, 0%);
  }
}
</style>
