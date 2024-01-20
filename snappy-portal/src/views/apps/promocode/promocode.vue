<template>
  <div>
    <!-- select 2 demo -->
     <b-modal
      id="modal-login"
      no-close-on-backdrop
      centered
      ok-only
      size="md"
      hide-footer="true"
      title="Add Voucher"
    >
      <b-form>
        <b-row>
          <b-col>
            <b-form-group
              ref="image"
              label="Cover Image"
              invalid-feedback="Cover Image is required."
            >
              <b-media no-body>
                <div v-if="logoloading == true">
                  <b-spinner
                    variant="primary"
                    type="grow"
                    class="m-5"
                    label="Spinning"
                  ></b-spinner>
                </div>

                <b-media-aside>
                  <b-link>
                    <b-img
                      ref="previewEl"
                      rounded
                      src="https://dk0pm9zdlq16s.cloudfront.net/5be0a5b2-5eaf-4090-8528-4be800d41de0.jpg"
                      @click="$refs.fileProfile.click()"
                      v-if="logoloading == false"
                      style="height: 150px; width: 150px; object-fit: cover"
                    />
                  </b-link>

                  <b-link v-if="logoloading == 'loaded'">
                    <div>
                      <i
                        @click="deleteLogo()"
                        style="margin-top: 70px; margin-left: 70px"
                        class="fa fa-trash fa-md text-danger position-absolute"
                      ></i>
                    </div>
                    <b-img
                      rounded
                      :src="plus"
                      style="height: 150px; width: 150px; object-fit: cover"
                    />
                    <br />
                  </b-link>

                  <input
                    type="file"
                    id="fileProfile"
                    hidden
                    ref="fileProfile"
                    @change="selectlogo()"
                    accept="image/*"
                  />
                </b-media-aside>
              </b-media>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group
          label="Title"
          invalid-feedback="Title is required."
          ref="title"
        >
          <b-form-input
            v-model="myObj.title"
            placeholder="Enter title here"
            @focusout="checkTitle()"
          />
        </b-form-group>
        <b-form-group
          label="Subtitle"
          invalid-feedback="Subtitle is required."
        >
          <b-form-input
            v-model="myObj.subtitle"
            placeholder="Enter subtitle here"
          />
        </b-form-group>
        <b-form-group
          label="discount"
          invalid-feedback="discount is required."
          ref="discount"
        >
          <b-form-input
            type="number"
            v-model="myObj.discount"
            ref="discount"
            placeholder="Enter discount here"
          />
        </b-form-group>
        <b-form-group
          label="Minimum Booking Amount"
          invalid-feedback="Amount is required."
        >
          <b-form-input
            type="number"
            v-model="myObj.minBookingAmount"
            placeholder="Enter minimum booking amount here"
          />
        </b-form-group>
        <b-form-group
          label="Valid Till"
          invalid-feedback="Select valid date."
          ref="validTill"

        >
          <flat-pickr
            v-model="myObj.validTill"
            class="form-control"
            placeholder="Select to date."
            @on-change="checkvalidTill()"
          />
        </b-form-group>
      </b-form>
      <br />
      <div>
        <b-button
          class="float-right ml-5"
          variant="primary"
          @click="AddFlavour()"
        >
          <span class="text-nowrap">Save</span>
        </b-button>
      </div>
    </b-modal>
    
    <b-form-group label="Search Voucher" invalid-feedback="Search field">
      <b-form-input
        id="name-input"
        ref="name"
        placeholder="Enter Voucher name to search"
        required
        @input="SearchData()"
        v-model="searchQuery"
      />
    </b-form-group>

    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Add Flavour -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-start">
              <div style="padding-right: 15px">
                <b-button @click="OpenAddModal(0)" variant="primary">
                  <feather-icon icon="PlusIcon" class="mr-50" />
                  <span class="text-nowrap">Add Voucher</span>
                </b-button>
              </div>
              <!-- <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              /> -->
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
        <b-table :items="items" :fields="fields" striped>
          <!-- <template #cell(#)="data">
            {{ data.index + 1 }}
          </template> -->
          <template #cell(cover)="data">
            <b-img
              :src="data.value"
              style="width: 100px; height: 100px; object-fit: cover"
              rounded
              alt="Rounded image"
            />
          </template>
          <template #cell(actions)="data">
            <template>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.left
                title="Edit"
                @click="OpenAddModal(data.item.id)"
              >
                <feather-icon size="16" icon="EditIcon" />
              </b-button>

              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-danger"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-danger
                v-b-tooltip.placement.right
                title="Delete"
                @click="Delete(data.item.id)"
              >
                <feather-icon size="16" icon="Trash2Icon" />
              </b-button>
            </template>
            <!-- 
      <template #cell(actions)="data">
          <b-dropdown
            variant="link"
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
            <b-dropdown-item    @click="OpenEditModal(data.item)">
              <feather-icon icon="EditIcon" />
              
              <span class="align-middle ml-50"   >Edit</span>
            </b-dropdown-item>
              <b-dropdown-item    @click="DeleteFlavour(data.item.subCategoryId)">
              <feather-icon icon="XIcon" />
              
              <span class="align-middle ml-50"   >Delete</span>
            </b-dropdown-item>
              -->
            <!-- <b-dropdown-item @click="AcceptOrder(data.item.orderId)">
              <feather-icon icon="CheckIcon" />
              <span class="align-middle ml-50" >Accept order</span>
            </b-dropdown-item>

            <b-dropdown-item @click="DenyOrder(data.item.orderId)">
              <feather-icon icon="XIcon" />
              <span class="align-middle ml-50">Decline order</span>
            </b-dropdown-item> 
          </b-dropdown>-->
          </template>
        </b-table>
        <!-- <div class="mx-2 mb-2">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
            </b-col>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
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
          </b-row>
        </div> -->
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
  BMediaAside,
  BSpinner,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BImg,
  VBTooltip,
  BFormGroup,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import store from '@/store';
//import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter';
//import useAllOrdersList from './useAllOrdersList'
//import orderStoreModule from '../allordersStoreModule'
import flatPickr from 'vue-flatpickr-component';
import { BFormSelect } from 'bootstrap-vue';
//import Multiselect from "vue-multiselect";
import VueGallery from 'vue-gallery';
import moment from 'moment';
import { forEach } from 'postcss-rtl/lib/affected-props';

export default {
  components: {
    //Multiselect,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BFormGroup,
    BTable,
    BMedia,
    BMediaAside,
    BSpinner,
    BImg ,
    //BAvatar,
    BLink,
    //BBadge,
    //BDropdown,
    //BDropdownItem,
    BPagination,
    vSelect,
    flatPickr,
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
  created() {
    this.LoadData();
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      currentDate: moment().format('YYYY-MM-DD'),
      plus: 'https://dk0pm9zdlq16s.cloudfront.net/5be0a5b2-5eaf-4090-8528-4be800d41de0.jpg',
      fileProfile: '',
      logoloading: false,
      errors: {
        validity: false,
        code: false,
        discountPercent: false,
        limit: false,
        validity: false,
      },
      statusOptions: ['Active', 'Inactive'],
      filterData: '',
      date: {
        range: '',
      },
      index: null,
      cover: '',
      docs: [],
      partners: [],
      fields: [
        { label: 'Cover', key: 'cover' },
        { label: 'Title', key: 'title' },
        { label: 'Subtitle', key: 'subtitle' },
        { label: 'Discount', key: 'discount' },
        { label: 'Minimum Amount', key: 'minBookingAmount' },
        { label: 'Valid Till', key: 'validTill' },
        'actions',
      ],
      items: [],
      searchQuery: '',
      subCatItems: [],
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
        id: 0,
        title: "",
        subtitle: "",
        discount: 0,
        validTill: "",
        cover: "",
        sequence: 0,
        status: "active",
        minBooking: 0,
        minBookingAmount: 0,
        url: "",
      },
      detailObj: {},
    };
  },
  methods: {
    SearchData() {
      if (this.searchQuery.length > 0) {
        var data = this.items.filter(
          data =>
            JSON.stringify(data)
              .toLowerCase()
              .indexOf(this.searchQuery.toLowerCase()) !== -1,
        );
        this.items = data;
      } else {
        this.LoadData();
      }
    },
    checkImage() {
      var elem = this.$refs['image'];
      if (this.myObj.cover == '') {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    checkValidTill() {
      var elem = this.$refs['validTill'];
      console.log(this.currentDate);
      if (
        this.myObj.validTill <= this.currentDate ||
        this.myObj.validTill == null
      ) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    checkTitle() {
      var elem = this.$refs['title'];
      return (elem.state = this.myObj.title.length > 2 ? true : false);
    },
    checkPromo() {
      var elem = this.$refs['promo'];

      if (this.myObj.code == '' || this.myObj.code.length < 2) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    checkAmount() {
      var elem = this.$refs['amount'];
      console.log('Hello', this.myObj.discountLimit);
      var myre = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
      //re.test(this.value)
      //var x = parseFloat(this.myObj.limit);
      if (
        myre.test(this.myObj.discountLimit) &&
        this.myObj.discountLimit != 0 &&
        this.myObj.discountLimit !== null
      ) {
        console.log('1');
        return (elem.state = true);
        // value is out of range
      } else {
        console.log('2');

        return (elem.state = false);
      }
    },
    checkDiscount() {
      var elem = this.$refs['discount'];

      var x = parseFloat(this.myObj.discountPercentange);
      if (isNaN(x) || x <= 0 || x > 100) {
        return (elem.state = false);
        // value is out of range
      } else {
        return (elem.state = true);
      }
    },
    CheckFromDate() {
      var elem = this.$refs['validFrom'];

      console.log(this.currentDate);
      if (
        this.myObj.validFrom <= this.currentDate ||
        this.myObj.validFrom == null
      ) {
        return (elem.state = false);
      } else {
        // elem.state = true;
        return (elem.state = true);
      }
    },
    CheckToDate() {
      var elem = this.$refs['validTo'];

      console.log(this.currentDate);
      if (
        this.myObj.validTo <= this.currentDate ||
        this.myObj.validTo == null
      ) {
        return (elem.state = false);
      } else {
        // elem.state = true;
        return (elem.state = true);
      }
    },
    OpenAddModal(id) {
      this.$bvModal.show('modal-login');
      if (id == 0){
        this.myObj = {
          id: 0,
          title: "",
          subtitle: "",
          discount: 0,
          validTill: "",
          cover: "",
          sequence: 0,
          status: "active",
          minBooking: 0,
          minBookingAmount: 0,
          url: "",
        }
        this.logoloading = false;
        this.plus =
          'https://dk0pm9zdlq16s.cloudfront.net/5be0a5b2-5eaf-4090-8528-4be800d41de0.jpg';
      }
      else{
        console.log("edit_id:", id);
        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'https://waqta.appick.io/api/PromoVouchers/'+id,
            headers: {
                Authorization: 'bearer ' + this.$store.state.userData.token,
            },
        };
        axios(config)
            .then(response => {
                this.myObj = response.data.data;
                console.log("obj:",this.myObj);
                this.plus = this.myObj.cover
                this.logoloading = 'loaded' 
            })
            .catch(function(error) {
                console.log(error);
            });
      }
    },
    OpenEditModal(row) {
      this.$bvModal.show('modal-login');
      this.myObj.id = row.id;
      this.myObj.validFrom = row.validFrom;
      this.myObj.validTo = row.validTo;
      this.myObj.discountPercentange = row.discountPercentange;
      this.myObj.discountLimit = row.discountLimit;
      this.myObj.code = row.code;
      this.myObj.vendorID = row.vendorID;
      this.myObj.status = row.status;
      this.myObj.forAll = row.forAll;
    },
    Delete(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'delete',
            url: 'https://waqta.appick.io/api/PromoVouchers/' + id,
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
            data: this.myObj,
          };
          console.log(config.url);
          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire(
                  'Success!',
                  'Promo Voucher has been deleted.',
                  'success',
                ).then(res => {
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
    selectlogo() {
      this.fileProfile = this.$refs.fileProfile.files[0];
      var axios = require('axios');
      if (this.fileProfile !== '') {
        this.logoloading = true;
        let formData = new FormData();
        formData.append('file', this.fileProfile);
        console.log(this.fileProfile);
        axios
          .post('https://upload.appick.io', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          .then(e => {
            console.log(e.data);
            var fn1 = e.data.myresp[0].path;
            this.plus = fn1;
            this.myObj.cover = this.plus;
            console.log("cover", this.myObj.cover);
            this.logoloading = 'loaded';
            this.checkImage();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deleteLogo() {
      this.myObj.cover = '';
      this.logoloading = false;
      this.$refs.fileProfile.value = null;
    },
    CheckStatus() {
      var elem = this.$refs['status'];
      if (this.myObj.status == '') {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    AddFlavour() {
      this.checkImage();
      this.checkValidTill();
      this.checkTitle();
      if (
        this.checkImage() == false ||
        this.checkValidTill() == false ||
        this.checkTitle() == false
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

          var config = {
            method: 'post',
            url: 'https://waqta.appick.io/api/PromoVouchers',
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
            data: this.myObj,
          };

          axios(config)
            .then(response => {
              if (response.data.status === 'success') {
                console.log(response.data);
                this.$bvModal.hide('modal-login');
                this.LoadData();
                Swal.fire(
                  'Success!',
                  'Promo Voucher Added Successfully.',
                  'success',
                )
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          //Edit
          var axios = require('axios');
          // this.$store.state.userData.userID
          var config = {
            method: 'put',
            url: 'https://waqta.appick.io/api/PromoVouchers/' + this.myObj.id,
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
            data: this.myObj,
          };
          axios(config)
            .then(response => {
              if (response.data.status === 'success') {
                this.$bvModal.hide('modal-login');
                console.log(response.data);
                this.LoadData();

                this.$bvToast.toast('Promo Voucher updated.', {
                  title: 'Success!',
                  variant: 'success',
                  toaster: 'b-toaster-top-center',
                });
              } else {
                this.$bvToast.toast('Something went wrong.', {
                  title: 'Error!',
                  variant: 'danger',
                  toaster: 'b-toaster-top-center',
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      }
    },
    LoadData() {
      var axios = require('axios');
      // this.$store.state.userData.userID
      var config = {
        method: 'get',
        url: 'https://waqta.appick.io/api/PromoVouchers',
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then(response => {
          console.log("res:",response)
          this.items = response.data.data
          console.log(this.items);

          // console.log(JSON.stringify(response.data));
          //  this.data  =  response.data;
          //console.log(this.$store.state.userData.userID);
          //this.items = response.data.query;
          // this.subCatItems = [];
          // response.data.data.forEach(elem => {
          //   elem.validFrom = elem.validFrom.split('T')[0];
          //   elem.validTo = elem.validTo.split('T')[0];
          //   this.subCatItems.push(elem);
          // });
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
