<script setup lang="ts">
import { ref } from "vue";
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useStore();
const { documents } = storeToRefs(store);

const onCrop = () => {
  router.push({
    name: constants.resize.name,
    params: {
      id: "test",
    },
  });
};
</script>

<template>
  <article class="image-view">
    <div class="btn-wrap">
      <RoundBtn icons="rotate" />
      <RoundBtn icons="crop" @mouseup="onCrop" />
      <RoundBtn icons="delete" />
    </div>
    <div class="pages">{{ `1 / ${documents.values.length}` }}</div>
    <div class="canvas">
      <canvas width="100%" height="100%" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.image-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .btn-wrap {
    padding: 10px 5px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      margin: 0 5px;
      background-color: transparent;
    }
  }

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
    background-color: #333333;
    color: #fff;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
  }

  .canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
