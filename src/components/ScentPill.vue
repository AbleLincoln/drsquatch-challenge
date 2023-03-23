<script setup>
defineProps({ scent: String })
</script>

<template>
  <li
    class="uppercase inline-block mr-2 my-1 text-white rounded-full px-3 py-1 text-sm"
    :style="`background-color: var(--${scent})`"
  >
    {{ scent }}
  </li>
</template>

<style lang="scss" scoped></style>
