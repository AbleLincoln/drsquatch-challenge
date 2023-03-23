<script setup>
import { computed } from 'vue'

import ScentPill from './ScentPill.vue'

const props = defineProps({ bundle: Object })

/**
 * Calculates the strike through price by summing prices of all individual products
 */
const strikeThruPrice = computed(() => {
  return props.bundle.products.reduce((sum, { price }) => sum + price, 0)
})

/**
 * Gives price in human-readable format with currency
 *
 * @param {number} price
 */
function formatPrice(price) {
  return `$${price / 100}`
}

/**
 * Formatted products string
 */
const includedProducts = computed(() => {
  const uniqueProducts = {}
  props.bundle.products.forEach(({ handle, title }) => {
    if (uniqueProducts[handle]) uniqueProducts[handle].count++ // increment amount
    else uniqueProducts[handle] = { title, count: 1 } // put it in the map
  })

  return Object.values(uniqueProducts).map(formatIncludedProduct).join(', ')
})

/**
 * Formats each individual product for included products list
 */
function formatIncludedProduct({ title, count }, i, arr) {
  const andStr = i === arr.length - 1 ? 'and ' : '' // if its the last product include "and"
  const countStr = count > 1 ? ` x ${count}` : '' // include count if > 1

  return andStr + title + countStr
}
</script>

<template>
  <div class="border rounded p-4">
    <img class="w-full" :src="bundle.imageSrc" />

    <h3 class="text-lg font-semibold">
      {{ bundle.title }}
    </h3>
    <p class="text-xl my-1">
      <span class="line-through mr-1 opacity-50">{{ formatPrice(strikeThruPrice) }}</span>
      <span class="text-green-500">{{ formatPrice(props.bundle.price) }}</span>
    </p>

    <ul class="my-2">
      <ScentPill v-for="scent in bundle.scent_profile" :key="scent" :scent="scent" />
    </ul>

    <p><strong>Included</strong> <br />{{ includedProducts }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
