<script setup lang="ts"></script>

<template>
  <div class="capture-flash"></div>
</template>

<sytle lang="scss" scoped>
.capture-flash {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.5);
}
</sytle>
