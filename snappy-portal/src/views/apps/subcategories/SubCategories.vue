<template>
  <div>
    <!-- select 2 demo -->

    <b-modal
      id="modal-login"
      centered
      ok-only
      :no-close-on-backdrop="true"
      hide-footer="true"
      title="Subcategory"
    >
      <b-form>
        <!-- <b-row>
          <b-col style="display: flex; justify-content: center;">
            <b-form-group
              ref="image"
              label="Image Icon"
              invalid-feedback="Image Icon is required."
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
        <b-row class="text-center">
          <b-col>
            <small class="text-muted">Recommended pixels are 850 x 950</small>
          </b-col>
        </b-row> -->
        <b-form-group
          label="Category"
          invalid-feedback="category is required."
          ref="category"
        >
          <v-select
            ref="category"
            placeholder="Select category."
            v-model="myObj.categoryID"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="categories"
            label="category"
            :reduce="(val) => val.id"
            :clearable="false"
            @input="CheckCategory()"
          />
        </b-form-group>
        <b-form-group
          label="subcategory"
          invalid-feedback="subcategory is required."
        >
          <b-form-input
            id="name-input"
            ref="name"
            placeholder="Enter subcategory here."
            required
            @focusout="CheckName()"
            v-model="myObj.subCategory"
          />
        </b-form-group>
      </b-form>
      <br />
      <div style="">
        <b-button
          class="float-right ml-5"
          variant="primary"
          @click="AddFlavour()"
        >
          <b-spinner
            v-if="request"
            variant="light"
            type="grow"
            small
            label="Spinning"
          ></b-spinner>
          <span v-if="!request" class="text-nowrap">Save</span>
        </b-button>
      </div>
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
      <div class="m-2">
        <b-row>
          <b-col class="mt-2" md="10" sm="8">
            <div class="d-flex align-items-center justify-content-start">
              <div style="padding-right: 15px">
                <b-button @click="OpenAddModal()" variant="primary">
                  <feather-icon icon="PlusIcon" class="mr-50" />
                  <span class="text-nowrap">Add Subcategory</span>
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
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.left
                title="Edit"
                @click="OpenEditModal(data.item)"
              >
                <feather-icon size="16" icon="EditIcon" />
              </b-button>
            </template>
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
    this.LoadData();
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
        // { label: "category", key: "categoryID" },
        { label: "subCategory", key: "subCategory" },
        { label: "status", key: "status" },
        "actions",
      ],
      filterStatus: "",
      items: [],
      request: false,
      categories: [],
      myObj: {
        id: 0,
        categoryID: 0,
        subCategory: "",
        status: "active",
      },
      searchQuery: "",
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
    CheckName() {
      var elem = this.$refs["name"];
      if (this.myObj.subCategory == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckCategory() {
      var elem = this.$refs["category"];
      // console.log(this.myObj.categoryID);
      if (this.myObj.categoryID === 0) {
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
    OpenAddModal() {
      this.myObj = {
        id: 0,
        categoryID: 0,
        subCategory: "",
        status: "active",
      };
      this.logoloading = false;
      this.plus =
        "https://dk0pm9zdlq16s.cloudfront.net/5be0a5b2-5eaf-4090-8528-4be800d41de0.jpg";
      this.$bvModal.show("modal-login");
    },
    OpenEditModal(item) {
      console.log(item);
      var axios = require("axios");
      var config = {
        method: "get",
        url: "https://kof.appick.io/api/SubCategory/" + item.id,
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
      console.log("Obj", this.myObj);
      this.CheckCategory();
      this.CheckName();
      if (this.CheckCategory() == false || this.CheckName() == false) {
        return this.$bvToast.toast("Please fill the form correctly.", {
          title: "Error!",
          variant: "danger",
          toaster: "b-toaster-bottom-center",
        });
      } else {
        this.request = true;
        if (this.myObj.id == 0) {
          var axios = require("axios");
          var config = {
            method: "post",
            url: "https://kof.appick.io/api/SubCategory",
            headers: {
              Authorization: "bearer " + this.$store.state.userData.token,
            },
            data: this.myObj,
          };

          axios(config)
            .then((response) => {
              if (response.data.status === "success") {
                console.log(response.data);
                Swal.fire("Success!", "SubCategory added.", "success").then(
                  (res) => {
                    this.$bvModal.hide("modal-login");
                    this.request = false;
                    this.LoadData();
                  }
                );
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
            url: "https://kof.appick.io/api/SubCategory/" + this.myObj.id,
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
                this.$bvToast.toast("SubCategory updated.", {
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
                this.request = false;
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
        url: "https://kof.appick.io/api/SubCategory",
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

      var config1 = {
        method: "get",
        url: "https://kof.appick.io/api/category",
        headers: {
          Authorization: "bearer " + this.$store.state.userData.token,
        },
      };

      axios(config1)
        .then((response) => {
          console.log(response);
          this.categories = response.data.data;
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
