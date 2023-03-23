import { ref } from 'vue'

const BASE_URL = 'https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com'

/**
 * Composable for fetching bundles and their associated products.
 * Collates all data into a single ref object for ease of use.
 *
 * @returns {ref} all bundles
 */
export function useBundler() {
  const bundlesRef = ref([])

  // GET all the bundles
  fetch(BASE_URL + '/bundles')
    .then((res) => res.json())
    .then((bundles) => Promise.all(bundles.map(collateProducts)))
    .then((bundles) => Promise.all(bundles.map(addScentProfile)))
    .then((bundles) => (bundlesRef.value = bundles))

  return bundlesRef
}

/**
 * Fetches associated product data and merges it into bundle object
 *
 * @param {object[]} bundle
 * @returns new bundle object with full product data
 */
function collateProducts(bundle) {
  return Promise.all(
    bundle.products_included.map((handle) =>
      fetch(BASE_URL + `/product/${handle}`).then((res) => res.json())
    )
  ).then((products) => ({ ...bundle, products }))
}

/**
 * Adds a `scent_profile` array to bundles with each unique scent included in bundle.
 *
 * @param {object[]} bundle
 * @returns new bundle object with scent profile
 */
function addScentProfile(bundle) {
  const scentProfile = createScentProfile(bundle.products)

  return { ...bundle, scent_profile: scentProfile }
}

/**
 * Helper function for creating a Set of scents
 *
 * @param {obj[]} products
 * @returns {string[]} array of unique scents
 */
function createScentProfile(products) {
  return Array.from(
    products.reduce((set, product) => {
      if (product.scent_profile) {
        product.scent_profile.forEach((scent) => set.add(scent))
      }
      return set
    }, new Set())
  )
}
