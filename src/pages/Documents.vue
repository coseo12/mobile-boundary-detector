<script setup lang="ts">
import TopBtn from "@/components/documents/TopBtn.vue";
import BottomBtn from "@/components/documents/BottomBtn.vue";
import ImgList from "@/components/documents/ImgList.vue";

const HEIGHT = `${window.innerHeight}px`;
</script>

<template>
  <section aria-label="Documents" class="documents">
    <TopBtn />
    <ImgList />
    <BottomBtn />
  </section>
</template>

<style lang="scss" scoped>
.documents {
  position: relative;
  width: 100%;
  height: v-bind("HEIGHT");
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $lomin-deep-black;

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
