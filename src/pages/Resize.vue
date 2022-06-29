<script setup lang="ts">
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";

const HEIGHT = `${window.innerHeight}px`;

const router = useRouter();

const onBack = () => {};

const onSave = () => {};
</script>

<template>
  <section class="resize" aria-label="Resized">
    <article class="top">
      <RoundBtn icons="back" @touchend="onBack" />
    </article>
    <article class="middle"></article>
    <article class="bottom">
      <button type="button" class="save" @touchend="onSave">저장</button>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.resize {
  width: 100%;
  height: v-bind("HEIGHT");
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: $lomin-deep-black;

  .top {
    padding: 10px;

    button {
      background-color: transparent;
    }
  }

  .middle {
    height: 100%;
    background-color: lightcoral;
  }

  .bottom {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    .save {
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
}
</style>
