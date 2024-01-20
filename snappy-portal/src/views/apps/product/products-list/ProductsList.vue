<template>
  <div>
    <!-- modal login-->
    <b-modal
      id="modal-login"
      cancel-variant="outline-secondary"
      ok-title="Show data"
      centered
      @ok="Filter()"
      title="Filters"
    >
      <b-form>
        <b-form-group>
          <h5>Select date range</h5>
          <div>
            <flat-pickr
              v-model="date.range"
              class="form-control"
              :config="{ allowInput: true, mode: 'range' }"
            ></flat-pickr>
          </div>
        </b-form-group>
        <br />
        <b-form-group>
          <h5>Select filter</h5>
          <v-select
            v-model="filterData"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="productfilterOptions"
            label="text"
            :clearable="false"
            placeholder="Select Filter"
          />
        </b-form-group>
      </b-form>
    </b-modal>
    <b-modal id="modal-select2" size="lg" title="Cake Details" centered>
      <div v-if="loading == true">
        <b-spinner
          variant="primary"
          type="grow"
          style="margin-left: 350px"
          class="p-2"
          label="Spinning"
        ></b-spinner>
      </div>
      <b-card v-if="loading == false" img-alt="Cake image" img-top>
        <!-- <img :src="cover" />  -->
        <div>
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <h3>Minimum Time</h3>
                <p>{{ detailObj.minimumTime + '   (hours)' }}</p>
              </b-col>
              <b-col>
                <h3>Status</h3>
                <p v-if="detailObj.isApproved == true">
                  <b-button variant="gradient-success" class="btn-icon">
                    Approved <feather-icon icon="CheckCircleIcon" />
                  </b-button>
                </p>
                <p v-if="detailObj.isApproved == false">
                  <b-button variant="gradient-danger" class="btn-icon">
                    Denined <feather-icon icon="XCircleIcon" />
                  </b-button>
                </p>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <h3>Flavours</h3>
                <div v-for="flv in flavour[0]" v-bind:key="flv.flavourId">
                  <p>{{ flv.flavourName }}</p>
                </div>
              </b-col>
              <b-col>
                <h3>Sizes</h3>
                <div v-for="flv in cakeSize[0]" v-bind:key="flv.sizeId">
                  <p button>{{ flv.size }} - {{ flv.cost + 'AED' }}</p>
                </div>
              </b-col>
            </b-row>

            <b-card>
              <b-row>
                <b-col>
                  <h3>Images</h3>
                  <gallery
                    :images="cakeImages"
                    :index="index"
                    @close="index = null"
                  ></gallery>
                  <div
                    class="image"
                    v-for="(image, imageIndex) in cakeImages"
                    :key="imageIndex"
                    @click="index = imageIndex"
                    :style="{
                      backgroundImage: 'url(' + image + ')',
                      width: '150px',
                      height: '150px',
                    }"
                  ></div>
                </b-col>
              </b-row>
            </b-card>
          </b-container>
        </div>
      </b-card>
    </b-modal>
    <b-card no-body class="mb-2" style="padding: 20px">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Search -->
          <b-col cols="12" md="12">
            <div class="d-flex align-items-center justify-content-start">
              <div style="padding-right: 15px">
                <b-button
                  @click="$router.push({ name: 'apps-products-add' })"
                  variant="primary"
                >
                  <span class="text-nowrap">Add Product</span>
                </b-button>
              </div>
              <div style="padding-right: 15px">
                <b-button v-b-modal.modal-login variant="primary">
                  <span class="text-nowrap">Filters</span>
                </b-button>
              </div>
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
            </div>
          </b-col>
          <!-- Per Page -->
        </b-row>
      </div>
      <div v-if="productEmpty == true">
        <b-alert show variant="secondary" class="p-2">No Data</b-alert>
      </div>
      <b-row>
        <b-col
          v-for="product in myProducts"
          v-bind:key="product.productId"
          cols="6"
          md="3"
        >
          <!--<b-card-group deck v-for="p in myObj" :key="p.name">-->
          <b-card
            :img-src="product.coverImg"
            img-top
            img-alt="card img"
            img-height="250px"
            :title="product.title"
            border-variant="light"
            v-if="productEmpty == false"
          >
            <b-row>
              <b-col md="12"> </b-col>
              <b-col md="12">
                <b-card-text>
                  <b>Description:</b> {{ product.description }}
                </b-card-text>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="9">
                <b-card-text> <b>Price:</b> {{ product.price }} </b-card-text>
              </b-col>
              <b-col md="0">
                <template>
                  <b-dropdown
                    variant="link"
                    no-caret
                    :right="$store.state.appConfig.isRTL"
                  >
                    <template #button-content>
                      <feather-icon
                        icon="MoreVerticalIcon"
                        size="12"
                        class="align-middle text-body"
                      />
                    </template>
                    <b-dropdown-item
                      v-b-modal.modal-select2
                      @click="ProductDetails(product.productId)"
                    >
                      <feather-icon icon="FileTextIcon" />
                      <span class="align-middle ml-50">Details</span>
                    </b-dropdown-item>

                    <!-- <b-dropdown-item :to="{ name: 'apps-products-add', params: { id: product.productId } }">
                  
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item> -->

                    <b-dropdown-item @click="DeleteProduct(product.productId)">
                      <feather-icon icon="TrashIcon" />
                      <span class="align-middle ml-50">Delete</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-col>
            </b-row>
          </b-card>
          <!--</b-card-group>-->
        </b-col>
      </b-row>

      <!-- Pagination -->
      <b-col
        cols="12"
        sm="6"
        class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-end
        "
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalOrders"
          :per-page="perPage"
          first-number
          last-number
          class="mb-0 mt-1 mt-sm-0"
          prev-class="prev-item"
          next-class="next-item"
        >
          <template #prev-text>
            <feather-icon icon="ChevronLeftIcon" size="18" />
          </template>
          <template #next-text>
            <feather-icon icon="ChevronRightIcon" size="18" />
          </template>
        </b-pagination>
      </b-col>
    </b-card>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BFormInput,
  BCardText,
  BCardTitle,
  BButton,
  BPagination,
  BDropdown,
  BDropdownItem,
  BAlert,
  BSpinner,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import store from '@/store';
import { ref, onUnmounted } from '@vue/composition-api';
import { avatarText } from '@core/utils/filter';
//import useProductsList from './useProductsList'
import productStoreModule from '../productStoreModule';
//import ProductListAddNew from './ProductListAddNew.vue'
import axios from '@axios';
import useProductsList from './useProductsList';
import { BFormSelect } from 'bootstrap-vue';
import ProductAdd from '../products-add/ProductAdd.vue';
import VueGallery from 'vue-gallery';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
  props: ['title'],
  components: {
    flatPickr,
    vSelect,
    BFormInput,
    BCard,
    BCardText,
    BRow,
    BCol,
    BButton,
    BPagination,
    BDropdown,
    BDropdownItem,
    //BFormSelect,
    BAlert,
    BSpinner,
    gallery: VueGallery,
  },

  setup() {
    const PRODUCT_APP_STORE_MODULE_NAME = 'app-product';

    // Register module
    if (!store.hasModule(PRODUCT_APP_STORE_MODULE_NAME))
      store.registerModule(PRODUCT_APP_STORE_MODULE_NAME, productStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PRODUCT_APP_STORE_MODULE_NAME))
        store.unregisterModule(PRODUCT_APP_STORE_MODULE_NAME);
    });

    //const isAddNewProductSidebarActive = ref(false)

    const categoryOptions = [
      { label: 'Eid Cakes', value: 'eid' },
      { label: 'Wedding Cake', value: 'wedding' },
      { label: 'Party Cake', value: 'party' },
    ];

    const flavorOptions = [
      { label: 'Chocolate', value: 'Chocolate' },
      { label: 'Oreo', value: 'oreo' },
      { label: 'Cheese', value: 'cheese' },
      { label: 'Banana', value: 'banana' },
    ];

    // const {
    //   searchQuery,
    // } = useProductsList()
    return {
      // Sidebar
      //isAddNewProductSidebarActive,
      // Filter
      avatarText,
      categoryOptions,
      flavorOptions,
      // searchQuery,
    };
  },

  created() {
    this.LoadData();
  },
  mounted() {
    //  axios
    //         .get('/apps/product/products', { params: "" })
    //         .then((response)=> {
    //           console.log(response);
    //         if (response.data.status === "error") {
    //         } else {
    //           this.myProducts = response.data;
    //           console.log(this.myProducts);
    //         }
    //       })
    //         .catch(error => reject(error))
  },
  data() {
    return {
      categories:[],
      subCategories:[],
      loading: false,
      filterData: '',
      date: {
        range: '',
      },
      detailObj: {},
      index: null,
      rangeDate: null,
      productfilterOptions: [
        { text: 'Most sold product', value: 'mostSold' },
        { text: 'Least sold product', value: 'leastSold' },
        { text: 'Most popular product', value: 'mostPopular' },
        { text: 'Least popular product', value: 'leastPopular' },
        { text: 'Most profitable product', value: 'mostProfitable' },
      ],
      myProducts: [],
      productEmpty: false,
      myObj: {
        id: 0,
        name: '',
        desscription: '',
        flavor: '',
        image_url: '',
        price: '',
        serving: '',
        weight: '',
        category: '',
        vendor: '',
      },
      cakeImages: [],
      flavour: [],
      cakeSize: [],
    };
  },
  methods: {
    Filter() {
      // console.log("Osama");
      console.log(this.date.range, this.filterData.value);
      var split = this.date.range.split(' ');
      var from = split[0];
      var to = split[2];

      //console.log(from );
    },
    ProductDetails(id) {
      this.loading = true;
      this.cakeImages = [];
      this.cakeSize = [];
      this.flavour = [];
      console.log(id);
      var axios = require('axios');

      var config = {
        method: 'get',
        url: 'https://okaaik.fastech.pk/api/products/GetproductbyId/' + id,
        headers: {
          Authorization:
            'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
        },
      };

      axios(config)
        .then((response) => {
          //this.cakeImages.push(response.data.images);
          console.log(response.data);
          this.cakeImages = [];
          response.data.images.forEach((elem) => {
            this.cakeImages.push(elem.imagePath);
          });
          this.cakeSize.push(response.data.cakesize);
          this.flavour.push(response.data.flavours);
          this.detailObj = response.data.data[0];
          console.log(this.detailObj);
          console.log(this.cakeImages);
          console.log(this.cakeSize[0]);

          console.log(this.flavour[0]);
          this.loading = false;
          //console.log( response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    DeleteProduct(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          var axios = require('axios');

          var config = {
            method: 'delete',
            url: 'https://okaaik.fastech.pk/api/products/Deleteproduct/' + id,
            headers: {
              Authorization:
                'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
            },
          };

          axios(config)
            .then((response) => {
              console.log(response.data);
              if (response.data.status === 'success') {
                Swal.fire(
                  'Deleted!',
                  'Your product has been deleted.',
                  'success',
                ).then((res) => {
                  this.LoadData();
                });
              } else {
                Swal.fire('Error!', 'Something went wrong.', 'error');
              }

              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    },

    LoadData() {
      var axios = require('axios');
      var config = {
        method: 'get',
        url:
          'https://wishbox.fastech.pk/api/Products/LoadProductScreen' ,
        headers: 
        {
             Authorization:
            'bearer ' +  this.$store.state.userData.token,
        },
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));

          //  this.data  =  response.data;
          //console.log( response.data);
          this.categories = response.data.categories;
          this.subCategories = response.data.subCategories
          this.myProducts = response.data.products;
          console.log(this.myProducts);
          if (this.myProducts.data.length == 0) {
            this.productEmpty = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
<style scoped>
.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
}
</style>
