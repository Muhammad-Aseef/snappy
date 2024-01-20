<template>
  <b-sidebar
    id="add-new-product-sidebar"
    :visible="isAddNewProductSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-product-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Product
        </h5>
        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

          <!-- name -->
          <validation-provider
            #default="validationContext"
            name="Name"
            rules="required"
          >
            <b-form-group
              label="Name"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="productData.name"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Enter name here"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Category -->
          <validation-provider
            #default="validationContext"
            name="Category"
            rules="required"
          >
            <b-form-group
              label="Category"
              label-for="category"
              :state="getValidationState(validationContext)"
              
            >
              <v-select
                v-model="productData.category"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="categoryOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="category"
                placeholder="Select category"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- description -->
          <validation-provider
            #default="validationContext"
            name="Description"
            rules="required"
          >
            <b-form-group
              label="Description"
              label-for="description"
            >
              <b-form-input
                id="description"
                v-model="productData.description"
                :state="getValidationState(validationContext)"
                placeholder="Enter description here"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Flavor -->
         <validation-provider
            #default="validationContext"
            name="Flavor"
            rules="required"
          >
            <b-form-group
              label="Flavor"
              label-for="flavor"
              :state="getValidationState(validationContext)"
              
            >
              <v-select
              multiple="true"
                v-model="productData.flavor"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="flavorOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="category"
                placeholder="Select flavor"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- size -->
          <validation-provider
            #default="validationContext"
            name="Size"
            rules="required"
          >
            <b-form-group
              label="Size"
              label-for="size"
            >
              <b-form-input
                id="size"
                v-model="productData.size"
                :state="getValidationState(validationContext)"
                trim
                placeholder="Enter size here"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- weight -->
          <validation-provider
            #default="validationContext"
            name="Weight"
            rules="required"
          >
            <b-form-group
              label="Weight"
              label-for="weight"
            >
              <b-form-input
                id="weight"
                v-model="productData.weight"
                :state="getValidationState(validationContext)"
                trim
                placeholder="Enter weight here"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Serving -->
          <validation-provider
            #default="validationContext"
            name="Serving"
            rules="required"
          >
            <b-form-group
              label="Serving"
              label-for="serving"
            >
              <b-form-input
                id="serving"
                v-model="productData.serving"
                :state="getValidationState(validationContext)"
                trim
                placeholder="Enter number of servings"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

            <!-- Price -->
          <validation-provider
            #default="validationContext"
            name="Price"
            rules="required"
          >
            <b-form-group
              label="Price"
              label-for="price"
            >
              <b-form-input
                id="price"
                v-model="productData.price"
                :state="getValidationState(validationContext)"
                trim
                placeholder="Enter price here"
              />
                 
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
                <feather-icon
                  icon="PlusIcon"
                  size="18"
                  @click="priceTableShow = true"
                />
        <!-- Price table -->
        
          <b-table 
           ref="refPriceListTable"
           responsive="sm" 
          :items="items"
          :fields="priceTableColumns"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
          />
           <!-- Column: weight -->
          <template #cell(weight)="data">
            <b-media vertical-align="center">
              {{ data.item.weight }}
            </b-media>
          </template>
           <!-- Column: size -->
          <template #cell(size)="data">
            <b-media vertical-align="center">
              {{ data.item.size }}
            </b-media>
          </template>
           <!-- Column: serving -->
          <template #cell(serving)="data">
            <b-media vertical-align="center">
              {{ data.item.serving }}
            </b-media>
          </template>
           <!-- Column: price -->
          <template #cell(price)="data">
            <b-media vertical-align="center">
              {{ data.item.price }}
            </b-media>
          </template>
           <!-- Form Actions 
         <template #cell(actions)="">
          <b-dropdown
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>

            <b-dropdown-item >
              <feather-icon icon="EditIcon"
              />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>-->
           
          <!-- Upload image -->
          <b-form-group>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              block
              variant="success"
            >
             <b-form-file
                v-model="file2"
                plain
              />
            </b-button>
            </b-form-group>
          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton, BTable
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
//import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import productStoreModule from '../productStoreModule'
import { BFormFile } from 'bootstrap-vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

 
export default {
  components: {
    BSidebar,
    BForm,
    BTable,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,
    BFormFile,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
    FeatherIcon,
  },
  
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewProductSidebarActive',
    event: 'update:is-add-new-product-sidebar-active',
  },
 
  props: {
    isAddNewProductSidebarActive: {
      type: Boolean,
      required: true,
    },
    
    categoryOptions: {
      type: Array,
      required: true,
    },
     flavorOptions: {
      type: Array,
      required: true,
    },
  },
  
  data() {
    return {
      required,
      alphaNum,
      name,
      category,
      items: [
        {
          weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
        },
        {
          weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
        },
        {
          weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
        },
        {
          weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
        },
      ],
      
      //priceTableShow: true
    }
  },
  
  setup(props, { emit }) {
    const blankProductData = {
      //product_id: 0,
        name: '',
        description: '',
        flavor: '',
        size: '',
        weight: '',
        price: '',
        serving: '',
        category: '',
        image_url: '',
    }
    //    const priceTableShow = ref(false)
    const productData = ref(JSON.parse(JSON.stringify(blankProductData)))
    const resetproductData = () => {
      productData.value = JSON.parse(JSON.stringify(blankProductData))
    }

    const onSubmit = () => {
      store.dispatch('app-product/addMyProduct', productData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-product-sidebar-active', false)
        })
    }

    const {
      priceTableColumns,
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetproductData)

    return {
      productData,
      onSubmit,
      priceTableColumns,
      refFormObserver,
      getValidationState,
      resetForm,

    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-product-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
