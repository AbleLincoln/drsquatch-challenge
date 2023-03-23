<script setup>
import { ref, computed } from 'vue'
import ScentFilter from './components/ScentFilter.vue'
import BundleItem from './components/BundleItem.vue'
import { useBundler } from './bundler'

const scents = ref([
  { name: 'Woodsy', active: true },
  { name: 'Fresh', active: true },
  { name: 'Citrus', active: true },
  { name: 'Herbal', active: true },
  { name: 'Rich', active: true },
  { name: 'Spiced', active: true }
])

const bundles = useBundler()

const filteredBundles = computed(() => {
  return bundles.value.filter((bundle) => isActive(bundle.scent_profile))
})

/**
 * Determines if a bundle should be shown based on its scent profile
 * vs the active scents
 *
 * @param {string[]} scentProfile
 */
function isActive(scentProfile) {
  return scents.value.some(
    (scent) =>
      scent.active &&
      scentProfile.find((scentName) => scentName.toUpperCase() === scent.name.toUpperCase())
  )
}
</script>

<template>
  <header class="px-5 py-1 bg-slate-100">
    <ScentFilter :scents="scents" />
  </header>

  <main class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-5 mx-5">
    <BundleItem v-for="bundle in filteredBundles" :key="bundle.handle" :bundle="bundle" />
  </main>
</template>

<style scoped></style>
