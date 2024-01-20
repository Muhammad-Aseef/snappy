<template>
  <div>
    <!-- select 2 demo -->
    <b-modal
      id="modal-select2"
      title="Order Details"
      centered
      ok-only
      size="md"
    >
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
        <!-- Table Top -->
        <b-row>
          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-start">
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

      <div>
        <b-table :items="items" :fields="myfields">
          <!-- <template #cell(actions)="data">
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
            <b-dropdown-item  v-b-modal.modal-select2  @click="openDetails(data.item.orderId)">
              <feather-icon icon="FileTextIcon" />
              
              <span class="align-middle ml-50"   >Details</span>
            </b-dropdown-item>

            <b-dropdown-item @click="AcceptOrder(data.item.orderId)">
              <feather-icon icon="CheckIcon" />
              <span class="align-middle ml-50" >Accept order</span>
            </b-dropdown-item>

            <b-dropdown-item @click="DenyOrder(data.item.orderId)">
              <feather-icon icon="XIcon" />
              <span class="align-middle ml-50">Decline order</span>
            </b-dropdown-item>
          </b-dropdown>
        </template> -->
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
              <!-- <b-pagination
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
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination> -->
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
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import { ref, onUnmounted } from '@vue/composition-api';
import { avatarText } from '@core/utils/filter';
import flatPickr from 'vue-flatpickr-component';
import { BFormSelect } from 'bootstrap-vue';
//import Multiselect from "vue-multiselect";
export default {
  components: {
    //Multiselect,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    //BImg ,
    //BMedia,
    //BAvatar,
    //BLink,
    //BBadge,
    //BDropdown,
    //BDropdownItem,
    //BPagination,
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
  data() {
    return {
      cover: '',
      myfields: [
        { label: 'id', key: 'BookingId' },
        { label: 'Date', key: 'date' },
        { label: 'Date', key: 'date' },
        'status',
        'actions',
      ],
      items: [],
      selected: null,
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
    };
  },
  methods: {
    openDetails(id) {
      console.log(id);
      var axios = require('axios');

      var config = {
        method: 'get',
        url: 'https://waqta.appick.io/api/oOrders/Detailsbyorders/' + id,
        headers: {
          Authorization:
            'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI',
        },
      };

      axios(config)
        .then(response => {
          // console.log(JSON.stringify(response.data));

          //  this.data  =  response.data;
          // console.log( response.data);
          //this.detailObj = response.data;
          console.log(response.data[0]);
          this.detailObj = response.data[0];
          console.log(this.detailObj);
          this.cover = this.detailObj.coverImg;
          console.log(this.cover);
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
              'https://waqta.appick.io/api/oOrders/UpdateOrderStatus/?id=' +
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
              'https://waqta.appick.io/api/oOrders/UpdateOrderStatus/?id=' +
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
    LoadData() {
      return console.log('Hellooooooo');
      var axios = require('axios');

      var config = {
        method: 'get',
        url: 'https://waqta.appick.io/api/bookings/GetAll?status=active',
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };
      axios(config)
        .then(response => {
          this.items = [];
          response.data.data.forEach(elem => {
            // elem.date = elem.date.split("T")[0];
            this.items.push(elem);
          });
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
</style>
