<template>
  <div>
    <!-- select 2 demo -->
    <b-modal id="modal-select3" title="Billing" centered ok-only size="sm">
      <div v-if="loading == true">
        <b-spinner
          variant="primary"
          type="grow"
          style="margin-left: 150px"
          class="p-2"
          label="Spinning"
        ></b-spinner>
      </div>

      <b-card v-if="loading == false">
        <b-row>
          <b-col cols="8">
            <h5>Mode</h5>
          </b-col>
          <b-col>
            <p>{{ this.myObj.modeOfpayment }}</p>
          </b-col>
        </b-row>

        <b-row class="mt-2" v-for="item in CakeDetails" v-bind:key="item.id">
          <b-col cols="8">
            <h5>{{ item.title }}</h5>
          </b-col>
          <b-col>
            <p>{{ 'AED ' + item.cost }}</p>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="8">
            <h5>Value Added Tax</h5>
          </b-col>
          <b-col>
            <p>{{ 'AED ' + this.myObj.vat }}</p>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="8">
            <h5>Delivery Charges</h5>
          </b-col>
          <b-col>
            <p>{{ 'AED ' + this.myObj.deliveryCharges }}</p>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="8">
            <h5>Discount</h5>
          </b-col>
          <b-col>
            <p>{{ 'AED ' + this.myObj.discount }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8">
            <h5>Bill</h5>
          </b-col>
          <b-col>
            <p>{{ 'AED ' + this.myObj.bill }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8">
            <h5>Net Bill</h5>
          </b-col>
          <b-col>
            <p>{{ 'AED ' + this.myObj.netBill }}</p>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>
    <b-modal
      v-if="loading"
      id="modal-select2"
      title="Details"
      centered
      ok-only
      size="md"
    >
      <!-- <div >
        <b-spinner
          variant="primary"
          type="grow"
          style="margin-left:200px;"
          class="p-2"
          label="Spinning"
        ></b-spinner>
      </div> -->
      <b-card>
        <b-row class="mt-1">
          <b-col>
            <h3>Booking Id: {{ detailObj.bookings.id }}</h3>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col>
            <b-card-text>
              <p><b> Booking Date:</b> {{ this.detailObj.bookings.date }}</p>
            </b-card-text>
          </b-col>

          <b-col>
            <b-card-text>
              <p><b> Amount: </b> {{ 'AED ' + detailObj.bookings.amount }}</p>
            </b-card-text>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card-text>
              <p>
                <b> From:</b> {{ detailObj.bookings.startDate }}
                <span class="ml-1"
                  ><b> To :</b> {{ detailObj.bookings.endDate }}
                </span>
              </p>
            </b-card-text>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-card-text>
              <p>
                <b> Membership:</b> {{ detailObj.bookings.menbershipType }}
                <span class="ml-1">
                  <b> Duration :</b> {{ detailObj.bookings.duration }}
                </span>
              </p>
            </b-card-text>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card-text>
              <p><b> Note:</b> {{ detailObj.bookings.note }}</p>
            </b-card-text>
          </b-col>
        </b-row>
        <b-row v-if="detailObj.bookings.reason != null">
          <b-col>
            <b-card-text>
              <p><b> Reason:</b> {{ detailObj.bookings.reason }}</p>
            </b-card-text>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col>
            <h3>Venue: {{ detailObj.venue.name }}</h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            <b-card-text>
              <p><b>Location:</b> {{ detailObj.venue.location }}</p>
            </b-card-text>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col>
            <h3>User: {{ detailObj.user.fullName }}</h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            <b-card-text>
              <p><b>Contact no:</b> {{ detailObj.user.mobile }}</p>
            </b-card-text>
          </b-col>
        </b-row>
        <!--           <b-row>
              <b-col cols="6">
                <b-card-text>
                  <p><b> Name :</b> {{ item.name }}</p>
                </b-card-text>
              </b-col>
              <b-col>
                <b-card-text>

                  <p><b> Contact :</b> {{ item.contactNo }}</p>
                </b-card-text>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="5">
                <b-card-text>
                  <p><b> Date :</b> {{ item.date }}</p>
                </b-card-text>
              </b-col>
              <b-col>
                <b-card-text>

                  <p><b> Time :</b> {{ item.pickupTime }}</p>
                </b-card-text>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-card-text>
                  <p><b> Address :</b> {{ item.address }}</p>
                </b-card-text>
              </b-col>
            </b-row> -->
      </b-card>
    </b-modal>
    <b-modal
      id="modal-login"
      cancel-variant="outline-secondary"
      ok-title="Show data"
      centered
      title="Filters"
    >
      <b-form>
        <b-form-group>
          <h5>Select date range</h5>
          <flat-pickr class="form-control" :config="{ mode: 'range' }" />
        </b-form-group>
      </b-form>
    </b-modal>

    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-start">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                @input="SearchData()"
                placeholder="Enter user name or venue name to search"
              />
            </div>
          </b-col>
          <b-col>
            <div class="mr-1">
              <b-row align-h="end">
                <b-col class="pl-2" cols="*" lg="*" md="*" sm="*">
                  <div>
                    <b-button variant="warning" @click="FilterTypes('pending')">
                      <span class="text-nowrap"
                        >Pending
                        <b-badge variant="primary" class="badge-glow">
                          1
                        </b-badge></span
                      >
                    </b-button>
                  </div>
                </b-col>
                <b-col class="pl-2" cols="*" lg="*" md="*" sm="*">
                  <div>
                    <b-button variant="info" @click="FilterTypes('scheduled')">
                      <span class="text-nowrap"
                        >Scheduled
                        <b-badge variant="primary" class="badge-glow">
                          3
                        </b-badge></span
                      >
                    </b-button>
                  </div>
                </b-col>
                <b-col class="pl-2" cols="*" lg="*" md="*" sm="*">
                  <div>
                    <b-button variant="success">
                      <span
                        style="padding-left: 10px"
                        class="text-nowrap"
                        @click="FilterTypes('completed')"
                      >
                        Completed
                        <b-badge variant="primary" class="badge-glow">
                          2
                        </b-badge></span
                      >
                    </b-button>
                  </div>
                </b-col>

                <b-col class="pl-2" cols="*" lg="*" md="*" sm="*">
                  <div>
                    <b-button
                      variant="danger"
                      @click="FilterTypes('cancelled')"
                    >
                      <span class="text-nowrap"
                        >Cancelled
                        <b-badge variant="primary" class="badge-glow">
                          3
                        </b-badge></span
                      >
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </div>

      <div>
        <b-table :items="items" :fields="fields" responsive striped>
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(id)="data">
            {{ data.item.bookings.id }}
          </template>
          <template #cell(date)="data">
            {{ data.item.bookings.date }}
          </template>
          <template #cell(amount)="data">
            {{ data.item.bookings.amount }}
          </template>
          <template #cell(fullName)="data">
            {{ data.item.user.fullName }}
          </template>
          <template #cell(name)="data">
            {{ data.item.venue.name }}
          </template>
          <template #cell(status)="data">
            {{ data.item.bookings.status }}
          </template>
          <template #cell(details)="data">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              @click="ShowDetails(data.item)"
            >
              <feather-icon icon="FileTextIcon" class="mr-50" />
              <span class="align-middle">Details</span>
            </b-button>
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
  BTabs,
  BTab,
  BButtonGroup,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import store from '@/store';
import { ref, onUnmounted } from '@vue/composition-api';
import { avatarText } from '@core/utils/filter';
import useAllOrdersList from './useAllOrdersList';
import orderStoreModule from '../allordersStoreModule';
import flatPickr from 'vue-flatpickr-component';
import { BFormSelect } from 'bootstrap-vue';
//import Multiselect from "vue-multiselect";
export default {
  components: {
    //Multiselect,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    //BTabs,
    // BTab,
    // BButtonGroup,
    //BImg ,
    //BMedia,
    //BAvatar,
    //BLink,
    BBadge,
    //BDropdown,
    // BDropdownItem,
    BPagination,
    //vSelect,
    flatPickr,
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
  computed: {
    filterOrders: function() {
      return this.items.filter(pro => {
        return (
          pro.bookings.id.toLowerCase().match(this.searchQuery.toLowerCase()) ||
          pro.user.fullName.toLowerCase().match(this.searchQuery.toLowerCase())
        );

        // toString(pro.orderId).match(toString(this.searchQuery))
      });
    },
  },
  data() {
    return {
      searchQuery: '',
      tabIndex: 0,
      bakeryName: '',
      CakeDetails: [],
      loading: false,
      cover: '',
      fields: [
        //  '#',
        //,
        { label: 'Booking Id', key: 'id' },
        { label: 'Date', key: 'date' },
        { label: 'Amount', key: 'amount' },
        { label: 'User', key: 'fullName' },
        { label: 'Venue', key: 'name' },
        // { label: 'Customer', key: 'date' },
        // 'date',
        // { label: 'Net Total', key: 'amount' },
        'status',
        'Details',
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
        orderId: 0,
        customerId: 0,
        bill: 0,
        discount: 0,
        modeOfpayment: '',
        vendorId: 0,
        deliveryCharges: 0,
        date: '',
        totalBill: 0,
      },
      detailObj: {},
      searchQuery: '',
      filterStatus: '',
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
        this.FilterTypes(this.filterStatus);
      }
    },
    Billing(item) {
      console.log(item);
      this.loading = true;
      var axios = require('axios');

      var config = {
        method: 'get',
        url:
          'https://okaaik.fastech.pk/api/oOrders/Detailsbyorders/' +
          item.orderId,
        headers: {
          Authorization:
            'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
        },
      };

      axios(config)
        .then(response => {
          // console.log(JSON.stringify(response.data));

          //  this.data  =  response.data;
          //console.log(response.data.orderDetails);

          //this.bakeryName = response.data;

          this.CakeDetails = [];
          //this.product = response.data.orderDetails;
          this.CakeDetails = response.data.orderDetails;
          console.log(this.CakeDetails);
          this.myObj.orderId = item.orderId;
          this.myObj.userId = item.userId;
          this.myObj.vendorId = item.vendorId;
          this.myObj.modeOfpayment = item.modeOfpayment;
          this.myObj.bill = item.bill;
          this.myObj.vat = item.vat;
          this.myObj.deliveryCharges = item.deliveryCharges;
          this.myObj.totalBill = item.totalBill;
          this.myObj.discount = item.discount;
          this.myObj.netBill = item.netBill;
          this.myObj.transactionId = item.transactionId;
          this.myObj.paidAmount = item.paidAmount;
          this.myObj.paidAmount = item.bakeryName;
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ShowDetails(item) {
      this.loading = true;
      this.detailObj = item;
      console.log('-------------', this.detailObj);
      this.$bvModal.show('modal-select2');
    },

    openDetails(id) {
      this.loading = true;
      console.log(id);
      var axios = require('axios');

      var config = {
        method: 'get',
        url: 'https://okaaik.fastech.pk/api/oOrders/Detailsbyorders/' + id,
        headers: {
          Authorization:
            'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
        },
      };

      axios(config)
        .then(response => {
          // console.log(JSON.stringify(response.data));

          //  this.data  =  response.data;
          this.bakeryName = response.data.orderDetails[0].bakeryName;
          console.log(response.data.orderDetails);
          this.CakeDetails = [];
          //this.product = response.data.orderDetails;
          response.data.orderDetails.forEach(elem => {
            elem.date = elem.date.split('T')[0];
            this.CakeDetails.push(elem);
          });
          console.log(this.CakeDetails);

          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    AcceptOrder(id) {
      Swal.fire({
        title: 'Do you want to accept the order?',
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
            url:
              'https://okaaik.fastech.pk/api/oOrders/UpdateOrderStatus/?id=' +
              id +
              '&check=true',
            headers: {
              Authorization:
                'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
            },
          };
          console.log(config.url);
          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire('Accepted!', '', 'success').then(res => {
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
    DenyOrder(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, deny it!',
      }).then(result => {
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'put',
            url:
              'https://okaaik.fastech.pk/api/oOrders/UpdateOrderStatus/?id=' +
              id +
              '&check=false',
            headers: {
              Authorization:
                'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
            },
          };
          console.log(config.url);
          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire(
                  'Denied!',
                  'Your order has been denied.',
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
    FilterTypes(status) {
      this.filterStatus = status;
      //  return console.log("--------",status);
      var axios = require('axios');
      var config = {
        method: 'get',
        url: 'https://waqta.appick.io/api/bookings/GetAll?status=' + status,
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then(response => {
          this.items = [];
          response.data.data.forEach(elem => {
            elem.bookings.date = elem.bookings.date.split('T')[0];
            elem.bookings.id = elem.bookings.id.toString();
            this.items.push(elem);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      // this.$store.state.userData.userID
    },
    LoadData() {
      var axios = require('axios');
      var config = {
        method: 'get',
        url:
          'https://healthy-sign-353215.appspot.com/api/bookings/GetAll?status=pending',
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };
      axios(config)
        .then(response => {
          console.log(response.data);
          this.items = [];
          response.data.data.forEach(elem => {
            elem.bookings.date = elem.bookings.date.split('T')[0];
            elem.bookings.id = elem.bookings.id.toString();
            this.items.push(elem);
          });
          console.log('-------------', this.items);
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
