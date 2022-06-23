<script setup lang="ts">
import DialogProvider from "@/components/providers/DialogProvider.vue";
import { getModel } from "@/utils";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";

const store = useStore();
const router = useRouter();
const { isLoading, model } = storeToRefs(store);

const onLoadedModel = async () => {
  model.value = await getModel();
  isLoading.value = false;
  router.push(constants.detector.path);
};
// onLoadedModel();

// setTimeout(() => {
//   store.onDialog(
//     "confirm",
//     ["삭제된파일은 복구할 수 없습니다.", "정말 삭제하시겠습니까?"],
//     ["취소", "삭제"]
//   );
// }, 1000);
</script>

<template>
  <main>
    <DialogProvider>
      <router-view></router-view>
    </DialogProvider>
  </main>
</template>

<style lang="scss">
@import "@/scss/_reset.scss";
@import "@/scss/_global.scss";

main {
  max-width: 512px;
  width: 100%;
  height: 100vh;

  .dialog {
    button {
      color: black;
    }
  }
}
</style>
