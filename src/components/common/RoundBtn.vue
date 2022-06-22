<script setup lang="ts">
export type Icons =
  | "document"
  | "flash-off"
  | "flash"
  | "flash-auto"
  | "upload"
  | "none";

interface Props {
  icons: Icons;
}

const props = defineProps<Props>();
</script>

<template>
  <button type="button" class="r1" :class="{ none: props.icons === 'none' }">
    <svg
      v-if="props.icons === 'document'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10.59 4.59Z"
        fill="currentColor"
      />
    </svg>
    <svg
      v-else-if="props.icons === 'flash'"
      width="10"
      height="19"
      viewBox="0 0 10 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1V10C0 10.55 0.45 11 1 11H3V18.15C3 18.66 3.67 18.84 3.93 18.4L9.12 9.5C9.51 8.83 9.03 8 8.26 8H6L8.49 1.35C8.74 0.7 8.26 0 7.56 0H1C0.45 0 0 0.45 0 1Z"
        fill="currentColor"
      />
    </svg>
    <svg
      v-else-if="props.icons === 'flash-auto'"
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 1V11C0 11.55 0.45 12 1 12H3V19.15C3 19.66 3.67 19.84 3.93 19.4L9.12 10.5C9.51 9.83 9.03 9 8.26 9H6L9.38 1.41C9.67 0.74 9.18 0 8.46 0H1C0.45 0 0 0.45 0 1ZM15 0C14.4 0 13.87 0.38 13.66 0.94L11.22 7.8C11.02 8.39 11.45 9 12.07 9C12.45 9 12.79 8.76 12.91 8.4L13.4 7H16.6L17.09 8.4C17.22 8.76 17.55 9 17.93 9C18.55 9 18.98 8.39 18.77 7.81L16.33 0.95C16.13 0.38 15.6 0 15 0ZM13.85 5.65L15 2L16.15 5.65H13.85Z"
        fill="currentColor"
      />
    </svg>
    <svg
      v-else-if="props.icons === 'flash-off'"
      width="17"
      height="19"
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7025 9.5C14.0925 8.83 13.6125 8 12.8425 8H10.9725L13.2525 10.28L13.7025 9.5ZM13.8625 1.45C14.1925 0.78 13.7125 0 12.9625 0H5.5825C5.0325 0 4.5825 0.45 4.5825 1V1.61L10.7125 7.74L13.8625 1.45ZM16.0225 15.88L1.7025 1.56C1.3125 1.17 0.6825 1.17 0.2925 1.56C-0.0975 1.95 -0.0975 2.58 0.2925 2.97L4.5825 7.27V10C4.5825 10.55 5.0325 11 5.5825 11H7.5825V18.15C7.5825 18.66 8.2525 18.84 8.5125 18.4L11.1625 13.85L14.6025 17.29C14.9925 17.68 15.6225 17.68 16.0125 17.29C16.4125 16.9 16.4125 16.27 16.0225 15.88Z"
        fill="currentColor"
      />
    </svg>
    <svg
      v-else-if="props.icons === 'upload'"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_197_344)">
        <path
          d="M7.61535 11.7694H10.3846C10.7653 11.7694 11.0769 11.4579 11.0769 11.0771V7.61555H12.1777C12.7938 7.61555 13.1053 6.86786 12.6692 6.43171L9.4915 3.25401C9.2215 2.98401 8.78535 2.98401 8.51535 3.25401L5.33765 6.43171C4.9015 6.86786 5.20612 7.61555 5.82227 7.61555H6.92304V11.0771C6.92304 11.4579 7.23458 11.7694 7.61535 11.7694ZM4.84612 13.154H13.1538C13.5346 13.154 13.8461 13.4656 13.8461 13.8463C13.8461 14.2271 13.5346 14.5386 13.1538 14.5386H4.84612C4.46535 14.5386 4.15381 14.2271 4.15381 13.8463C4.15381 13.4656 4.46535 13.154 4.84612 13.154Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_197_344">
          <rect
            width="16.6154"
            height="16.6154"
            fill="currentColor"
            transform="translate(0.692383 0.692383)"
          />
        </clipPath>
      </defs>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.r1 {
  background-color: #555555;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.none {
  background-color: transparent;
}
</style>
