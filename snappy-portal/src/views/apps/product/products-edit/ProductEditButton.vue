<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="productData.avatar"
          :text="avatarText(productData.name)"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ productData.name }}
      </h4>
      <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$refs.refInputEl.click()"
        >
          <input
            ref="refInputEl"
            type="file"
            class="d-none"
            @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Update</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
        >
          <span class="d-none d-sm-inline">Remove</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- Product Info: Input Fields -->
    <b-form>
      <b-row>

        <!-- Field: name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Name"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="productData.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Category -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Category"
            label-for="category"
          >
            <v-select
              v-model="productData.category"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="categoryOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="category"
            />
          </b-form-group>
        </b-col>
        <!-- Field: description -->
         <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Description"
            label-for="description"
          >
            <b-form-input
              id="description"
              v-model="productData.description"
            />
          </b-form-group>
        </b-col>

         <!-- Field: flavor -->
         <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Flavor"
            label-for="flavor"
          >
            <b-form-input
              id="flavor"
              v-model="productData.flavor"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Size -->
         <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Size"
            label-for="size"
          >
            <b-form-input
              id="size"
              v-model="productData.size"
            />
          </b-form-group>
        </b-col>
         <!-- Field: Weight -->
         <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Weight"
            label-for="weight"
          >
            <b-form-input
              id="weight"
              v-model="productData.weight"
            />
          </b-form-group>
        </b-col>
         <!-- Field: Price -->
         <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Price"
            label-for="price"
          >
            <b-form-input
              id="price"
              v-model="productData.price"
            />
          </b-form-group>
        </b-col>
         <!-- Field: Serving -->
         <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Serving"
            label-for="serving"
          >
            <b-form-input
              id="serving"
              v-model="productData.serving"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>


    <!-- Action Buttons -->
    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Save Changes
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Reset
    </b-button>
  </div>
</template>

<script>
import {
  BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BTable, BCard, BCardHeader, BCardTitle, BFormCheckbox,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import useProductsList from '../products-list/useProductsList'

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    //BTable,
    //BCard,
    //BCardHeader,
    //BCardTitle,
    //BFormCheckbox,
    vSelect,
  },
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { resolveProductRoleVariant } = useProductsList()

    const categoryOptions = [
      { label: 'Eid Cakes', value: 'eid' },
      { label: 'Wedding Cake', value: 'wedding' },
      { label: 'Party Cake', value: 'party' },
    ]


    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.productData.avatar = base64
    })

    return {
      //resolveProductRoleVariant,
      avatarText,
      categoryOptions,
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
