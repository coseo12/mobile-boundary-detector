<script setup lang="ts">
import { ref } from "vue";
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { getSquare } from "@/utils";

const store = useStore();
const { documents } = storeToRefs(store);
const router = useRouter();
const fileEl = ref<HTMLInputElement | null>(null);

const onEdit = () => {
  router.push({
    name: constants.edit.name,
    params: {
      id: "test",
    },
  });
};

const onUpload = () => {
  if (!fileEl.value) {
    return;
  }
  fileEl.value.click();
};

const onChange = (e: Event) => {
  const el = e.target as HTMLInputElement;
  if (!el) {
    return;
  }

  const files = el.files;
  if (!files) {
    return;
  }

  for (let i = 0; i < files.length; i++) {}
};

const onCapture = () => {
  store.capture(async (img) => {
    const square = await getSquare(img);
    if (square) {
      documents.value.push({
        id: `${Date.now()}`,
        img,
        square,
        circlePath: [],
        fitPath: [],
      });
    } else {
      store.onToast("문서의 네 꼭지점이 모두 보이도록 촬영해주세요.");
    }
  });
};
</script>

<template>
  <article aria-label="bottom button wrapper" class="bottom-btn">
    <div class="box">
      <RoundBtn icons="upload" @mouseup="onUpload" />
    </div>
    <div class="box">
      <button class="r0" @mouseup="onCapture"></button>
    </div>
    <div class="box">
      <RoundBtn icons="edit" @mouseup="onEdit" />
    </div>
    <input
      ref="fileEl"
      type="file"
      accept="image/png, image/jpeg, image/jpg"
      multiple
      @change="onChange"
    />
  </article>
</template>

<style lang="scss" scoped>
.bottom-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.5vw;
  .box {
    width: 33vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .r0 {
      width: 70px;
      height: 70px;
      border: 5px solid #555555;
      border-radius: 50%;
      background-color: #e0e0e0;

      &:active {
        background-color: $lomin-deep-orange;
      }
    }
  }

  input {
    display: none;
  }
}
</style>
