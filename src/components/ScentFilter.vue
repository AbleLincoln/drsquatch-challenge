<script setup>
defineProps({ scents: Array })
</script>

<template>
  <ul>
    Scents:

    <li v-for="scent in scents" :key="scent.name" class="inline-block">
      <label
        :for="scent.name"
        class="inline-block px-4 py-2 m-2 first:ml-0 text-sm border-slate-100 rounded-full text-white cursor-pointer drop-shadow-sm select-none"
        :class="{ 'opacity-50 drop-shadow-none line-through': !scent.active }"
        :style="`background-color: var(--${scent.name.toLowerCase()})`"
      >
        {{ scent.name }}
        <input
          type="checkbox"
          :name="scent.name"
          :id="scent.name"
          v-model="scent.active"
          class="hidden"
        />
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
