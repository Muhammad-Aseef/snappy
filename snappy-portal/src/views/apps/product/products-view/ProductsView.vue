<template>
  <div>

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
        for other Products.
      </div>
    </b-alert>

    <template v-if="productData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <product-view-product-info-card :product-data="productData" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
        </b-col>
      </b-row>

    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
//import InvoiceList from '@/views/apps/invoice/invoice-list/InvoiceList.vue'
import productStoreModule from '../productStoreModule'
import ProductViewProductInfoCard from './ProductViewProductInfoCard.vue'
//import UserViewUserPlanCard from './UserViewUserPlanCard.vue'
//import UserViewUserTimelineCard from './UserViewUserTimelineCard.vue'
//import UserViewUserPermissionsCard from './UserViewUserPermissionsCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    ProductViewProductInfoCard,
    //UserViewUserPlanCard,
    //UserViewUserTimelineCard,
    //UserViewUserPermissionsCard,

    //InvoiceList,
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
       
     // productData = this.$productStoreModule.state.title;

    return {
      productData,
    }
  },
}
</script>

<style>

</style>
