<template>
  <b-card>

    <b-row>

      <!-- Product Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- Product Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="productData.name"
            :text="avatarText(productData.name)"
              
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ productData.name }}
              </h4>
              <span class="card-text">{{ productData.description }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'apps-products-edit', params: { id: productData.id } }"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
              >
                Delete
              </b-button>
            </div>
          </div>
        </div>

      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <!--<feather-icon
                icon="UserIcon"
                class="mr-75"
              />-->
              <span class="font-weight-bold">Name</span>
            </th>
            <td class="pb-50">
              {{ productData.name }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
             <!-- <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />-->
              <span class="font-weight-bold">description</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ productData.description }}
            </td>
          </tr>
          <tr> 
            <th class="pb-50">
              <!--<feather-icon
                icon="StarIcon"
                class="mr-75"
              />-->
              <span class="font-weight-bold">Category</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ productData.category }}
            </td>
          </tr>
           <tr>
            <th class="pb-50">
             <!-- <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />-->
              <span class="font-weight-bold">Flavor</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ productData.flavor }}
            </td>
          </tr>
           <tr> 
            <th class="pb-50">
              <!--<feather-icon
                icon="StarIcon"
                class="mr-75"
              />-->
              <span class="font-weight-bold">Size</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ productData.size }}
            </td>
          </tr>
           <tr> 
            <th class="pb-50">
              <!--<feather-icon
                icon="StarIcon"
                class="mr-75"
              />-->
              <span class="font-weight-bold">Weight</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ productData.weight }}
            </td>
          </tr>
           <tr> 
            <th class="pb-50">
              <!--<feather-icon
                icon="StarIcon"
                class="mr-75"
              />-->
              <span class="font-weight-bold">Price</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ productData.price }}
            </td>
          </tr>
          <tr> 
            <th class="pb-50">
              <!--<feather-icon
                icon="StarIcon"
                class="mr-75"
              />-->
              <span class="font-weight-bold">Serving</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ productData.serving }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import useProductsList from '../products-list/useProductsList'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    //const { resolveProductRoleVariant } = useProductsList()
    return {
      avatarText,
     // resolveProductRoleVariant,
    }
  },
}
</script>

<style>

</style>
