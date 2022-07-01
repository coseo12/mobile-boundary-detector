<script setup lang="ts">
import { ref } from "vue";
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore, Square } from "@/store";
import { storeToRefs } from "pinia";
import { getSquare, getCropImg } from "@/utils";

const store = useStore();
const { documents, isLoader, isCapture } = storeToRefs(store);
const router = useRouter();
const fileEl = ref<HTMLInputElement | null>(null);

const onEdit = () => {
  router.push({
    name: constants.edit.name,
    params: {
      id: documents.value[0].id,
    },
  });
};

const onUpload = () => {
  if (!fileEl.value) {
    return;
  }
  fileEl.value.click();
};

const setDocuments = async (img: HTMLImageElement, square: Square) => {
  const cropImg = await getCropImg(img, square);
  documents.value.unshift({
    id: `${Date.now()}`,
    img,
    square,
    circlePath: [],
    fitPath: [],
    cropImg,
    deg: 0,
  });
};

const onChange = async (e: Event) => {
  isLoader.value = true;
  const el = e.target as HTMLInputElement;
  if (!el) {
    return;
  }

  const files = el.files;
  if (!files) {
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const buffer = await files[i].arrayBuffer();
    const blob = new Blob([buffer], { type: "image" });
    const url = window.URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    img.onload = async () => {
      const square = await getSquare(img);
      if (square && square.lines.length === 3) {
        setDocuments(img, square);
        if (i === files.length - 1) {
          isLoader.value = false;
        }
      } else {
        store.onToast(`인식할 수 없는 이미지입니다.`);
        isLoader.value = false;
      }
    };
  }
};

const onCapture = () => {
  isCapture.value = true;
  setTimeout(() => {
    isCapture.value = false;
    isLoader.value = true;
    store.capture(async (img) => {
      const square = await getSquare(img);
      if (square && square.lines.length === 3) {
        setDocuments(img, square);
      } else {
        store.onToast("문서의 네 꼭지점이 모두 보이도록 촬영해주세요.");
      }
      isCapture.value = false;
      isLoader.value = false;
    });
  }, 1);
};
</script>

<template>
  <article aria-label="bottom button wrapper" class="bottom-btn">
    <div class="box">
      <RoundBtn icons="upload" @touchend="onUpload" />
    </div>
    <div class="box">
      <button class="r0" @touchend="onCapture"></button>
    </div>
    <div class="box">
      <RoundBtn v-if="documents.length > 0" icons="edit" @touchend="onEdit" />
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
