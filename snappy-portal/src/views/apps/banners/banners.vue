<template>
  <div>
    <!-- select 2 demo -->

    <b-modal id="modal-login" centered ok-only hide-footer="true" title="Details">
      <b-form>
        <h5 class="font-weight-bolder">{{ detailObj.name }}</h5>
        <p class="mb-50">{{ detailObj.description }}</p>
        <hr />
        <div class="mb-50" v-for="(meal, index) in detailObj.meals" :key="index">
          <h6 class="mb-0">{{ meal.name }}</h6>
          <p class="mb-0">
            {{ meal.description }}
          </p>
        </div>
        <hr />
        <h6 class="mt-50 text-success">Rs.{{ detailObj.price }}</h6>
      </b-form>
      <br />
    </b-modal>

    <!-- <b-form-group label="Search Business Type" invalid-feedback="Search field">
      <b-form-input
        id="name-input"
        ref="name"
        placeholder="Enter business name to search"
        required
        @input="SearchData()"
        v-model="searchQuery"
      />
    </b-form-group> -->

    <b-card no-body class="mb-0">
      <!-- <div class="m-2">
        <b-row>
          <b-col class="mt-2" md="10" sm="8">
            <div class="d-flex align-items-center justify-content-start">
              <div style="padding-right: 15px">
                <b-button @click="OpenAddModal(0)" variant="primary">
                  <feather-icon icon="PlusIcon" class="mr-50" />
                  <span class="text-nowrap">Add Order</span>
                </b-button>
              </div>
            </div>
          </b-col>
         
        </b-row>
      </div> -->

      <div>
        <b-table :items="items" :fields="fields" striped>
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>

          <template #cell(actions)="data">
            <template>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.left
                title="View"
                @click="viewDetails(data.item.id)"
              >
                <feather-icon size="16" icon="EyeIcon" />
              </b-button>

              <!-- <b-button
                v-if="data.item.status === 'pending'"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="success"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-success
                v-b-tooltip.placement.left
                title="Mark Complete"
                @click="markComplete(data.item.id)"
              >
                <feather-icon size="16" icon="CheckIcon" />
              </b-button>

              <b-button
                v-if="data.item.paidToVendor === 0"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="warning"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-warning
                v-b-tooltip.placement.right
                title="Pay Vendor"
                @click="payVendor(data.item)"
              >
                <feather-icon size="16" icon="DollarSignIcon" />
              </b-button> -->
            </template>
          </template>
        </b-table>
        <div class="mx-2 mb-2">
          <b-row>
            <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
              <!-- <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span> -->
            </b-col>
            <!-- Pagination -->
            <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
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
  BFormGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BMediaAside,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BImg,
  VBTooltip,
  BSpinner,
  BFormCheckbox,
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
import Ripple from "vue-ripple-directive";

export default {
  components: {
    //Multiselect,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BMediaAside,
    BSpinner,
    BImg,
    BMedia,
    BFormGroup,
    //BAvatar,
    BLink,
    //BBadge,
    //BDropdown,
    //BDropdownItem,
    BPagination,
    vSelect,
    BFormCheckbox,
    //flatPickr,
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
    Ripple,
  },
  created() {
    // this.LoadData();
  },
  data() {
    return {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJPc2FtYSIsImVtYWlsIjoib3NhbWF1c21hbjU1NUBnbWFpbC5jb20iLCJqdGkiOiJjMzI0MGI0ZS1mM2NlLTQxZGUtYmRmNS1iYTE1YTFjMjkyZDIiLCJleHAiOjE2NzA1NjU2MjQsImlzcyI6ImFwcGlja3NvbHV0aW9ucy5pby5jb20iLCJhdWQiOiJhcHBpY2tzb2x1dGlvbnMuaW8uY29tIn0.0_pK3DJcXTTEAk-fFziiMOkgGUC7nUYXppJ9C7dOIic",
      plus: "",
      fileProfile: "",
      logoloading: false,
      errors: {
        status: false,
      },
      statusOptions: ["active", "inactive"],
      index: null,
      fields: [
        "#",
        { label: "subscription", key: "subscription" },
        { label: "kitchen", key: "kitchen" },
        { label: "amount", key: "amount" },
        // { label: "status", key: "status" },
        "actions",
      ],
      filterStatus: "",
      items: [
        // { kitchen: "ghsg" }
      ],
      request: false,
      myObj: {
        id: 0,
        title: "",
        icon: "",
        status: "",
      },
      searchQuery: "",
      detailObj: {
        id: 1,
        kitchen: {
          id: 1,
          name: "Kitchen Name",
          address: "kitchen Address",
          account_id: 1,
          status: 1,
          subscriptions: [],
          createdAt: "",
          updatedAt: "",
        },
        type: 1,
        name: "kababjees economic",
        description: "any description regarding kitchen",
        image_url: "use default kitch image",
        price: 5000,
        account_id: 1,
        plan_type: 1,
        allowedUser: 500,
        kitchen_id: 1,
        meals: [
          {
            name: "Aalo Palak",
            description: "recipie....",
          },
          {
            name: "Aalo Palak",
            description: "recipie....",
          },
        ],
        createdAt: "",
        updatedAt: "",
      },
    };
  },
  methods: {
    SearchData() {
      if (this.searchQuery.length > 0) {
        var data = this.items.filter(
          (data) =>
            JSON.stringify(data)
              .toLowerCase()
              .indexOf(this.searchQuery.toLowerCase()) !== -1
        );
        this.items = data;
      } else {
        this.LoadData();
      }
    },
    viewDetails(id) {
      this.$bvModal.show("modal-login");
      // var config = {
      //   method: "get",
      //   url: "https://localhost:3000/billing/history" + id,
      //   headers: {
      //     Authorization: "bearer " + this.$store.state.userData.token,
      //   },
      // };

      // axios(config)
      //   .then((response) => {
      //     this.detailObj = response.data.subscription;
      //     this.$bvModal.show("modal-login");
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    CheckName() {
      var elem = this.$refs["name"];
      if (this.myObj.title == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckImage() {
      console.log(this.myObj.icon);
      var elem = this.$refs["image"];
      if (this.myObj.icon == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckStatus() {
      var elem = this.$refs["status"];
      if (this.myObj.status == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    OpenAddModal(id) {
      if (id != 0) {
        var axios = require("axios");
        var config = {
          method: "get",
          url: "https://kof.appick.io/api/orders/LoadDetails?id=" + id,
          headers: {
            Authorization: "bearer " + this.$store.state.userData.token,
          },
        };

        axios(config)
          .then((response) => {
            console.log(response);
            this.myObj = response.data.data;
            this.plus = this.myObj.icon;
            this.logoloading = "loaded";
            this.$bvModal.show("modal-login");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.myObj = {
          id: 0,
          title: "",
          icon: "",
          sequence: 0,
          status: "",
        };
        this.logoloading = false;
        this.plus = "https://dk0pm9zdlq16s.cloudfront.net/5be0a5b2-5eaf-4090-8528-4be800d41de0.jpg";
        this.$bvModal.show("modal-login");
      }
    },
    markComplete(id) {
      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "This will mark order as complete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28C76F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, complete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          var axios = require("axios");
          var config = {
            method: "put",
            url: "https://kof.appick.io/api/orders/MarkAsCompleted?id=" + id,
            headers: {
              Authorization: "bearer " + this.$store.state.userData.token,
            },
          };
          console.log(config.url);
          axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === "success") {
                Swal.fire("Success!", "Order has been completed.", "success").then((res) => {
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
    payVendor(item) {
      console.log(item);
      Swal.fire({
        title: "Are you sure?",
        text: "This will pay the vendor!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28C76F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          var axios = require("axios");
          var config = {
            method: "get",
            url: "https://kof.appick.io/api/Orders/PayVendor?orderID=" + item.id,
            headers: {
              Authorization: "bearer " + this.$store.state.userData.token,
            },
          };

          axios(config)
            .then((response) => {
              console.log(response);
              if (response.data.status === "success") {
                console.log(response.data.data);
                this.LoadData();
                this.$bvToast.toast("Payment done!.", {
                  title: "Success!",
                  variant: "success",
                  toaster: "b-toaster-top-center",
                });
              } else {
                this.$bvToast.toast("Something went wrong!.", {
                  title: "Error!",
                  variant: "danger",
                  toaster: "b-toaster-top-center",
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
      console.log(this.fileProfile);
      var axios = require("axios");
      if (this.fileProfile !== "") {
        this.logoloading = true;
        let formData = new FormData();
        formData.append("file", this.fileProfile);
        axios
          .post("https://upload.appick.io", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

          .then((e) => {
            console.log(e.data);
            var fn1 = e.data.myresp[0].path;
            console.log(fn1);
            this.plus = fn1;
            this.myObj.icon = this.plus;
            // console.log(this.plus);
            this.logoloading = "loaded";
            this.CheckImage();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteLogo() {
      //console.log(0);
      this.myObj.icon = "";
      this.logoloading = false;
      this.$refs.fileProfile.value = null;
    },
    AddFlavour() {
      this.CheckImage();
      this.CheckName();
      this.CheckStatus();
      if (this.CheckImage() == false || this.CheckName() == false || this.CheckStatus() == false) {
        return this.$bvToast.toast("Please fill the form correctly.", {
          title: "Error!",
          variant: "danger",
          toaster: "b-toaster-bottom-center",
        });
      } else {
        console.log("Obj", this.myObj);
        this.request = true;
        if (this.myObj.id == 0) {
          var axios = require("axios");
          var config = {
            method: "post",
            url: "https://kof.appick.io/api/orders",
            headers: {
              Authorization: "bearer " + this.$store.state.userData.token,
            },
            data: this.myObj,
          };

          axios(config)
            .then((response) => {
              if (response.data.status === "success") {
                console.log(response.data);
                Swal.fire("Success!", "order added.", "success").then((res) => {
                  this.$bvModal.hide("modal-login");
                  this.request = false;
                  this.LoadData();
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          //Edit
          console.log("edit_Obj", this.myObj);
          this.request = true;
          var axios = require("axios");
          // this.$store.state.userData.userID
          var config = {
            method: "put",
            url: "https://kof.appick.io/api/ordrs/" + this.myObj.id,
            headers: {
              Authorization: "bearer " + this.$store.state.userData.token,
            },
            data: this.myObj,
          };
          axios(config)
            .then((response) => {
              console.log(response.data);
              if (response.data.status === "success") {
                this.$bvModal.hide("modal-login");
                this.request = false;
                this.LoadData();
                this.$bvToast.toast("order updated.", {
                  title: "Success!",
                  variant: "success",
                  toaster: "b-toaster-top-center",
                });
              } else {
                this.$bvToast.toast("Something went wrong.", {
                  title: "Error!",
                  variant: "danger",
                  toaster: "b-toaster-bottom-center",
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
      // console.log("userId",this.$store.state.userData)
      var axios = require("axios");
      var config = {
        method: "get",
        url: "https://kof.appick.io/api/Orders/LoadData",
        headers: {
          Authorization: "bearer " + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then((response) => {
          console.log(response);
          this.items = response.data.data;
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
