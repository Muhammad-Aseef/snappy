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
    <b-modal id="modal-select2" size="md" :title="myObj.name" centered>
      <div v-if="loading == true">
        <b-spinner
          variant="primary"
          type="grow"
          style="margin-left: 350px"
          class="p-2"
          label="Spinning"
        ></b-spinner>
      </div>

      <div v-if="loading == false">
        <div>
          <b-container class="bv-example-row">
            <b-card>
              <b-row>
                <div lg="3" md="3" sm="12" cols="12">
                  <div class="profile-img pb-1">
                    <b-card-img
                      :src="myObj.cover"
                      alt="Image"
                      class="rounded-1"
                      style="width: 150px; height: 150px"
                    ></b-card-img>
                  </div>
                </div>

                <b-col lg="6" md="6" sm="12" cols="12">
                  <h3>{{ myObj.name }}</h3>
                  <b-row style="margin-top: 5px">
                    <b-col>
                      <b-card-text>SKU #: {{ myObj.sku }}</b-card-text>
                    </b-col>
                  </b-row>
                  <b-row style="margin-top: 5px">
                    <b-col>
                      <b-card-text>{{
                        myObj.category + ' -> ' + myObj.subCategory
                      }}</b-card-text>
                    </b-col>
                  </b-row>
                  <b-row style="margin-top: 5px">
                    <b-col>
                      <b-card-text> AED {{ myObj.price }}</b-card-text>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-card>

            <b-card>
              <b-row>
                <b-col>
                  <h3>Billing</h3>
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col cols="6">
                  <h5>Price</h5>
                </b-col>
                <b-col cols="6"> AED {{ myObj.price }} </b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col cols="6">
                  <h5>Vat <small>(Value added tax)</small></h5>
                </b-col>
                <b-col cols="6"> AED {{ myObj.vat }} </b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col cols="6">
                  <h5>Delivery</h5>
                </b-col>
                <b-col cols="6"> AED {{ myObj.deliveryFee }} </b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col cols="6">
                  <h5>Marketplace Share</h5>
                </b-col>
                <b-col cols="6"> AED {{ myObj.marketplaceShare }} </b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col cols="6">
                  <h5>Net Total</h5>
                </b-col>
                <b-col cols="6"> AED {{ myObj.netTotal }} </b-col>
              </b-row>
            </b-card>

            <b-card>
              <h3>Description</h3>

              <b-row>
                <b-col cols="12">
                  {{ myObj.description }}
                </b-col>
              </b-row>
            </b-card>
            <b-card>
              <b-row>
                <b-col cols="12">
                  <h3 style="margin-left: 5px">Images</h3>
                  <gallery
                    :images="this.myObj.images"
                    :index="index"
                    @close="index = null"
                  ></gallery>
                  <div
                    class="image rounded-1"
                    v-for="(image, imageIndex) in myObj.images"
                    :key="imageIndex"
                    @click="index = imageIndex"
                    :style="{
                      backgroundImage: 'url(' + image + ')',
                      width: '150px',
                      height: '110px',
                    }"
                  ></div>
                </b-col>
              </b-row>
            </b-card>
          </b-container>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="modal-addproduct"
      size="md"
      title="Add Product"
      ok-only
      hide-footer="true"
      centered
    >
      <b-form>
        <b-row class="justify-content-md-center">
          <b-col cols="*">
            <b-form-group
              ref="image"
              invalid-feedback="Product image is required."
            >
              <div v-if="moreloading == true">
                <b-spinner
                  variant="primary"
                  type="grow"
                  class="m-5"
                  label="Spinning"
                ></b-spinner>
              </div>

              <b-link class="">
                <b-img
                  ref="previewEl"
                  rounded
                  thumbnail
                  src="https://dk0pm9zdlq16s.cloudfront.net/add9143e-45af-4c67-a83a-842aa52b1121.png"
                  @click="$refs.mfile.click()"
                  v-if="moreloading == false"
                  height="120"
                  width="120"
                />

                <!-- <img v-if= "loading==false" rounded :src="require('@/assets/images/elements/Unicorn-Cake.jpg')" @click="$refs.files.click()" style="width: 7vw; height: 7vw; padding-left:20px; padding-top:20px;" alt="imgAdd"/>  -->
              </b-link>

              <input
                type="file"
                id="mfile"
                hidden
                ref="mfile"
                multiple="multiple"
                @change="selectMoreFile()"
                accept="image/*"
              />
            </b-form-group>

          </b-col>

        </b-row>
        <b-row class="text-center">
          <b-col>
<small class="text-muted">Recommended pixels are 850 x 950</small>
          </b-col>
        </b-row>

        <div class="mt-1">
          <b-row class="justify-content-md-center">
            <b-col cols="*" v-for="(img, index) in myimages" :key="img.id">
              <b-link>
                <div>
                  <i
                    class="fa fa-trash fa-sm position-absolute m-5"
                    @click="removeImg(index)"
                  ></i>
                </div>

                <b-img rounded :src="img" height="120" width="120" />
              </b-link>
            </b-col>
          </b-row>
        </div>
        <div class="mt-1">
          <b-form-group
            label="SKU No"
            invalid-feedback="SKU number is required."
          >
            <b-form-input
              id="name-input"
              v-model="myObj.sku"
              :state="nameState"
              ref="sku"
              placeholder="Enter sku number here."
              required
              @focusout="CheckSKU()"
            />
          </b-form-group>
          <b-form-group
            label="Name"
            invalid-feedback="Product name is required."
          >
            <b-form-input
              id="name-input"
              v-model="myObj.name"
              :state="nameState"
              ref="name"
              placeholder="Enter product name here."
              required
              @focusout="CheckName()"
            />
          </b-form-group>

          <b-form-group
            label="Category"
            ref="categoryId"
            invalid-feedback="Category is required."
          >
            <v-select
              v-model="myObj.categoryId"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="(val) => val.id"
              :options="categories"
              label="name"
              :clearable="false"
              input-id="id"
              ref="vendorId"
              @search:blur="CheckCategory()"
              @input="AddSubCategory()"
              @change="CheckCategory()"
              :disabled="dataloading"
              placeholder="Select category"
            />
          </b-form-group>
          <b-form-group
            :state="nameState"
            label="Sub category"
            ref="subcategoryId"
            invalid-feedback="Sub category is required."
          >
            <v-select
              v-model="myObj.subcategoryId"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="(val) => val.id"
              :options="selectedSubcategory"
              label="name"
              :clearable="false"
              input-id="id"
              ref="vendorId"
              @search:blur="CheckSubcategory()"
              :disabled="dataloading"
              placeholder="Select sub category"
            />
          </b-form-group>
           <b-form-group
            :state="nameState"
            label="Occasion"
            ref="occasionId"
            invalid-feedback="Occasion is required."
          >
            <v-select
              v-model="myObj.occasionId"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="(val) => val.id"
              :options="occasions"
              label="title"
              :clearable="false"
              input-id="id"
              ref="occasionId"
              @search:blur="CheckOccasion()"
              :disabled="dataloading"
              placeholder="Select occasion"
            />
          </b-form-group>
          <b-row>
            <b-col cols="6">
              <b-form-group
                :state="nameState"
                label="Price"
                invalid-feedback="Please enter valid price value."
              >
                <b-form-input
                  v-model="myObj.price"
                  id="name-input"
                  :state="nameState"
                  ref="price"
                  @keyup="Calculation"
                  placeholder="Enter product price here."
                  required
                />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                :state="nameState"
                label="VAT"
                invalid-feedback="Service name is required."
              >
                <b-form-input
                  v-model="myObj.vat"
                  id="name-input"
                  :state="nameState"
                  ref="bname"
                  disabled
                  placeholder="Value added tax amount (vat)."
                  required
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-form-group
                :state="nameState"
                label="Marketplace share"
                invalid-feedback="Service name is required."
              >
                <b-form-input
                  id="name-input"
                  v-model="myObj.marketplaceShare"
                  :state="nameState"
                  ref="bname"
                  placeholder="Market place share amount."
                  disabled
                  required
                />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                :state="nameState"
                label="Delivery fee"
                invalid-feedback="Service name is required."
              >
                <b-form-input
                  id="name-input"
                  :state="nameState"
                  ref="bname"
                  v-model="myObj.deliveryFee"
                  placeholder="Delivery Fees."
                  disabled
                  required
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group
            :state="nameState"
            label="Net total"
            invalid-feedback="Service name is required."
          >
            <b-form-input
              id="name-input"
              :state="nameState"
              ref="bname"
              v-model="myObj.netTotal"
              placeholder="AED 10"
              disabled
              required
            />
          </b-form-group>
          <b-form-group
            label="Description"
            invalid-feedback="Description is required."
          >
            <b-form-textarea
              v-model="myObj.description"
              :state="nameState"
              ref="description"
              placeholder="Enter product description here."
              required
              @focusout="CheckDesc()"
              rows="3"
            />
          </b-form-group>
        </div>
      </b-form>
      <br />
      <div style="">
        <b-button
          class="float-right ml-5"
          variant="primary"
          @click="AddProduct()"
        >
          <span class="text-nowrap">Save</span>
        </b-button>
      </div>
    </b-modal>
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Search -->
        <b-col cols="12" md="12">
          <div class="d-flex align-items-center justify-content-start">
            <div style="padding-right: 15px">
              <b-button
                v-b-modal.modal-addproduct
                variant="primary"
                @click="ClearForm()"
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
        v-for="product in filterProducts"
        v-bind:key="product.name"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <!--<b-card-group deck v-for="p in myObj" :key="p.name">-->
        <a @click="EditProduct(product)">
          <b-card
            :img-src="product.cover"
            img-top
            img-alt="card img"
            img-height="250px"
            style="object-fit:cover;"
            :title="product.name"
            border-variant="light"
            v-if="productEmpty == false"
          >
            <!-- <b-row style="margin-top:5px;">
                <b-col md="12" sm="12">
               <b-card-text >
                  <b>Bakery:</b>  {{product.vendorName}}
                </b-card-text>
              </b-col>
           </b-row> -->
            <b-row style="margin-top: 5px">
              <b-col md="12" sm="12">
                <b-card-text>
                  {{ 'SKU #: ' + product.sku }}
                </b-card-text>
              </b-col>
            </b-row>
            <b-row style="margin-top: 5px">
              <b-col md="12" sm="12">
                <b-card-text>
                  {{ product.category + ' -> ' + product.subCategory }}
                </b-card-text>
              </b-col>
            </b-row>

            <b-row style="margin-top: 5px">
              <b-col md="9" sm="12">
                <b-card-text> AED {{ product.price }} </b-card-text>
              </b-col>
            </b-row>
            <!-- <b-row style="margin-top: 5px">
              <b-col md="9" sm="12">
                <b>Status: </b>
                <span> {{ product.status }} </span>
              </b-col>
            </b-row> -->

            <b-row style="margin-top: 5px">
              <b-col v-on:click.stop cols="3">
                <b-button variant="primary" @click="Details(product)">
                  <span class="text-nowrap">Details</span>
                </b-button>
              </b-col>
              <b-col cols="6"> </b-col>
              <b-col v-on:click.stop cols="3">
                <b-button
                  @click="DeleteProduct(product.id)"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-danger"
                  class="btn-icon"
                >
                  <feather-icon icon="Trash2Icon" />
                </b-button>
              </b-col>
            </b-row>
          </b-card>
        </a>

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
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BFormGroup,
  BForm,
  BFormInput,
  BCardText,
  BCardTitle,
  BMedia,
  BMediaAside,
  BLink,
  BImg,
  BButton,
  BPagination,
  BDropdown,
  BDropdownItem,
  BAlert,
  BListGroup,
  BSpinner,
  BCardImg,
  BFormTextarea,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import store from '@/store';
import { ref, onUnmounted } from '@vue/composition-api';
import { avatarText } from '@core/utils/filter';
//import useAllProductsList from './useProductsList'
//import productStoreModule from '../productStoreModule'
//import ProductListAddNew from './ProductListAddNew.vue'
import axios from '@axios';
//import useProductsList from './useProductsList'
import { BFormSelect } from 'bootstrap-vue';
//import ProductAdd from '../products-add/ProductAdd.vue'
import VueGallery from 'vue-gallery';
import flatPickr from 'vue-flatpickr-component';
export default {
  props: ['title'],
  components: {
    //flatPickr,
    //BCardTitle,
    //BMedia,
    //BMediaAside,
    BLink,
    BImg,
    vSelect,
    BFormInput,
    BFormGroup,
    BForm,
    BCard,
    BCardText,
    BRow,
    BCol,
    BButton,
    BPagination,
    BFormTextarea,
    //BDropdown,
    //BDropdownItem,
    BAlert,
    BSpinner,
    BCardImg,
    gallery: VueGallery,
    //BListGroup
  },

  computed: {
    filterProducts: function () {
      return this.myProducts.filter((pro) => {
        return (
          pro.name.toLowerCase().match(this.searchQuery.toLowerCase()) ||
          pro.name.toLowerCase().match(this.searchQuery.toLowerCase())
        );
      });
    },
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
      occasions:[],
      myimages: [],
      selectedSubcategory: [],
      moreloading: false,
      priceManagement: {},
      //  images: [
      //     'https://dummyimage.com/800/ffffff/000000',
      //     'https://dummyimage.com/1600/ffffff/000000',
      //     'https://dummyimage.com/1280/000000/ffffff',
      //     'https://dummyimage.com/400/000000/ffffff',
      //   ],
      logoloading: false,
      vendorsOptions: [
        { id: 1, name: 'Hamid' },
        { id: 12, name: 'Ashraf' },
        { id: 13, name: 'Hamid' },
      ],
      categoryOptions: [
        { id: 1, name: 'Flower' },
        { id: 12, name: 'Cake' },
      ],
      suspended: '',
      loading: false,
      filterData: '',
      date: {
        range: '',
      },
      searchQuery: '',
      index: null,
      detailObj: {},
      cakeImages: [],
      flavour: [],
      cakeSize: [],
      cakeLayer: [],
      Aid: 0,
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
        description: '',
        sku: '',
        cover: '',
        images: [],
        price: '',
        categoryId: '',
        subcategoryId: '',
        deliveryFee: '',
        marketplaceShare: '',
        netTotal: '',
        vat: '',
        occasionId:0,
        category: null,
        subCategory: null,
      },
    };
  },

  methods: {
    Details(row) {
      this.myObj.id = row.id;
      this.myObj.name = row.name;
      this.myObj.price = row.price;
      this.myObj.categoryId = row.categoryId;
      this.myObj.subcategoryId = row.subcategoryId;
      this.myObj.deliveryFee = row.deliveryFee;
      this.myObj.vat = row.vat;
      this.myObj.cover = row.cover;
      this.myObj.category = row.category;
      this.myObj.subCategory = row.subCategory;
      this.myObj.netTotal = row.netTotal;
      this.myObj.marketplaceShare = row.marketplaceShare;
      this.myObj.images = row.images.split(',');
      this.myimages = row.images.split(',');
      this.myObj.sku = row.sku;
      this.myObj.description = row.description;
      this.$bvModal.show('modal-select2');
    },
    EditProduct(row) {
      this.myObj.id = row.id;
      this.myObj.name = row.name;
      this.myObj.price = row.price;
      this.myObj.categoryId = row.categoryId;
      this.myObj.subcategoryId = row.subcategoryId;
      this.myObj.deliveryFee = row.deliveryFee;
      this.myObj.vat = row.vat;
      this.myObj.netTotal = row.netTotal;
      this.myObj.marketplaceShare = row.marketplaceShare;
      this.myObj.images = row.images.split(',');
      this.myimages = row.images.split(',');
      this.myObj.sku = row.sku;
      this.myObj.description = row.description;
      this.selectedSubcategory = [];
      this.subCategories.forEach((elem) => {
        if (this.myObj.categoryId == elem.categoryId) {
          this.selectedSubcategory.push(elem);
        }
      });
      this.$bvModal.show('modal-addproduct');
    },
    AddProduct() {
      this.CheckCategory();
      this.CheckSubcategory();
      this.CheckName();
      this.CheckImage();
      this.Calculation();
      this.CheckSKU();
      this.CheckDesc();
      this.CheckOccasion();
      // return console.log(this.myObj);
      if (
        this.CheckCategory() == false ||
        this.CheckName() == false ||
        this.CheckImage() == false ||
        this.CheckSKU() == false ||
        this.CheckDesc() == false || 
        this.CheckOccasion() == false
      ) {
        return this.$bvToast.toast('Please fill the form correctly.', {
          title: 'Error!',
          variant: 'danger',
          toaster: 'b-toaster-bottom-center',
        });
      } else {
        console.log(this.myObj);
        if (this.myObj.id == 0) {
          var axios = require('axios');
          this.myObj.images = this.myObj.images.toString();
          this.myObj.price = parseInt(this.myObj.price);

          console.log(this.myObj);
          // this.$store.state.userData.userID
          var config = {
            method: 'post',
            url: 'https://wishbox.fastech.pk/api/Products/AddProduct',
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
            data: this.myObj,
          };

          axios(config)
            .then((response) => {
              if (response.data.status === 'success') {
                console.log(response.data);
                this.$bvModal.hide('modal-addproduct');
                this.LoadData();

                this.$bvToast.toast('Product added.', {
                  title: 'Success!',
                  variant: 'success',
                  toaster: 'b-toaster-bottom-center',
                });
              }

              //  this.data  =  response.data;
              //console.log(this.$store.state.userData.userID);
              //this.items = response.data;

              // console.log(this.items);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          //Edit
          var axios = require('axios');
          // this.$store.state.userData.userID
           this.myObj.images = this.myObj.images.toString();
           this.myObj.price = parseInt(this.myObj.price);
           console.log(this.myObj); 
          var config = {
            method: 'put',
            url:
              'https://wishbox.fastech.pk/api/Products/EditProduct' ,
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
            data: this.myObj,
          };

          axios(config)
            .then((response) => {
              if (response.data.status === 'success') {
                this.$bvModal.hide('modal-addproduct');
                console.log(response.data);
                this.LoadData();

                this.$bvToast.toast('Product updated.', {
                  title: 'Success!',
                  variant: 'success',
                  toaster: 'b-toaster-bottom-center',
                });
              } else {
                this.$bvToast.toast('Something went wrong.', {
                  title: 'Error!',
                  variant: 'danger',
                  toaster: 'b-toaster-bottom-center',
                });
              }

              //  this.data  =  response.data;
              //console.log(this.$store.state.userData.userID);
              //this.items = response.data;

              // console.log(this.items);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    CheckOccasion()
    {
 var elem = this.$refs['occasionId'];
      if (
        this.myObj.occasionId == 0 ||
        this.myObj.occasionId == undefined ||
        this.myObj.occasionId == null
      ) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckSubcategory() {
      var elem = this.$refs['subcategoryId'];
      if (
        this.myObj.subcategoryId == 0 ||
        this.myObj.subcategoryId == undefined ||
        this.myObj.subcategoryId == null
      ) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckSKU() {
      var elem = this.$refs['sku'];
      if (this.myObj.sku == '' || this.myObj.sku.length < 3) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckImage() {
      var elem = this.$refs['image'];
      if (this.myObj.images.length == 0) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckCategory() {
      console.log(this.myObj.categoryId);
      var elem = this.$refs['categoryId'];
      if (
        this.myObj.categoryId == 0 ||
        this.myObj.categoryId == undefined ||
        this.myObj.categoryId == null
      ) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckName() {
      var elem = this.$refs['name'];
      if (this.myObj.name == '' || this.myObj.name.length < 3) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckDesc() {
      var elem = this.$refs['description'];
      if (this.myObj.description == '' || this.myObj.description.length < 3) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    AddSubCategory() {
      this.selectedSubcategory = [];
      this.subCategories.forEach((elem) => {
        if (this.myObj.categoryId == elem.categoryId) {
          this.selectedSubcategory.push(elem);
        }
      });
    },
    removeImg(index) {
      console.log(index);
      this.myObj.images.splice(index, 1);
      this.myimages.splice(index, 1);
      this.$refs.mfile.value = null;
    },
    selectMoreFile() {
      //this.moreFiles = this.$refs.mfile.files;
      if (this.$refs.mfile.files.length !== 0) {
        this.moreloading = true;
        var formdata = new FormData();
        for (var i = 0; i < this.$refs.mfile.files.length; i++) {
          formdata.append('file', this.$refs.mfile.files[i]);
        }

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };

        fetch('https://upload.appick.io', requestOptions)
          .then((response) => response.json()) //2
          .then((result) => {
            console.log();
            //this.moreImages.push(result.myresp);

            for (var i = 0, len = result.myresp.length; i < len; ++i) {
              this.moreloading = false;
              var fn = result.myresp[i].path;
              this.myObj.images.push(fn);
              this.myimages.push(fn);
              var elem = this.$refs['image'];
              elem.state = true;
            }
            console.log(this.myObj.images);
          })

          .catch((error) => console.log('error', error));
      }
    },
    ClearForm() {
      this.myObj.id = 0;
      this.myObj.name = '';
      this.myObj.price = '';
      this.myObj.categoryId = 0;
      this.myObj.subcategoryId = 0;
      this.myObj.deliveryFee = 0;
      this.myObj.vat = 0;
      this.myObj.netTotal = 0;
      this.myObj.marketplaceShare = 0;
      this.myObj.images = [];
      this.myimages = [];
      this.myObj.sku = '';
      this.myObj.description = '';
    },
    Calculation() {
      var elem = this.$refs['price'];
      const regex = /^\d+(,\d{1,2})?$/;
      if (parseInt(this.myObj.price) !== 0) {
        console.log('Check the 0', this.myObj.price);
        if (regex.test(this.myObj.price)) {
          console.log(this.priceManagement);
          this.myObj.vat = this.priceManagement.vat * this.myObj.price;
          this.myObj.vat = Math.round(this.myObj.vat);

          this.myObj.marketplaceShare =
            this.priceManagement.marketplaceShare * this.myObj.price;
          this.myObj.marketplaceShare = Math.round(this.myObj.marketplaceShare);

          this.myObj.deliveryFee = this.priceManagement.dcDubai;
          this.myObj.netTotal =
            parseInt(this.myObj.vat) +
            parseInt(this.myObj.price) +
            parseInt(this.myObj.deliveryFee) +
            parseInt(this.myObj.marketplaceShare) ;
          return (elem.state = true);
        } else {
          return (elem.state = false);
        }
      } else {
        this.myObj.price = '';
        return (elem.state = false);
      }
    },
    Filter() {
      // console.log("Osama");
      console.log(this.date.range, this.filterData.value);
      var split = this.date.range.split(' ');
      var from = split[0];
      var to = split[2];

      console.log(from);
    },
    DeclineProduct(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, deny it!',
      }).then((result) => {
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'put',
            url:
              'https://okaaik.fastech.pk/api/products/productStatus/?id=' +
              id +
              '&status=false',

            headers: {
              Authorization:
                'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
            },
          };
          console.log(config.url);
          axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire(
                  'Denied!',
                  'Your order has been denied.',
                  'success',
                ).then((res) => {
                  this.LoadData();
                  this.$bvModal.hide('modal-select2');
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    },
    SuspendProduct(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, suspend it!',
      }).then((result) => {
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'put',
            url:
              'https://okaaik.fastech.pk/api/products/productStatus/?id=' +
              id +
              '&status=suspended',

            headers: {
              Authorization:
                'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
            },
          };
          console.log(config.url);
          axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire(
                  'Suspended!',
                  'Product has been suspended.',
                  'success',
                ).then((res) => {
                  this.LoadData();
                  this.$bvModal.hide('modal-select2');
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    },
    ApproveProduct(id) {
      Swal.fire({
        title: 'Do you want to approve this cake?',
        text: "You won't be able to revert this!",
        icon: 'question',
        iconColor: '#FB595f',
        confirmButtonText: `Accept`,
        confirmButtonColor: '#FB595f',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'put',
            url:
              'https://okaaik.fastech.pk/api/products/productStatus/?id=' +
              id +
              '&status=true',
            headers: {
              Authorization:
                'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
            },
          };
          console.log(config.url);
          axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire('Accepted!', '', 'success').then((res) => {
                  this.$bvModal.hide('modal-select2');
                  this.LoadData();
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    },

    ProductDetails(id) {
      this.loading = true;
      this.cakeLayers = [];
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
          console.log(response.data);
          this.cakeImages = [];
          response.data.images.forEach((elem) => {
            this.cakeImages.push(elem.imagePath);
          });
          //this.cakeImages.push(response.data.images[0].imagePath);
          this.cakeSize.push(response.data.cakesize);
          this.flavour.push(response.data.flavours);
          this.detailObj = response.data.data[0];
          console.log(this.detailObj);
          console.log(this.cakeImages);
          console.log(this.cakeSize[0]);
          this.suspended = this.detailObj.isApproved;
          this.cakeLayers = response.data.cakelayer;
          console.log(this.suspended);
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
            url: 'https://wishbox.fastech.pk/api/Products/' + id,
            headers: {
              Authorization:
                'bearer ' + this.$store.state.userData.token,
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
        url: 'https://wishbox.fastech.pk/api/Products/LoadProductScreen',
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));

          //  this.data  =  response.data;
          //console.log( response.data);
          this.categories = response.data.categories;
          this.subCategories = response.data.subCategories;
          this.myProducts = response.data.products;
          this.occasions = response.data.occasions;
          this.priceManagement = response.data.priceManagement;
          console.log(this.priceManagement);
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
