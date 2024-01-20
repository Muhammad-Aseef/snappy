<template>
  <component :is="productData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="productData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching product data
      </h4>
      <div class="alert-body">
        No product found with this product id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-products-list'}"
        >
          Product List
        </b-link>
        for other products.
      </div>
    </b-alert>

    <b-tabs
      v-if="productData"
      pills
    >

      <!-- Tab: Social -->
      
        <template #title>
          <feather-icon
            icon="EditIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Edit</span>
        </template>
        <product-edit-button
          :product-data="productData"
          class="mt-2 pt-75"
        />
      
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,
} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import productStoreModule from '../productStoreModule'
import ProductEditButton from './ProductEditButton.vue'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    ProductEditButton,
  },
  setup() {
    const productData = ref(null)

    const PRODUCT_APP_STORE_MODULE_NAME = 'app-product'

    // Register module
    if (!store.hasModule(PRODUCT_APP_STORE_MODULE_NAME)) store.registerModule(PRODUCT_APP_STORE_MODULE_NAME, productStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PRODUCT_APP_STORE_MODULE_NAME)) store.unregisterModule(PRODUCT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-product/fetchMyProduct', { id: router.currentRoute.params.id })
      .then(response => { productData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          productData.value = undefined
        }
      })

    return {
      productData,
    }
  },
}
</script>

<style>

</style>
