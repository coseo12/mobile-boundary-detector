<script setup lang="ts">
import RoundBtn from "@/components/common/RoundBtn.vue";
import { useRouter, useRoute } from "vue-router";
import { constants } from "@/router";

const router = useRouter();
const routes = useRoute();

const onBack = () => {
  router.push({
    name: constants.edit.name,
    params: {
      id: routes.params.id || "",
    },
  });
};
</script>

<template>
  <article class="top-btn">
    <RoundBtn icons="back" @touchend="onBack" />
  </article>
</template>

<style lang="scss" scoped>
.top-btn {
  padding: 10px;

  button {
    background-color: transparent;
  }
}
</style>
