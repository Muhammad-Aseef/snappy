<template>
  <div>
    <!-- select 2 demo -->

    <b-modal
      id="modal-login"
      centered
      ok-only
      no-close-on-backdrop
      hide-footer="true"
      title="Venue"
    >
      <b-form>
        <b-form-group
          label="Icon"
          invalid-feedback="Icon is required."
          ref="icon"
        >
          <v-select
            :options="categories"
            v-model="myObj.iconID"
            label="id"
            :reduce="val => val.id"
          >
            <template
              slot="option"
              slot-scope="option"
              placeholder="Select icon"
            >
              <img
                :src="option.iconUrl"
                style="height: 50px; width: 50px; object-fit: cover"
              />
            </template>
          </v-select>
          <!-- <v-select
                        v-model="myObj.categoryId"
                        :disabled="dataloading"
                        :options="categories"
                        label="name"
                        :reduce="val => val.id"
                        input-id="categoryId"
                        placeholder="Select category"
                        required
                        @search:blur="CheckCategory()"
                        @option:deselecting="CheckCategory()"
                        ref="categoryId"
                      /> -->
        </b-form-group>

        <b-form-group label="Name" invalid-feedback="Facilty name is required.">
          <b-form-input
            id="name-input"
            ref="name"
            placeholder="Enter facilty name here."
            required
            @focusout="CheckName()"
            v-model="myObj.name"
          />
        </b-form-group>

        <b-form-group
          label="Status"
          invalid-feedback="Status is required."
          ref="status"
        >
          <v-select
            placeholder="Select status."
            v-model="myObj.status"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="statusOptions"
            :clearable="false"
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
          <span class="text-nowrap">Save</span>
        </b-button>
      </div>
    </b-modal>
    <b-modal
      id="modal-reject"
      centered
      ok-only
      no-close-on-backdrop
      hide-footer="true"
      title="Reason"
    >
      <b-form>
        <b-form-group label="Reason">
          <b-form-textarea
            id="textarea-default"
            placeholder="Enter the reason of rejection."
            rows="3"
            v-model="reason"
          />
        </b-form-group>
      </b-form>
      <br />
      <div style="">
        <b-button
          class="float-right ml-5"
          variant="primary"
          @click="Rejected()"
        >
          <span class="text-nowrap">Send</span>
        </b-button>
      </div>
    </b-modal>

    <b-form-group label="Search Vendor" invalid-feedback="Search field">
      <b-form-input
        id="name-input"
        ref="name"
        placeholder="Enter vendor name or email to search"
        required
        @input="SearchData()"
        v-model="searchQuery"
      />
    </b-form-group>

    <b-card no-body class="mb-0">
      <!-- <div class="m-2">
        <b-row>
          
          <b-col md="10" sm="8">
            <div class="d-flex align-items-center justify-content-start"></div>
          </b-col>
          <b-col md="2" cols="4">
            <label for="">Filter</label>
            <v-select
              placeholder="Select status."
              v-model="filterStatus"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptionsFilter"
              @input="LoadData()"
              :clearable="false"
            />
          </b-col>
        </b-row>
      </div> -->

      <div>
        <b-table
          v-if="IsPending == false"
          :items="items"
          :fields="fields"
          striped
        >
          <template #cell(profilePic)="data">
            <b-img
              :src="data.item.profilePic"
              style="width: 100px; height: 100px; object-fit: cover"
              rounded
              alt="Rounded image"
            />
          </template>
          <template #cell(actions)="data">
            <template>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="info"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.bottom
                title="Details"
                @click="OpenDetails(data.item)"
              >
                <feather-icon size="16" icon="EyeIcon" />
              </b-button>

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-primary"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.bottom
                title="Up"
                @click="OpenEditModal(data.item)"
              >
                <feather-icon size="16" icon="ArrowUpCircleIcon" />
              </b-button>

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-primary"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.bottom
                title="Down"
                @click="OpenEditModal(data.item)"
              >
                <feather-icon size="16" icon="ArrowDownCircleIcon" />
              </b-button>

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.bottom
                title="Edit"
                @click="OpenEditModal(data.item)"
              >
                <feather-icon size="16" icon="EditIcon" />
              </b-button>

              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-danger"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.bottom
                title="Delete"
                size="16"
                @click="DeleteFlavour(data.item.id)"
              >
                <feather-icon size="16" icon="Trash2Icon" />
              </b-button>

              <!-- <feather-icon
                  @click="DeleteFlavour(data.item.id)"
                  icon="DeleteIcon"
                  size="16"
                  class="ml-2 align-middle text-body"
                  v-b-tooltip.hover.v-primary
                  v-b-tooltip.placement.right
                  title="Delete"
                /> -->
            </template>
          </template>
        </b-table>
        <b-table
          v-if="IsPending == true"
          :items="items2"
          :fields="fields2"
          striped
        >
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(cover)="data">
            <!-- {{data.item }} -->
            <b-img
              :src="data.item.cover"
              style="width: 100px; height: 100px; object-fit: cover"
              rounded
              alt="Rounded image"
            />
          </template>
          <template #cell(actions)="data">
            <template>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="success"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.bottom
                title="Approve"
                @click="ApproveVenue(data.item)"
              >
                <feather-icon size="16" icon="CheckCircleIcon" />
              </b-button>

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="danger"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.placement.bottom
                title="Reject"
                @click="RejectVenue(data.item)"
              >
                <feather-icon size="16" icon="XCircleIcon" />
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
  BFormTextarea,
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
import Ripple from 'vue-ripple-directive';

export default {
  components: {
    //Multiselect,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    // BMedia,
    //BMediaAside,
    // BSpinner,
    BImg,
    // BMedia,
    BFormGroup,
    //BAvatar,
    //  BLink,
    //BBadge,
    //BDropdown,
    //BDropdownItem,
    BPagination,
    BFormTextarea,
    vSelect,
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
    'b-tooltip': VBTooltip,
    Ripple,
  },
  created() {
    this.LoadData();
  },
  data() {
    return {
      searchQuery: '',
      reason: '',
      items2: [],
      fields2: [
        '#',
        { label: 'Pic', key: 'profilePic' },
        { label: 'Name ', key: 'name' },
        { label: 'Status', key: 'status' },
        { label: 'Vendor', key: 'vendorName' },
        { label: 'Contact No', key: 'mobile' },
        { label: 'Email', key: 'email' },
        'actions',
      ],
      IsPending: false,
      categories: [],
      venueses: [],
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJPc2FtYSIsImVtYWlsIjoib3NhbWF1c21hbjU1NUBnbWFpbC5jb20iLCJqdGkiOiJjMzI0MGI0ZS1mM2NlLTQxZGUtYmRmNS1iYTE1YTFjMjkyZDIiLCJleHAiOjE2NzA1NjU2MjQsImlzcyI6ImFwcGlja3NvbHV0aW9ucy5pby5jb20iLCJhdWQiOiJhcHBpY2tzb2x1dGlvbnMuaW8uY29tIn0.0_pK3DJcXTTEAk-fFziiMOkgGUC7nUYXppJ9C7dOIic',
      plus:
        'https://appick.io/u/lessons/64a03015-aaab-44a2-85c7-fc83ad9417b7.png',
      fileProfile: '',
      logoloading: false,
      errors: {
        status: false,
      },
      statusOptions: ['Active', 'Inactive', 'Pending'],
      statusOptionsFilter: ['user', 'vendor'],
      filterData: 'user',
      date: {
        range: '',
      },
      index: null,
      cover: '',
      docs: [],
      partners: [],
      fields: [
        { label: 'Pic', key: 'profilePic' },
        { label: 'Name ', key: 'fullName' },
        { label: 'Email', key: 'email' },
        { label: 'Mobile', key: 'mobile' },
        { label: 'Joined On', key: 'registeredOn' },
        { label: 'Status', key: 'status' },
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
        id: 0,
        name: '',
        status: 0,
        iconID: 0,
        sequence: 0,
        vendorID: 0,
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
    Rejected() {
      this.myObj.reason = this.reason;
      var axios = require('axios');
      // this.$store.state.userData.userID
      var config = {
        method: 'put',
        url: 'https://waqta.appick.io/api/venues/' + this.myObj.id,
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
        data: this.myObj,
      };

      axios(config)
        .then(response => {
          if (response.data.status === 'success') {
            this.$bvModal.hide('modal-reject');
            console.log(response.data);
            this.LoadData();

            this.$bvToast.toast('Reason sended.', {
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
        .catch(function(error) {
          console.log(error);
        });
    },
    RejectVenue(item) {
      this.myObj.id = item.id;
      this.myObj.name = item.name;
      this.myObj.sequence = item.sequence;
      this.myObj.vendorID = item.vendorID;
      this.myObj.status = 'Active';
      this.myObj.iconID = item.iconID;
      this.myObj.reason = item.reason;
      this.$bvModal.show('modal-reject');
    },
    ApproveVenue(item) {
      console.log(item);
      this.myObj.id = item.id;
      this.myObj.name = item.name;
      this.myObj.sequence = 0;
      this.myObj.vendorID = 0;
      this.myObj.status = 'Active';
      this.myObj.iconID = item.iconID;
      this.myObj.reason = item.reason;
      //return console.log(this.myObj);

      var axios = require('axios');
      // this.$store.state.userData.userID
      var config = {
        method: 'put',
        url: 'https://waqta.appick.io/api/venues/' + this.myObj.id,
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

            this.$bvToast.toast('Venue updated.', {
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
        .catch(function(error) {
          console.log(error);
        });
    },
    FilterTypes() {
      var axios = require('axios');
      var config = {
        method: 'get',
        url:
          'https://waqta.appick.io/api/venues/GetAll?status=' +
          this.filterStatus,
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then(response => {
          this.items = response.data.data;
          // response.data.data.forEach(e => {
          //   e.marketplaceShare = e.marketplaceShare * 100;
          //   this.items.push(e);
          // });

          // console.log(this.items);
          //console.log(this.venueses);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // this.$store.state.userData.userID

    CheckName() {
      var elem = this.$refs['name'];
      if (this.myObj.name == '' || this.myObj.name.length < 3) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckImage() {
      var elem = this.$refs['image'];
      if (this.myObj.image == '') {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckCategory() {
      console.log(this.myObj.iconID);
      var elem = this.$refs['icon'];
      if (
        this.myObj.iconID == 0 ||
        this.myObj.iconID == undefined ||
        this.myObj.iconID == null
      ) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckStatus() {
      var elem = this.$refs['status'];
      if (this.myObj.status == '') {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    OpenAddModal() {
      this.$router.replace({ name: 'apps-occasions', params: { id: '0' } });
      //router.push({ path: '/apps/occasions/:id', query: { plan: 'private' }})
    },
    OpenEditModal(row) {
      this.$router.replace({ name: 'apps-occasions', params: { id: row.id } });
      // this.$bvModal.show('modal-login');
      // this.myObj.id = row.id;
      // this.myObj.name = row.name;
      // this.myObj.iconID = row.iconID;
      // this.myObj.status = row.status;
      // this.myObj.vendorID = row.vendorID;
      // this.myObj.sequence = row.sequence;
    },
    OpenDetails(row) {
      this.$router.replace({
        name: 'apps-orderstatus',
        params: { id: row.id },
      });
    },
    DeleteFlavour(id) {
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
            url: 'https://waqta.appick.io/api/venues/' + id,
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
          };
          console.log(config.url);
          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire(
                  'Success!',
                  'Venue has been deleted.',
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
      //console.log(this.fileProfile.name);

      //console.log(this.fileProfile, this.loading );
      //Upload cover
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
            // this.file = undefined;
            var fn1 = e.data.myresp[0].path;
            console.log(fn1);
            // console.log(fn);
            this.plus = fn1;
            this.myObj.image = this.plus;
            //
            console.log(this.plus);
            //console.log(this.myObj.coverImg);
            this.logoloading = 'loaded';

            console.log(this.loading);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deleteLogo() {
      //console.log(0);
      this.myObj.image = '';
      this.logoloading = false;
    },
    AddFlavour() {
      this.CheckCategory();
      this.CheckName();
      this.CheckStatus();
      if (
        this.CheckCategory() == false ||
        this.CheckName() == false ||
        this.CheckStatus() == false
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
          // this.$store.state.userData.userID
          var config = {
            method: 'post',
            url: 'https://waqta.appick.io/api/venues',
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

                this.$bvToast.toast('Venue added.', {
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
            .catch(function(error) {
              console.log(error);
            });
        } else {
          //Edit
          var axios = require('axios');
          // this.$store.state.userData.userID
          var config = {
            method: 'put',
            url: 'https://waqta.appick.io/api/venues/' + this.myObj.id,
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

                this.$bvToast.toast('Venue updated.', {
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
            .catch(function(error) {
              console.log(error);
            });
        }
      }
    },

    LoadData() {
      if (
        this.filterStatus == null ||
        this.filterStatus == undefined ||
        this.filterStatus == ''
      )
        this.filterStatus = 'user';
      var axios = require('axios');
      var allicons = {
        method: 'get',
        url: `https://waqta.appick.io/api/Credentials/LoadUsers?uType=vendor`,
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };

      axios(allicons)
        .then(response => {
          this.items = [];
          console.log(response.data.data);
          response.data.data.forEach(item => {
            if (item.profilePic == null) {
              item.profilePic =
                'https://cdn.cloudious.net/c98eb876-1afb-4673-a2f1-e0d6a217bfda.jpg';
            }
            item.registeredOn = item.registeredOn.split('T')[0];
            this.items.push(item);
          });

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
