<script setup lang="ts"></script>

<template>
  <article class="img-list">
    <div v-for="i in 20" class="card">
      <img src="@/assets/doc_test017.jpg" alt="" />
      <div class="checkbox">
        <svg
          width="18"
          height="13"
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.99989 10.1698L2.52989 6.69982C2.13989 6.30982 1.50989 6.30982 1.11989 6.69982C0.729893 7.08982 0.729893 7.71982 1.11989 8.10982L5.29989 12.2898C5.68989 12.6798 6.31989 12.6798 6.70989 12.2898L17.2899 1.70982C17.6799 1.31982 17.6799 0.689824 17.2899 0.299824C16.8999 -0.0901758 16.2699 -0.0901758 15.8799 0.299824L5.99989 10.1698Z"
            fill="red"
          />
        </svg>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.img-list {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;

  .card {
    position: relative;
    padding: 5px;

    img {
      width: 45vw;
      height: 50vw;
    }

    .checkbox {
      position: absolute;
      left: 10px;
      top: 10px;
      border: 2px solid $lomin-deep-orange;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(243, 74, 0, 0.3);
    }
  }
}
</style>
