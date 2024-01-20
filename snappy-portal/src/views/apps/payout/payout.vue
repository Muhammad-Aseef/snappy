<template>
  <div>
    <b-form-group label="Search Report" invalid-feedback="Search field">
      <b-form-input
        id="name-input"
        ref="name"
        placeholder="Enter venue name or email to search"
        required
        @input="SearchData()"
        v-model="searchQuery"
      />
    </b-form-group>
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-start">
              <div class="d-flex align-items-center">
                <feather-icon icon="CalendarIcon" size="16" />
                <flat-pickr
                  v-model="rangePicker"
                  :config="{ mode: 'range' }"
                  class="form-control flat-picker bg-transparent border-0 shadow-none"
                  placeholder="YYYY-MM-DD"
                  @on-change="GetData()"
                  @on-open="Clear()"
                />
              </div>
              <div style="padding-right: 15px">
                <b-button @click="getReport()" variant="primary">
                  <span class="text-nowrap">Generate Report</span>
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <div>
        <b-table :items="items" :fields="fields" striped>
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(actions)="data">
            <template>
              <b-button
                @click="payment(data.item.accID)"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.left
                title="Pay"
              >
                <feather-icon size="16" icon="ClipboardIcon" />
              </b-button>
            </template>
          </template>
        </b-table>
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
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
//import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from "@core/utils/filter";
//import useAllOrdersList from './useAllOrdersList'
//import orderStoreModule from '../allordersStoreModule'
import flatPickr from "vue-flatpickr-component";
import { BFormSelect } from "bootstrap-vue";
//import Multiselect from "vue-multiselect";
import VueGallery from "vue-gallery";
import moment from "moment";
import { forEach } from "postcss-rtl/lib/affected-props";

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
    //BMedia,
    //BMediaAside,
    //BSpinner,
    //BImg ,
    //BMedia,
    //BAvatar,
    //BLink,
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
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      myObj: {
        dtFrom: "",
        dtTo: "",
      },
      rangePicker: [],
      items: [],
      fields: [
        "#",
        { label: "Venue Name", key: "venueName" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Bookings", key: "bookingIDs" },
        { label: "Amount", key: "totalAmount" },
        { label: "Waqta Share", key: "marketPlaceShare" },
        { label: "Net Pay", key: "netPay" },
        "actions",
      ],
      searchQuery: ''
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
        this.getReport();
      }
    },
    Clear() {
      this.rangePicker = [];
    },
    GetData() {
      if (this.rangePicker.length > 0) {
        var splited = this.rangePicker.split(" to ");
        this.myObj.dtFrom = splited[0];
        this.myObj.dtTo = splited[1];
        console.log("obj:", this.myObj);
      }
    },
    getReport() {
      if (this.myObj.dtFrom == "" || this.myObj.dtTo == "") {
        this.$bvToast.toast("Please select the date.", {
          title: "Error!",
          variant: "error",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      } else {
        var axios = require("axios");
        var config = {
          method: "post",
          url: "https://waqta.appick.io/api/Bookings/CreatePayout",
          headers: {
            Authorization: "bearer " + this.$store.state.userData.token,
          },
          data: this.myObj,
        };
        axios(config)
          .then((response) => {
            console.log("res", response);
            if (response.data.status === "success") {
              console.log(response.data);
              this.items = response.data.data;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    payment(id) {
      if (id == null) {
        this.$bvToast.toast("Vendor stripe account is not linked.", {
          title: "Error!",
          variant: "error",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      } else {
        Swal.fire("Success!", "Payment Done Successfully!.", "success");
      }
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
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
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
