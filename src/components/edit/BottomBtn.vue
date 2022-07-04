<script setup lang="ts">
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { current, currentPage, documents } = storeToRefs(store);
const router = useRouter();

const onDetector = () => {
  router.push({
    name: constants.detector.name,
  });
};

const onNext = () => {
  const find = documents.value[currentPage.value];
  if (!find) {
    store.onToast("마지막 이미지입니다.");
    return;
  }
  router.push({
    name: constants.edit.name,
    params: {
      id: current.value?.id || "",
    },
  });
};
</script>

<template>
  <article class="bottom-wrap">
    <div class="box">
      <button type="button" class="primary2" @touchend="onDetector">
        페이지 추가
      </button>
    </div>
    <div class="box">
      <button type="button" class="primary1" @touchend="onNext">다음</button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.bottom-wrap {
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 5px;

  .box {
    width: 50vw;
    margin: 0 5px;

    background-color: "red";
  }
}
</style>
