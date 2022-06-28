<script setup lang="ts">
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
const store = useStore();
const { documents } = storeToRefs(store);

const router = useRouter();

const onDetector = () => {
  router.push({
    name: constants.detector.name,
  });
};

const onNext = () => {};
</script>

<template>
  <article class="bottom-wrap">
    <div class="box">
      <button type="button" class="primary2" @click="onDetector">
        페이지 추가
      </button>
    </div>
    <div class="box">
      <button type="button" class="primary1">다음</button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.bottom-wrap {
  display: flex;
  align-items: center;
  padding: 0 5px;

  .box {
    width: 50vw;
    margin: 0 5px;
  }
}
</style>
