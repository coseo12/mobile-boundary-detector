<script setup lang="ts">
import { ref } from "vue";
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter, useRoute } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { getCropImg } from "@/utils";

let IS_SWIPE = false;
let START_X = 0;
let END_X = 0;

const routes = useRoute();
const router = useRouter();
const store = useStore();
const { documents, current, currentPage } = storeToRefs(store);

const wrap = ref<HTMLDivElement | null>(null);
const cards = ref<HTMLDivElement[]>([]);

current.value =
  documents.value.find((f) => f.id === routes.params.id) ||
  documents.value[0] ||
  null;

const onCrop = () => {
  router.push({
    name: constants.resize.name,
    params: {
      id: current.value?.id || "test",
    },
  });
};

const onSwipeStart = (e: TouchEvent) => {
  IS_SWIPE = true;
  START_X = e.changedTouches[0].clientX;
};

const onSwipeEnd = () => {
  IS_SWIPE = false;
  if (!wrap.value || cards.value.length === 0) {
    return;
  }
  const gab = END_X - START_X;

  switch (true) {
    case gab < -120:
      setTimeout(() => {
        const page =
          currentPage.value === cards.value.length
            ? currentPage.value
            : currentPage.value + 1;
        cards.value[page - 1].scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
      break;
    case gab > 120:
      setTimeout(() => {
        const page = currentPage.value > 1 ? currentPage.value - 1 : 1;
        cards.value[page - 1].scrollIntoView({
          behavior: "smooth",
        });
        currentPage.value = page;
      }, 500);
      break;
    default:
      setTimeout(() => {
        cards.value[currentPage.value - 1].scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
      break;
  }
};

const onSwipe = (e: TouchEvent) => {
  if (!IS_SWIPE || !wrap.value || cards.value.length === 0) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  END_X = e.changedTouches[0].clientX;
};

setTimeout(() => {});
</script>

<template>
  <article class="image-view">
    <div class="btn-wrap">
      <RoundBtn icons="rotate" />
      <RoundBtn icons="crop" @mouseup="onCrop" />
      <RoundBtn icons="delete" />
    </div>
    <div class="pages">{{ `${currentPage} / ${documents.length}` }}</div>
    <div class="carousel">
      <div
        ref="wrap"
        class="wrap"
        :draggable="true"
        @touchstart="onSwipeStart"
        @touchend="onSwipeEnd"
        @touchmove="onSwipe"
      >
        <div ref="cards" v-for="d in documents" class="card">
          <img :src="getCropImg(d.img, d.square).src" />
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.image-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .btn-wrap {
    padding: 10px 5px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      margin: 0 5px;
      background-color: transparent;
    }
  }

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
    background-color: #333333;
    color: #fff;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    padding: 5px;
  }

  .carousel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    transition: transform 0.4 linear;
    .wrap {
      display: flex;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      .card {
        flex: 0 0 auto;
        width: 100%;
        padding: 20px 40px;

        img {
          width: 100%;
          max-height: 380px;
          border-radius: 5px;
        }
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
}
</style>
