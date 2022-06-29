<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { constants } from "@/router";

interface Props {
  isPush?: boolean;
  stopCallback?: Function;
}

const props = defineProps<Props>();

const router = useRouter();
const store = useStore();
const { documents, current, currentPage, isLoader } = storeToRefs(store);

const cards = ref<HTMLDivElement[]>([]);

const onDocuments = (id: string, idx: number) => {
  if (props.stopCallback) {
    // props.stopCallback();
  }
  if (props.isPush) {
    isLoader.value = true;
    setTimeout(() => {
      router.push({
        name: constants.edit.name,
        params: {
          id,
        },
      });
    });
    return;
  }
  const find = documents.value.find((f) => f.id === id);
  if (!find) {
    return;
  }
  current.value = find;
  currentPage.value = idx + 1;
};

watch(currentPage, () => {
  if (cards.value.length === 0) {
    return;
  }
  setTimeout(() => {
    cards.value[currentPage.value - 1].scrollIntoView({
      block: "nearest",
      inline: "end",
      behavior: "smooth",
    });
  }, 300);
});
</script>

<template>
  <div class="preview-wrap">
    <div
      ref="cards"
      v-for="(d, idx) in documents"
      class="card"
      :data-id="`p-${idx + 1}`"
      @touchend="onDocuments(d.id, idx)"
    >
      <div class="badge">{{ idx + 1 }}</div>
      <img :src="d.img.src" alt="img" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview-wrap {
  width: 100%;
  height: 100px;
  overflow-x: scroll;
  display: flex;
  padding: 5px;

  .card {
    position: relative;
    margin: 0 5px;
    width: 70px;
    height: 80px;
    flex: 0 0 auto;

    .badge {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      font-size: 12px;
      font-weight: 600;
      margin: 3px;
      border-radius: 50%;
      background-color: $lomin-deep-orange;
      color: #fff;
    }

    img {
      display: block;
      width: 70px;
      height: 80px;
    }
  }
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-thumb {
  background: transparent;
}
::-webkit-scrollbar-thumb:hover {
  background: transparent;
}
</style>
