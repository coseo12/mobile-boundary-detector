<script setup lang="ts"></script>

<template>
  <section class="resize" aria-label="Resized">
    <article></article>
    <article></article>
    <article></article>
  </section>
</template>

<style lang="scss" scoped>
.resize {
  width: 100%;
  height: 100%;
  background-color: $lomin-deep-black;

  .top {
    height: calc(100% - 160px);
  }

  .middle {
    position: relative;
    bottom: -10px;
  }

  .bottom {
    width: 100%;
    height: 60px;
  }
}
</style>
