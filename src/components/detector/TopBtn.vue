<script setup lang="ts">
import { useRouter } from "vue-router";
import { constants } from "@/router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const router = useRouter();
const { isFlash, flashMode } = storeToRefs(store);

const onFlash = () => {
  if (!isFlash.value) {
    // alert("현재 브라우저에서는 사용이 불가능합니다.");
  }
};

const onDocuments = () => {
  //   router.push(constants.documents.path);
};
</script>

<template>
  <article>
    <button type="button" class="documents" @click="onDocuments">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10.59 4.59Z"
          fill="currentColor"
        />
      </svg>
    </button>
    <button type="button" class="flash" @click="onFlash">
      <svg
        v-if="flashMode === 'flash'"
        width="10"
        height="19"
        viewBox="0 0 10 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 1V10C0 10.55 0.45 11 1 11H3V18.15C3 18.66 3.67 18.84 3.93 18.4L9.12 9.5C9.51 8.83 9.03 8 8.26 8H6L8.49 1.35C8.74 0.7 8.26 0 7.56 0H1C0.45 0 0 0.45 0 1Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else-if="flashMode === 'auto'"
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 1V11C0 11.55 0.45 12 1 12H3V19.15C3 19.66 3.67 19.84 3.93 19.4L9.12 10.5C9.51 9.83 9.03 9 8.26 9H6L9.38 1.41C9.67 0.74 9.18 0 8.46 0H1C0.45 0 0 0.45 0 1ZM15 0C14.4 0 13.87 0.38 13.66 0.94L11.22 7.8C11.02 8.39 11.45 9 12.07 9C12.45 9 12.79 8.76 12.91 8.4L13.4 7H16.6L17.09 8.4C17.22 8.76 17.55 9 17.93 9C18.55 9 18.98 8.39 18.77 7.81L16.33 0.95C16.13 0.38 15.6 0 15 0ZM13.85 5.65L15 2L16.15 5.65H13.85Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else
        width="17"
        height="19"
        viewBox="0 0 17 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7025 9.5C14.0925 8.83 13.6125 8 12.8425 8H10.9725L13.2525 10.28L13.7025 9.5ZM13.8625 1.45C14.1925 0.78 13.7125 0 12.9625 0H5.5825C5.0325 0 4.5825 0.45 4.5825 1V1.61L10.7125 7.74L13.8625 1.45ZM16.0225 15.88L1.7025 1.56C1.3125 1.17 0.6825 1.17 0.2925 1.56C-0.0975 1.95 -0.0975 2.58 0.2925 2.97L4.5825 7.27V10C4.5825 10.55 5.0325 11 5.5825 11H7.5825V18.15C7.5825 18.66 8.2525 18.84 8.5125 18.4L11.1625 13.85L14.6025 17.29C14.9925 17.68 15.6225 17.68 16.0125 17.29C16.4125 16.9 16.4125 16.27 16.0225 15.88Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </article>
</template>

<style lang="scss" scoped>
article {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    background: none;
    border: none;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  button:active {
    color: $lomin-deep-orange;
    outline: none;
  }
}
</style>
