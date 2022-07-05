<script setup lang="ts">
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useStore();
const { documents, isDrag, selection, isLoader } = storeToRefs(store);

const onBack = () => {
  router.push({ name: constants.detector.name });
};

const onDrag = () => {
  isDrag.value = !isDrag.value;
};

const onDelete = () => {
  store.onDialog(
    "confirm",
    ["삭제된 파일은 복구할 수 없습니다.", "정말 삭제하시겠습니까?"],
    ["취소", "삭제"],
    () => {
      isLoader.value = true;
      setTimeout(async () => {
        documents.value = documents.value.filter(
          (f) => !selection.value.includes(f.id)
        );
        selection.value = [];
        isLoader.value = false;
      });
    }
  );
};

const onShare = () => {};
</script>

<template>
  <article class="top-btn">
    <RoundBtn icons="back" @touchend="onBack" />
    <p>내 문서</p>
    <div class="btn-wrap">
      <RoundBtn :icons="isDrag ? 'document' : 'order'" @touchend="onDrag" />
      <RoundBtn v-if="!isDrag" icons="delete" @touchend="onDelete" />
      <RoundBtn v-if="!isDrag" icons="share" @touchend="onShare" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.top-btn {
  display: flex;
  padding: 10px;

  button {
    background-color: transparent;
  }

  p {
    padding: 0 10px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
  }

  .btn-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
