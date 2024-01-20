<template>
  <div>
    <!-- select 2 demo -->
    <b-modal
      id="modal-select2"
      title="Vendor Details"
      centered
      ok-only
      size="lg"
    >
      <div v-if="loading == true">
        <b-spinner
          variant="primary"
          type="grow"
          style="margin-left:350px;"
          class="p-2"
          label="Spinning"
        ></b-spinner>
      </div>
      <div class="container mt-2">
        <div class="container">
          <b-card-img
            :src="detailObj.cover"
            v-if="detailObj.cover !== ''"
            alt="Image"
            class="rounded-1"
            height="250px"
          ></b-card-img>
          <b-card v-if="loading == false">
            <div class="row">
              <div class="col-md-3">
                <div class="images" v-viewer>
                  <div class="profile-img pb-1">
                    <b-img
                      v-for="src in detailObj.logo"
                      :key="src"
                      :src="src"
                      style=" height:100px;"
                      rounded
                      fluid
                      alt="profile photo"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <h4 class="mt-2">{{ detailObj.business }}</h4>
                <div class="row">
                  <div class="col-md-12">
                    <p>{{ this.detailObj.aboutUs }}</p>
                  </div>
                </div>
              </div>
            </div>

           
            <b-row class="mt-2">
              <b-col>
                <h6>Name</h6>
                <p>{{ this.detailObj.firstName }}</p>
              </b-col>
              <b-col>
                <h6>Email</h6>
                <p>{{ this.detailObj.email }}</p>
              </b-col>
              
              <b-col>
                <h6>Landline</h6>
                <p>{{ this.detailObj.landlineNo }}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-card-text>
                  <h5>Location</h5>
                  <p>{{ this.detailObj.address }}</p>
                </b-card-text>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <h4 class="mb-0">Documents</h4>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col>
                <h6>Trade License</h6>
                <p>{{ detailObj.tradeLicenseNum }}</p>
              </b-col>
              <b-col>
                <h6>License Expiry</h6>
                <p>{{ detailObj.tradelicenseExDate }}</p>
              </b-col>
              <b-col>
                <h6>License Source</h6>
                <p>{{ detailObj.licenseSource }}</p>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <h5>Documents</h5>
                <mygallery
                  :images="detailObj.docs"
                  :index="index"
                  @close="index = null"
                ></mygallery>
                <div
                  class="image"
                  v-for="(image, imageIndex) in detailObj.docs"
                  :key="imageIndex"
                  @click="index = imageIndex"
                  :style="{
                    backgroundImage: 'url(' + image + ')',
                    width: '100px',
                    height: '100px',
                  }"
                ></div>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="2"> </b-col>
              <b-col cols="8" class="text-center">
                <b-button
                  v-if="this.detailObj.status == 'Pending' || this.detailObj.status == 'Denied' || this.detailObj.status == 'Suspended'"
                  v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                  variant="outline-success"
                  @click="SelectCategory(detailObj.userId)"
                  >Approve</b-button
                >
                <b-button
                  v-if="this.detailObj.status == 'Pending' "
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="outline-danger"
                  @click="UpdateVendor('Denied',detailObj.userId)"
                  >Denied</b-button
                >
                <b-button
                  v-if="this.detailObj.status == 'Approved'"
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="outline-danger"
                  @click="UpdateVendor('Suspended',detailObj.userId)"
                  >Suspend</b-button
                >
               
              </b-col>
              <b-col cols="2"> </b-col>
            </b-row>
          </b-card>
        </div>
      </div>
    </b-modal>
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
     
      </b-form>
    </b-modal>
 <b-modal
      id="modal-category"
      cancel-variant="outline-secondary"
      centered
      hide-footer="true"
      title="Assign Category"
    >
      <b-form>
       <b-form-group
          label="Category"
          invalid-feedback="Category is required."
          ref="categoryId"
        >
           <v-select
                      v-model="myObj.categoryId"
                      :options="categories"
                      label="name"
                      :reduce="val => val.id"
                      input-id="categoryId"
                      placeholder="Select category"
                      required
                      @search:blur="CheckCategory()"
                      @option:deselecting="CheckCategory()"
                      ref="categoryId"
                    />
              
        </b-form-group>

      <hr>
         <b-button
          class="float-right ml-5"
          variant="primary"
          @click="ApproveVendor()"
        >
          <span class="text-nowrap">Save</span>
        </b-button>
      </b-form>
    </b-modal>
    <b-card no-body class="mb-0" cols="12" md="12" sm="12">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-start">
              <div style="padding-right:15px">
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
          <!-- <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-end mb-1 mb-md-0"
          >
            
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col> -->
        </b-row>
      </div>

      <div>
        <b-table :items="filterVendors" :fields="fields" responsive striped>
          <template #cell(logo)="data">
            <b-avatar class="mr-1" :src="data.value" />
          </template>
          <template #cell(actions)="data">
            <b-dropdown
              variant="link"
              no-caret
              :right="$store.state.appConfig.isRTL"
            >
              <!-- <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template> -->
              <!-- <b-dropdown-item  v-b-modal.modal-select2  @click="openDetails(data.item.vendorId)">
              <feather-icon icon="FileTextIcon" />
              
              <span class="align-middle ml-50"   >Details</span>
            </b-dropdown-item> -->
            <b-button   variant="outline-secondary" v-b-modal.modal-select2 @click="openDetails(data.index)">
              
                <feather-icon
                icon="FileTextIcon"
                    class="mr-50"
              />
                
              <span>Details </span>

            </b-button>
            
              <!-- <b-dropdown-item @click="AcceptOrder(data.item.orderId)">
              <feather-icon icon="CheckIcon" />
              <span class="align-middle ml-50" >Accept order</span>
            </b-dropdown-item>

            <b-dropdown-item @click="DenyOrder(data.item.orderId)">
              <feather-icon icon="XIcon" />
              <span class="align-middle ml-50">Decline order</span>
            </b-dropdown-item> -->
            </b-dropdown>
          </template>
        </b-table>
        <div class="mx-2 mb-2">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <!-- <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span> -->
            </b-col>
            <!-- Pagination -->
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >
              <b-pagination
                :v-model="currentPage"
                total-rows="5"
                per-page="10"
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
          </b-row>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BImg,
  BSpinner,
  BCardImg,
  BFormGroup
} from 'bootstrap-vue';
 import vSelect from 'vue-select';
import store from '@/store';
//import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter';
//import useAllOrdersList from './useAllOrdersList'
//import orderStoreModule from '../allordersStoreModule'
import flatPickr from 'vue-flatpickr-component';
import Vue from 'vue';
import { BFormSelect } from 'bootstrap-vue';
//import Multiselect from "vue-multiselect";
import VueGallery from 'vue-gallery';
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
Vue.use(VueViewer);
export default {
  components: {
    //Multiselect,
    BFormGroup,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BSpinner,
    BCardImg,
    BImg,
    //BMedia,
    BAvatar,
    //BLink,
    //BBadge,
    //VueViewer,
    //BDropdown,
    //BDropdownItem,
    BPagination,
     vSelect,
    flatPickr,

    mygallery: VueGallery,
    //'gallery': VueGallery
  },

  props: {
    /* modalFilter: {
    type: [String, null],
    default: null,
    },
    modalFilterOptions: {
    type: Array,
    required: true,
    }*/
  },
  computed: {
    filterVendors: function() {
      return this.items.filter(pro => {
        console.log(pro);
        return (
          pro.business.toLowerCase().match(this.searchQuery.toLowerCase()) ||
          pro.city.toLowerCase().match(this.searchQuery.toLowerCase())
        );

        // toString(pro.orderId).match(toString(this.searchQuery))
      });
    },
  },

  created() {
    this.LoadData();
  },
  data() {
    return {
      categories:[],
      //  status: [{
      //   1: 'Current', approved: 'Professional', 3: 'Rejected', 4: 'Resigned', 5: 'Applied',
      // },
      // {
      //   1: 'light-primary', 2: 'light-success', 3: 'light-danger', 4: 'light-warning', 5: 'light-info',
      // }],
      currentPage: 1,
      loading: false,
      suspended: '',
      filterData: '',
      date: {
        range: '',
      },
      searchQuery: '',
      logoindex: null,
      logo: [],
      index: null,

      cover: '',
      docs: [],
      partners: [],
      fields: [
        { key: 'logo', label: 'logo' },
        { label: 'Name', key: 'business' },
        { label: 'City', key: 'city' },

        { label: 'Status', key: 'status' },
        { label: 'Details', key: 'actions' },
      ],
      items: [],
      selected: null,
      filterOptions: [
        { text: 'Most sold product', value: 'mostSold' },
        { text: 'Least sold product', value: 'leastSold' },
        { text: 'Most popular product', value: 'mostPopular' },
        { text: 'Least popular product', value: 'leastPopular' },
        { text: 'Most profitable product', value: 'mostProfitable' },
      ],
      rangeDate: null,
      myObj: {
       id:0,
       categoryId:0,
       status:'',
      },
      detailObj: {},
    };
  },
  methods: {
    ApproveVendor()
    {
      this.CheckCategory();
      if(this.CheckCategory() == false)
      {
      return 0;
      }
      else 
      {
         Swal.fire({
        title: 'Do you want to '+ this.myObj.status +' this vendor?',
        text: "You won't be able to revert this!",
        icon: 'question',
        iconColor: '#FB595f',
        confirmButtonText: `Accept`,
        confirmButtonColor: '#FB595f',
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'put',
            url: 'https://wishbox.fastech.pk/api/vendors/UpdateStatus',
            headers: {
              Authorization:
              'bearer ' + this.$store.state.userData.token,
            },
            data: { id: this.myObj.id, status:this.myObj.status,categoryId:this.myObj.categoryId  },
          };
          console.log(config.url);
          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                this.suspended = true;
                Swal.fire(this.myObj.status +'!', '', 'success').then(res => {
                  this.$bvModal.hide('modal-category');
                  this.$bvModal.hide('modal-select2');
                  this.LoadData();
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
      }
    },
    SelectCategory(vendorId)
    {
      if(this.detailObj.categoryId == 0 || this.detailObj.categoryId == null)
      {
        console.log(vendorId);
        this.myObj.id = vendorId;
        this.myObj.status ='Approved'; 
        return   this.$bvModal.show('modal-category');
      }
      else 
      {
         Swal.fire({
        title: 'Do you want to approve this vendor?',
        text: "You won't be able to revert this!",
        icon: 'question',
        iconColor: '#FB595f',
        confirmButtonText: `Accept`,
        confirmButtonColor: '#FB595f',
      }).then(result => {
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'put',
            url: 'https://wishbox.fastech.pk/api/vendors/UpdateStatus',
            headers: {
              Authorization:
              'bearer ' + this.$store.state.userData.token,
            },
            data: { id: vendorId, status:'Approved'  },
          };
          console.log(config.url);
          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                this.suspended = true;
                Swal.fire('Approved' +'!', '', 'success').then(res => {
                  this.$bvModal.hide('modal-select2');
                  this.LoadData();
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
      }
   
    },
     CheckCategory()
    {
     console.log(this.myObj.categoryId);
     var elem = this.$refs['categoryId'];
      if (this.myObj.categoryId == 0 || this.myObj.categoryId == undefined || this.myObj.categoryId == null) 
      {
        return elem.state = false;
      } 
      else 
      {
        return elem.state = true;
      }
    },
   
    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
    Filter() {
      // console.log("Osama");
      console.log(this.date.range, this.filterData.value);
      var split = this.date.range.split(' ');
      var from = split[0];
      var to = split[2];

      console.log(from);
    },
    UpdateVendor(status,id) {
    
    // if(status == "Approved" && this.myObj.categoryId == 0)
    // {
    // this.myObj.id = id;
    // this.myObj.status = status;  
    // return   this.$bvModal.show('modal-category');
    // }
    console.log(id);
      Swal.fire({
        title: 'Do you want to '+ status +' this vendor?',
        text: "You won't be able to revert this!",
        icon: 'question',
        iconColor: '#FB595f',
        confirmButtonText: `Accept`,
        confirmButtonColor: '#FB595f',
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'put',
            url: 'https://wishbox.fastech.pk/api/vendors/UpdateStatus',
            headers: {
              Authorization:
              'bearer ' + this.$store.state.userData.token,
            },
            data: { id: id, status:status  },
          };
          console.log(config.url);
          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                this.suspended = true;
                Swal.fire(status +'!', '', 'success').then(res => {
                  this.$bvModal.hide('modal-select2');
                  this.LoadData();
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
  
    openDetails(id) {
      this.detailObj = {};
      this.detailObj = this.filterVendors[id];
    },
 
    LoadData() {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: 'https://wishbox.fastech.pk/api/Vendors/GetAllVendors/',
        headers: {
          Authorization:
           'bearer ' + this.$store.state.userData.token
        },
      };

      axios(config)
        .then(response => {
          console.log(response);
          this.items = response.data.data;
          this.categories =  response.data.categories;
          console.log(this.items);
        })
        .catch(function(error) {
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
@import '@core/scss/vue/libs/vue-flatpicker.scss';

@import '@core/scss/vue/pages/page-profile.scss';
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
