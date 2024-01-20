<template>
  <div>
    <!-- select 2 demo -->

    <b-modal
      id="modal-login"
      centered
      ok-only
      hide-footer="true"
      title="Add Delivery Charges"
    >
      <b-form>
        <b-form-group
          label="Country name"
          invalid-feedback="Country name is required."
        >
          <b-form-input
            placeholder="Enter country name here."
            v-model="myObj.country.name"
            ref="country"
            @focusout="CheckName"
          >
          </b-form-input>
        </b-form-group>
           <b-form-group
          label="Vat (%)"
          invalid-feedback="Vat is required."
        >
          <b-form-input
            id="name-input"
            ref="vat"
            placeholder="Enter vat here."
            required
            @keyup="CheckVAT()"
            v-model="myObj.country.vat"
          />
        </b-form-group>
        <b-form-group
          label="Select Cities"
          invalid-feedback="City is required."
          ref="cityId"
        >
          <v-select
            v-model="myObj.cityIds"
            :disabled="dataloading"
            :options="cities"
            label="city"
            multiple
            :reduce="(val) => val.id"
            input-id="Id"
            placeholder="Select city"
            required
            @search:blur="CheckCity()"
            @option:deselecting="CheckCity()"
            ref="cityId"
          />
        </b-form-group>
      </b-form>
      <b-row>
        <b-col cols="12">
          <hr />
        </b-col>
      </b-row>
   
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

    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Add Flavour -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-start">
              <div style="padding-right: 15px">
                <b-button @click="OpenAddModal()" variant="primary">
                  <feather-icon icon="PlusIcon" class="mr-50" />
                  <span class="text-nowrap">Add Country</span>
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
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>
          
          <!-- <template #cell(name)="data">
            <b-badge
              variant="light-primary"
              style="margin-left: 2px"
              v-for="i in data.item.regionNames"
              :key="i"
            >
              {{ i }}
            </b-badge>
          </template> -->
          <template #cell(vat)="data">
           {{data.item.vat}} %
          </template>
          <template #cell(actions)="data">
            <template>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="btn-icon"
                v-b-tooltip.hover.v-danger
                v-b-tooltip.placement.left
                title="Edit"
                @click="OpenEditModal(data.item)"
              >
                <feather-icon size="16" icon="EditIcon" />
              </b-button>
              <!-- <feather-icon
              
                icon="EditIcon"
                size="16"
                class="align-middle text-body"
                v-b-tooltip.hover.v-danger
                v-b-tooltip.placement.left
                title="Edit"
              /> -->

              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-danger"
                class="ml-1 btn-icon"
                v-b-tooltip.hover.v-danger
                v-b-tooltip.placement.right
                title="Delete"
                size="16"
                @click="DeleteFlavour(data.item.id)"
              >
                <feather-icon size="16" icon="XIcon" />
              </b-button>

              <!-- <feather-icon
                @click="DeleteFlavour(data.item.id)"
                icon="DeleteIcon"
                size="16"
                class="ml-2 align-middle text-body"
                v-b-tooltip.hover.v-danger
                v-b-tooltip.placement.right
                title="Delete"
              /> -->
            </template>
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
            <b-dropdown-item    @click="OpenEditModal(data.item)">
              <feather-icon icon="EditIcon" />
              
              <span class="align-middle ml-50"   >Edit</span>
            </b-dropdown-item>
              <b-dropdown-item    @click="DeleteFlavour(data.item.categoryId)">
              <feather-icon icon="XIcon" />
              
              <span class="align-middle ml-50"   >Delete</span>
            </b-dropdown-item> -->

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
        <div class="mx-2 mb-2">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="
                d-flex
                align-items-center
                justify-content-center justify-content-sm-start
              "
            >
              <!-- <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span> -->
            </b-col>
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
  BFormFile,
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
import { forEach } from 'postcss-rtl/lib/affected-props';

export default {
  components: {
    //Multiselect,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    //BMedia,
    //BMediaAside,
    //BSpinner,
    //BImg,
    //    BMedia,
    BFormGroup,
    //BAvatar,
    //BBadge,
    //BLink,
    //BFormFile,
    //BBadge,
    //BDropdown,
    //BDropdownItem,
    BPagination,
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
      cities: [],
      selectedcities: [],
      myfilesss: '',
      plus1: '',
      fileProfile1: '',
      logoloading1: false,
      regions: [
        {
          id: 0,
          name: '',
          image: '',
          zoneId: 0,
        },
      ],
      nextTodoId: 2,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJPc2FtYSIsImVtYWlsIjoib3NhbWF1c21hbjU1NUBnbWFpbC5jb20iLCJqdGkiOiJjMzI0MGI0ZS1mM2NlLTQxZGUtYmRmNS1iYTE1YTFjMjkyZDIiLCJleHAiOjE2NzA1NjU2MjQsImlzcyI6ImFwcGlja3NvbHV0aW9ucy5pby5jb20iLCJhdWQiOiJhcHBpY2tzb2x1dGlvbnMuaW8uY29tIn0.0_pK3DJcXTTEAk-fFziiMOkgGUC7nUYXppJ9C7dOIic',
      plus: 'https://appick.io/u/lessons/64a03015-aaab-44a2-85c7-fc83ad9417b7.png',
      fileProfile: '',
      logoloading: false,
      errors: {
        status: false,
        regions: false,
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
        '#',
        { label: 'Country', key: 'name' },
        { label: 'Vat ', key: 'vat' },
        'actions',
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
        country: {
          id: 0,
          name: '',
          vat: '',
        },
        cityIds:[],
      },
      detailObj: {},
    };
  },
  methods: {
      CheckVAT() {
      var elem = this.$refs['vat'];
      const regex = /^\d+(,\d{1,2})?$/;
      if (parseInt(this.myObj.country.vat) !== 0) {
        if (regex.test(this.myObj.country.vat) && this.myObj.country.vat <= 100 ) 
        {
             this.myObj.country.vat =parseInt(this.myObj.country.vat) ;
          return (elem.state = true);
        } else {
          return (elem.state = false);
        }
      } else {
        this.myObj.price = '';
        return (elem.state = false);
      }
    },
    CheckCity()
    {
 var elem = this.$refs['cityId'];
      if (this.myObj.cityIds.length == 0) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckRegions() {
      if (this.regions.length == 0) {
        return (this.errors.regions = true);
      } else {
        this.regions.forEach((elem) => {
          if (
            elem.image == 0 ||
            elem.image == '' ||
            elem.image == undefined ||
            elem.name == 0 ||
            elem.name == '' ||
            elem.name == undefined
          ) {
            return (this.errors.regions = true);
          } else {
            return (this.errors.regions = false);
          }
        });
      }
    },
    repeateAgain() {
      for (let index = 0; index < this.regions.length; index++) {
        if (
          this.regions[index].image == 0 ||
          this.regions[index].image == '' ||
          this.regions[index].image == undefined ||
          this.regions[index].name == 0 ||
          this.regions[index].name == '' ||
          this.regions[index].name == undefined
        ) {
          return 0;
        }
      }
      this.regions.push({
        // id: this.nextTodoId += this.nextTodoId,
        id: 0,
        zoneId: 0,
        name: this.regions.name,
        image: this.regions.image,
      });
      console.log(this.regions);
      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },
    removeItem(index) {
      this.regions.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
    CheckName() {
      var elem = this.$refs['country'];
      if (this.myObj.country.name == '' || this.myObj.country.name < 3) {
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

    OpenAddModal() {
      this.$bvModal.show('modal-login');
      this.myObj.country.id = 0;
      this.myObj.country.name = '';
      this.myObj.country.vat = '';
      this.myObj.cityIds = '';
      console.log(this.myObj);
    },
    OpenEditModal(row) {
      this.$bvModal.show('modal-login');
      this.myObj.country.id = row.id;
      this.myObj.country.name = row.name;
      this.myObj.country.vat = row.vat;
      this.myObj.cityIds  = row.cities;
      console.log(this.myObj);
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
      }).then((result) => {
        if (result.isConfirmed) {
          var axios = require('axios');
          var config = {
            method: 'delete',
            url: 'https://localhost:44355/api/Countries/DeleteCountry/' + id,
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
          };
          console.log(config.url);
          axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire('Success!', 'Country has been deleted.', 'success').then(
                  (res) => {
                    this.LoadData();
                  },
                );
              }
            })
            .catch(function (error) {
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

          .then((e) => {
            console.log(e.data);
            // this.file = undefined;
            var fn1 = e.data.myresp[0].path;
            console.log(fn1);
            // console.log(fn);
            this.plus = fn1;
            //
            this.myObj.image = this.plus;
            console.log(this.plus);
            //console.log(this.myObj.coverImg);
            this.logoloading = 'loaded';

            console.log(this.loading);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    selectlogo1(e, i) {
      var myfiles = e.target.files || e.dataTransfer.files;
      console.log(myfiles[0]);
      // if (!files.length)
      //   return;

      // this.myfilesss.splice(i, 0, URL.createObjectURL(files[0]));
      // console.log(this.myfilesss)
      console.log('Hellloo');
      // return
      //this.fileProfile1 = ;
      var axios = require('axios');
      //console.log(this.fileProfile.name);

      //console.log(this.fileProfile, this.loading );
      //Upload cover
      if (myfiles !== '') {
        this.logoloading1 = true;
        let formData = new FormData();
        formData.append('file', myfiles[0]);
        console.log(myfiles);
        axios
          .post('https://upload.appick.io', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          .then((e) => {
            console.log(e.data);
            // this.file = undefined;
            var fn1 = e.data.myresp[0].path;
            console.log(fn1);
            // console.log(fn);
            this.plus1 = fn1;
            this.regions[i].image = this.plus1;
            //
            //console.log(.this.regions);
            //console.log(this.myObj.coverImg);
            this.logoloading1 = 'loaded';

            console.log(this.loading);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteLogo1(index) {
      //console.log(0);
      this.regions[index].image = '';
      this.logoloading = false;
    },
    deleteLogo() {
      //console.log(0);
      this.myObj.image = '';
      this.logoloading = false;
    },
    AddFlavour() {
      console.log(this.myObj);
      this.CheckCity();
      this.CheckName();
      this.CheckVAT();
      if (this.CheckCity() == false || this.CheckName() == false || this.CheckVAT() == false) {
        return this.$bvToast.toast('Please fill the form correctly.', {
          title: 'Error!',
          variant: 'danger',
          toaster: 'b-toaster-bottom-center',
        });
      } else {
        console.log(this.myObj);
        if (this.myObj.id == 0) {
          var axios = require('axios');
          this.myObj.country.vat = this.myObj.country.vat / 100; 
          // this.$store.state.userData.userID
          var config = {
            method: 'post',
            url: 'https://localhost:44355/api/Countries/AddCountry',
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
            data: this.myObj,
          };

          axios(config)
            .then((response) => {
              if (response.data.status === 'success') {
                console.log(response.data);
                this.$bvModal.hide('modal-login');
                this.LoadData();

                this.$bvToast.toast('Country added.', {
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
          this.myObj.country.vat = this.myObj.country.vat / 100; 
          // return console.log(this.myObj);
          // this.$store.state.userData.userID
          var config = {
            method: 'put',
            url: 'https://localhost:44355/api/Countries/EditCountry',
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
            data: this.myObj,
          };

          axios(config)
            .then((response) => {
              if (response.data.status === 'success') {
                this.$bvModal.hide('modal-login');
                console.log(response.data);
                this.LoadData();

                this.$bvToast.toast('Country updated.', {
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

    LoadData() {
      var axios = require('axios');
      var categories = {
        method: 'get',
        url: 'https://localhost:44355/api/Countries/LoadCountries',
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };

      axios(categories)
        .then((response) => {
          console.log(response.data.data);
          this.items = [];
          response.data.countries.forEach(e => {
            e.vat = e.vat * 100;
            this.items.push(e);
          });
          this.cities = response.data.cities;
        })
        .catch(function (error) {
          console.log(error);
        });
      // this.$store.state.userData.userID
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
