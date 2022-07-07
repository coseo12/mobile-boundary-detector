<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { constants } from "@/router";
import { getCropImg, getImgRotate } from "@/utils";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { current, square, isLoader } = storeToRefs(store);
const router = useRouter();
const routes = useRoute();

const onSave = async () => {
  isLoader.value = true;
  setTimeout(async () => {
    if (!current.value || !square.value) {
      return;
    }
    current.value.square = square.value;
    current.value.cropImg = await getCropImg(current.value.img, square.value);
    for (let i = 0; i < Math.abs(current.value.deg) / 90; i++) {
      current.value.cropImg = await getImgRotate(current.value.cropImg);
    }
    router.push({
      name: constants.edit.name,
      params: {
        id: routes.params.id || "",
      },
    });
  }, 200);
};
</script>

<template>
  <article class="bottom-btn">
    <button type="button" class="save" @touchend="onSave">저장</button>
  </article>
</template>

<style lang="scss" scoped>
.bottom-btn {
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
</style>
