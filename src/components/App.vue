<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getModel } from "@/utils";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";

const store = useStore();
const router = useRouter();
const { isLoading, model } = storeToRefs(store);

const modal = ref<HTMLDialogElement | null>(null);

const onLoadedModel = async () => {
  model.value = await getModel();
  isLoading.value = false;
  router.push(constants.detector.path);
};
// onLoadedModel();

const test = (e: any) => {
  if (!modal.value) {
    return;
  }
  console.log(typeof modal.value);

  modal.value.showModal();
};
</script>

<template>
  <main>
    <dialog ref="modal" class="dialog">
      <p>여러분 안녕하세요!</p>
    </dialog>
    <button @click="test">open</button>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
@import "@/scss/_reset.scss";
@import "@/scss/_global.scss";

main {
  max-width: 512px;
  width: 100%;
  height: 100vh;

  //   .dialog {
  //     width: 100%;
  //     height: 100%;
  //     z-index: 3;
  //     background-color: transparent;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     color: white;
  //   }
}
</style>
