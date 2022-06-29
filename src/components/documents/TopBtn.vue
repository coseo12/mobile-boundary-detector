<script setup lang="ts">
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter } from "vue-router";
import { constants } from "@/router";

const onBack = () => {};
</script>

<template>
  <article class="top-btn">
    <RoundBtn icons="back" @touchend="onBack" />
    <p>내 문서</p>
    <div class="btn-wrap">
      <RoundBtn icons="search" @touchend="onBack" />
      <RoundBtn icons="delete" @touchend="onBack" />
      <RoundBtn icons="share" @touchend="onBack" />
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
