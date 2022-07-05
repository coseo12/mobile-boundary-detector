<script setup lang="ts">
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

let FILES: File[] = [];

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

const onShareCheck = () => {
  if (selection.value.length === 0) {
    store.onDialog("alert", ["파일을 선택해주세요"]);
    return;
  }
  FILES = [];
  try {
    isLoader.value = true;
    for (const s of selection.value) {
      fileTransfer(s, () => {
        if (FILES.length !== selection.value.length) {
          return;
        }
        onShare();
      });
    }
  } catch (error) {
    console.error(error);
    isLoader.value = false;
  }
};

const fileTransfer = (id: string, cb: Function) => {
  try {
    const find = documents.value.find((f) => f.id === id);
    if (!find) {
      return;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = find.cropImg;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const file = new File([blob], `${id}.png`, {
        type: "image/png",
      });
      FILES.push(file);
      cb();
    });
  } catch (error) {
    console.error(error);
    store.onToast("파일을 변환할 수 없습니다.");
  }
};

const onShare = () => {
  try {
    const data = {
      title: "Textscope",
      text: "Share images",
      files: FILES,
    };
    navigator.share(data);
  } catch (error) {
    console.error(error);
    store.onToast("지원하지 않는 브라우저 입니다.");
  } finally {
    selection.value = [];
    isLoader.value = false;
  }
};
</script>

<template>
  <article class="top-btn">
    <RoundBtn icons="back" @touchend="onBack" />
    <p>내 문서</p>
    <div class="btn-wrap">
      <RoundBtn :icons="isDrag ? 'document' : 'order'" @touchend="onDrag" />
      <RoundBtn v-if="!isDrag" icons="delete" @touchend="onDelete" />
      <RoundBtn v-if="!isDrag" icons="share" @touchend="onShareCheck" />
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
