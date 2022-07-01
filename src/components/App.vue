<script setup lang="ts">
import { watch } from "vue";
import ToastProvider from "@/components/providers/ToastProvider.vue";
import DialogProvider from "@/components/providers/DialogProvider.vue";
import Loader from "@/components/common/Loader.vue";
import Flash from "@/components/common/Flash.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { setModel } from "@/utils";

const HEIGHT = `${window.innerHeight}px`;

const store = useStore();
const router = useRouter();
const { isLoading, isLoader, isCapture } = storeToRefs(store);

const onLoadedModel = async () => {
  await setModel();
  isLoading.value = false;
  router.push({
    name: constants.detector.name,
    // params: {
    //   id: "test1",
    // },
  });

  // await store.setDocuments();
};
onLoadedModel();

// watch(store.documents, () => {
//   if (store.documents.length > 5) {
//     router.push({
//       name: constants.edit.name,
//       params: {
//         id: "test1",
//       },
//     });
//   }
// });
</script>

<template>
  <main>
    <Flash v-show="isCapture" />
    <Loader v-show="isLoader" />
    <ToastProvider>
      <DialogProvider>
        <router-view></router-view>
      </DialogProvider>
    </ToastProvider>
  </main>
</template>

<style lang="scss">
@import "@/scss/_reset.scss";
@import "@/scss/_global.scss";

main {
  position: relative;
  max-width: 512px;
  max-height: v-bind("HEIGHT");

  .dialog {
    button {
      color: black;
    }
  }
}
</style>
