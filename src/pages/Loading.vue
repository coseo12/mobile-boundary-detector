<script setup lang="ts">
import Logo from "@/components/common/Logo.vue";
import Copyright from "@/components/common/Copyright.vue";

const HEIGHT = `${window.innerHeight}px`;
</script>

<template>
  <section class="loading" aria-label="Loading">
    <article class="top"></article>
    <Logo />
    <Copyright class="bottom" />
  </section>
</template>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: v-bind("HEIGHT");
  background-color: $lomin-deep-orange;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .top,
  .bottom {
    padding: 30px 0;
  }
}
</style>
