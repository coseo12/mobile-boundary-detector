<script setup lang="ts">
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const router = useRouter();
const { isFlash, flashMode, documents } = storeToRefs(store);

const onFlash = () => {
  if (!isFlash.value) {
    // alert("현재 브라우저에서는 사용이 불가능합니다.");
  }
};

const onDocuments = () => {
  if (documents.value.length === 0) {
    store.onToast("문서가 존재하지 않습니다.");
    return;
  }
  store.isDrag = false;
  router.push(constants.documents.path);
};
</script>

<template>
  <article aria-label="top button wrapper" class="top-btn">
    <RoundBtn icons="document" @touchend="onDocuments" />
    <RoundBtn v-if="flashMode === 'flash'" icons="flash" @touchend="onFlash" />
    <RoundBtn
      v-else-if="flashMode === 'auto'"
      icons="flash-auto"
      @click="onFlash"
    />
    <div></div>
    <!-- <RoundBtn
      v-else-if="flashMode === 'off'"
      icons="flash-off"
      @click="onFlash"
    /> -->
  </article>
</template>

<style lang="scss" scoped>
.top-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 2;
}
</style>
