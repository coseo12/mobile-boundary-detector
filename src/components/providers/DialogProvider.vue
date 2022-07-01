<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const {
  isDialog,
  dialogText,
  dialogType,
  dialogLabels,
  dialogConfirmCallback,
  dialogCancelCallback,
} = storeToRefs(store);

const modal = ref<HTMLDialogElement | null>(null);

const onClose = () => {
  if (!modal.value) {
    return;
  }
  isDialog.value = false;
  modal.value.close();
};

const onConfirm = () => {
  if (!modal.value) {
    return;
  }
  if (dialogConfirmCallback.value) {
    dialogConfirmCallback.value();
  }
  isDialog.value = false;
  modal.value.close();
};

const onCancel = () => {
  if (!modal.value) {
    return;
  }
  if (dialogCancelCallback.value) {
    dialogCancelCallback.value();
  }
  isDialog.value = false;
  modal.value.close();
};

watch(isDialog, () => {
  if (!modal.value) {
    return;
  }
  if (isDialog.value) {
    modal.value.showModal();
  }
});
</script>

<template>
  <dialog ref="modal" class="dialog">
    <div class="box">
      <div class="icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6V10C11 10.55 10.55 11 10 11ZM11 15H9V13H11V15Z"
            fill="#F34A00"
          />
        </svg>
      </div>
      <div class="text">
        <p v-for="t in dialogText">{{ t }}</p>
      </div>
      <button
        v-if="dialogType === 'alert'"
        type="button"
        class="ok btn"
        @mouseup="onClose"
      >
        확인
      </button>
      <div v-else class="btn-wrap">
        <button type="button" class="cancel btn" @mouseup="onCancel">
          {{ dialogLabels[0] }}
        </button>
        <button type="button" class="confirm btn" @mouseup="onConfirm">
          {{ dialogLabels[1] }}
        </button>
      </div>
    </div>
  </dialog>
  <slot />
</template>

<style lang="scss" scoped>
.dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  z-index: 2;

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 320px;
    height: 184px;
    border-radius: 20px;
    background-color: #000;

    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 260px;
      color: #fff;
      padding: 15px 0;
      font-size: 14px;
      line-height: 20px;
    }

    .ok {
      width: 260px;
      height: 44px;
      background-color: $lomin-deep-orange;
      border-radius: 5px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }

    .btn-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;

      .btn {
        width: 125px;
        height: 42px;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
      }

      .confirm {
        background-color: $lomin-deep-orange;
      }
      .cancel {
        background-color: #333333;
      }
    }
  }
}
</style>
