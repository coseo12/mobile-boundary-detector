<script setup lang="ts">
import { watch } from "vue";
import ToastProvider from "@/components/providers/ToastProvider.vue";
import DialogProvider from "@/components/providers/DialogProvider.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { setModel } from "@/utils";

const store = useStore();
const router = useRouter();
const { isLoading } = storeToRefs(store);

const onLoadedModel = async () => {
  await setModel();
  isLoading.value = false;
  // router.push(constants.detector.path);

  await store.setDocuments();
};
onLoadedModel();

watch(store.documents, () => {
  if (store.documents.length > 5) {
    router.push({
      name: constants.edit.name,
      params: {
        id: "test1",
      },
    });
  }
});
</script>

<template>
  <main>
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
  width: 100%;
  height: 100vh;

  .dialog {
    button {
      color: black;
    }
  }
}
</style>
