<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { getCopyImg } from "@/utils";

let CHECK_SCROLL = false;
let TIMEOUT: NodeJS.Timeout | null = null;
let START_X = 0;
let START_Y = 0;
let TARGET: HTMLDivElement | null = null;
let HOVER: HTMLDivElement | null = null;

const store = useStore();
const { documents, isDrag, selection } = storeToRefs(store);

const wrap = ref<HTMLDivElement | null>(null);
const cards = ref<HTMLDivElement[]>([]);

const list = computed(() => {
  return documents.value.map((d) => {
    const cloneImg = getCopyImg(d.img);
    const id = d.id;
    return { img: cloneImg, id, check: selection.value.includes(id) };
  });
});

const onCheckTouch = (e: TouchEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (!isDrag.value) {
    TIMEOUT = setTimeout(() => {
      CHECK_SCROLL = true;
    }, 300);
  } else {
    TIMEOUT = setTimeout(() => {
      CHECK_SCROLL = true;
      TARGET?.classList.add("on");
    }, 1000);

    if (!wrap.value) {
      return;
    }
    const rect = wrap.value.getBoundingClientRect();
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    const offsetX = rect.left;
    const offsetY = rect.top;
    START_X = clientX - offsetX;
    START_Y = clientY - offsetY;
    const el = e.target as HTMLElement;
    const card = el.closest(".card") as HTMLDivElement;
    if (!card) {
      return;
    }
    TARGET = card;
  }
};

const onCheck = (id: string) => {
  if (CHECK_SCROLL) {
    CHECK_SCROLL = false;
    return;
  }
  if (TIMEOUT) {
    clearTimeout(TIMEOUT);
  }
  if (isDrag.value) {
    return;
  }
  const isId = selection.value.includes(id);
  if (isId) {
    selection.value = selection.value.filter((f) => f !== id);
  } else {
    selection.value.push(id);
  }
};

const onCancel = () => {
  TARGET?.classList.remove("on");
  HOVER?.classList.remove("hover");

  const findTarget = documents.value.find((f) => f.id === TARGET?.dataset.id);
  const findHover = documents.value.find((f) => f.id === HOVER?.dataset.id);
  const targetIdx = Number(TARGET?.dataset.idx) || 0;
  const hoverIdx = Number(HOVER?.dataset.idx) || 0;

  TARGET = null;
  HOVER = null;
  if (!(findTarget && findHover)) {
    return;
  }
  documents.value.splice(targetIdx, 1, findHover);
  documents.value.splice(hoverIdx, 1, findTarget);
};

const onTouchMove = (e: TouchEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (!isDrag.value || !CHECK_SCROLL) {
    return;
  }
  HOVER?.classList.remove("hover");
  const item = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY
  );
  if (!item) {
    HOVER = null;
    return;
  }
  const card = item.closest(".card") as HTMLDivElement;
  if (!card) {
    HOVER = null;
    return;
  }
  if (TARGET?.dataset.id !== card.dataset.id) {
    card.classList.add("hover");
  }
  HOVER = card;
};
</script>

<template>
  <article class="img-list" @touchend="onCancel">
    <div ref="wrap" class="card-wrap">
      <div
        v-for="(item, idx) in list"
        ref="cards"
        class="card"
        :data-id="item.id"
        :data-idx="idx"
        @touchstart="onCheckTouch"
        @touchmove="onTouchMove"
        @touchend="onCheck(item.id)"
        @touchcancel="onCancel()"
      >
        <img :src="item.img.src" alt="img" />
        <p v-if="!isDrag" class="name">{{ item.id }}</p>
        <div v-if="isDrag" class="idx">{{ idx + 1 }}</div>
        <div v-if="!isDrag" class="checkbox">
          <svg
            v-show="item.check"
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99989 10.1698L2.52989 6.69982C2.13989 6.30982 1.50989 6.30982 1.11989 6.69982C0.729893 7.08982 0.729893 7.71982 1.11989 8.10982L5.29989 12.2898C5.68989 12.6798 6.31989 12.6798 6.70989 12.2898L17.2899 1.70982C17.6799 1.31982 17.6799 0.689824 17.2899 0.299824C16.8999 -0.0901758 16.2699 -0.0901758 15.8799 0.299824L5.99989 10.1698Z"
              fill="red"
            />
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.img-list {
  height: 100%;

  .preview {
    position: absolute;
    left: 0;
    top: 0;
  }

  .card-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: transparent;
    }
    .card {
      position: relative;
      padding: 5px;

      &.on {
        opacity: 0.3;
      }

      &.hover {
        img {
          border: 2px solid $lomin-deep-orange;
        }
      }

      img {
        width: calc(50vw - 10px);
        height: 55vw;
      }

      .idx {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $lomin-deep-orange;
        color: #fff;
        font-size: 14px;
        border-radius: 50%;
      }

      .name {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 12px;
        padding: 0 10px;
      }

      .checkbox {
        position: absolute;
        left: 10px;
        top: 10px;
        border: 2px solid $lomin-deep-orange;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(243, 74, 0, 0.3);
      }
    }
  }
}
</style>
