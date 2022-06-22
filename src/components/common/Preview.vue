<script setup lang="ts">
import { useRouter } from "vue-router";
import { constants } from "@/router";

const router = useRouter();

const onDocuments = (id: string) => {
  router.push({
    name: constants.edit.name,
    params: {
      id,
    },
  });
};
</script>

<template>
  <div class="preview-wrap">
    <div v-for="(img, idx) in 10" class="card" @mouseup="onDocuments('test')">
      <div class="badge">{{ idx + 1 }}</div>
      <img src="@/assets/doc_test017.jpg" alt="img-1" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview-wrap {
  width: 100%;
  height: 100px;
  overflow-x: scroll;
  display: flex;
  padding: 5px;

  .card {
    position: relative;
    margin: 0 5px;
    width: 70px;
    height: 80px;
    flex: 0 0 auto;

    .badge {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      font-size: 12px;
      font-weight: 600;
      margin: 3px;
      border-radius: 50%;
      background-color: $lomin-deep-orange;
      color: #fff;
    }

    img {
      display: block;
      width: 70px;
      height: 80px;
    }
  }
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-thumb {
  background: transparent;
}
::-webkit-scrollbar-thumb:hover {
  background: transparent;
}
</style>
