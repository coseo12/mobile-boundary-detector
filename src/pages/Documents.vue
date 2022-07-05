<script setup lang="ts">
import TopBtn from "@/components/documents/TopBtn.vue";
// import BottomBtn from "@/components/documents/BottomBtn.vue";
import ImgList from "@/components/documents/ImgList.vue";

const HEIGHT = `${window.innerHeight}px`;
</script>

<template>
  <section aria-label="Documents" class="documents">
    <TopBtn class="top" />
    <ImgList />
    <!-- <BottomBtn /> -->
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

  .top {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: $lomin-deep-black;
  }
}
</style>
