<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter, useRoute } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { getImgRotate, getRotateSqure } from "@/utils";

let TRANSLATE = 0;
let IS_SWIPE = false;
let START_X = 0;
let END_X = 0;
let PAGE = 1;
let TOTAL_PAGE = 0;
let CARD_WIDTH = 0;
let CARD_HEIGHT = 0;
const routes = useRoute();
const router = useRouter();
const store = useStore();
const { documents, current, currentPage, isLoader } = storeToRefs(store);

const pagging = ref<HTMLDivElement | null>(null);
const swiper = ref<HTMLDivElement | null>(null);
const wrap = ref<HTMLDivElement | null>(null);
const cards = ref<HTMLDivElement[]>([]);

isLoader.value = false;

current.value =
  documents.value.find((f) => f.id === routes.params.id) ||
  documents.value[0] ||
  null;

PAGE = documents.value.indexOf(current.value) + 1;
TOTAL_PAGE = documents.value.length;
currentPage.value = PAGE;

const onRotate = async () => {
  isLoader.value = true;
  setTimeout(async () => {
    if (!current.value) {
      return;
    }
    const img = await getImgRotate(current.value.img);
    const rotateCropImg = await getImgRotate(current.value.cropImg);
    current.value.deg = current.value.deg === 270 ? 0 : current.value.deg + 90;
    img.onload = async () => {
      if (!current.value) {
        return;
      }
      const square = await getRotateSqure(current.value.square);
      if (!square) {
        return;
      }
      documents.value[currentPage.value - 1].img = img;
      documents.value[currentPage.value - 1].cropImg = rotateCropImg;
      documents.value[currentPage.value - 1].square = square;
      current.value = documents.value[currentPage.value - 1];
      isLoader.value = false;
    };
  }, 300);
};

const onCrop = () => {
  router.push({
    name: constants.resize.name,
    params: {
      id: current.value?.id || "test",
    },
  });
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
          (f) => f.id !== current.value?.id
        );
        TOTAL_PAGE = documents.value.length;
        if (TOTAL_PAGE === 0) {
          router.push(constants.detector.path);
          return;
        }
        PAGE = PAGE > TOTAL_PAGE ? TOTAL_PAGE : PAGE;
        currentPage.value = PAGE;
        current.value = documents.value[PAGE - 1];
        isLoader.value = false;
      });
    }
  );
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
    case gab > 120:
      // PREV
      PAGE = PAGE > 1 ? PAGE - 1 : 1;
      break;
    case gab < -120:
      // NEXT
      PAGE = PAGE < TOTAL_PAGE ? PAGE + 1 : PAGE;
      break;
    default:
      break;
  }

  TRANSLATE = CARD_WIDTH * (PAGE - 1) * -1;
  wrap.value.animate(
    [
      {
        transform: `translateX(${TRANSLATE}px)`,
      },
    ],
    { duration: 200, iterations: 1 }
  );

  setTimeout(() => {
    animateEnd();
  }, 200);
  currentPage.value = PAGE;
  if (!pagging.value) {
    return;
  }
  pagging.value.innerText = `${PAGE} / ${TOTAL_PAGE}`;
};

const animateEnd = () => {
  if (!wrap.value || cards.value.length === 0) {
    return;
  }
  setWrapPosition(TRANSLATE);
};

const onSwipe = (e: TouchEvent) => {
  if (!IS_SWIPE || !wrap.value || cards.value.length === 0) {
    return;
  }
  END_X = e.changedTouches[0].clientX;
  const gab = END_X - START_X;
  setWrapPosition(gab + TRANSLATE);
};

const setTranslate = () => {
  TRANSLATE = CARD_WIDTH * (PAGE - 1) * -1;
};

const setWrapPosition = (xPosition: number) => {
  if (!wrap.value) {
    return;
  }
  wrap.value.style.transform = `translateX(${xPosition}px)`;
};

watch(current, () => {
  setTimeout(async () => {
    PAGE = currentPage.value;
    await setTranslate();
    setWrapPosition(TRANSLATE);
    if (!pagging.value) {
      return;
    }
    pagging.value.innerText = `${PAGE} / ${TOTAL_PAGE}`;
  }, 300);
});

onMounted(() => {
  if (!swiper.value || !wrap.value || cards.value.length === 0) {
    return;
  }
  const rect = swiper.value.getBoundingClientRect();
  CARD_WIDTH = rect.width;
  CARD_HEIGHT = rect.height;
  cards.value.forEach((card) => {
    card.style.width = `${CARD_WIDTH}px`;
    card.style.height = `${CARD_HEIGHT}px`;
  });
  setTranslate();
  setWrapPosition(TRANSLATE);
});
</script>

<template>
  <article class="image-view">
    <div class="btn-wrap">
      <RoundBtn icons="rotate" @touchend="onRotate" />
      <RoundBtn icons="crop" @touchend="onCrop" />
      <RoundBtn icons="delete" @touchend="onDelete" />
    </div>
    <div ref="pagging" class="pages">
      {{ `${PAGE} / ${TOTAL_PAGE}` }}
    </div>

    <div ref="swiper" class="swiper">
      <div
        ref="wrap"
        class="wrap"
        @touchstart="onSwipeStart"
        @touchend="onSwipeEnd"
        @touchmove="onSwipe"
        @animationend="animateEnd"
      >
        <div ref="cards" v-for="d in documents" class="card">
          <img :src="d.cropImg.src" />
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

  .swiper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;

    .wrap {
      display: flex;
      align-items: flex-start;
      overflow: visible;
      .card {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        padding: 0 40px;

        img {
          width: 100%;
          max-height: 360px;
        }
      }
    }
  }
}
</style>
