<template>
  <div>
    <!-- select 2 demo -->

    <b-modal
      id="modal-login"
      centered
      ok-only
      hide-footer="true"
      title="Add City"
    >
      <b-form>
        <b-row>
          <b-col cols="3">
            <b-form-group
              ref="image"
              :state="nameState"
              label="City "
              invalid-feedback="Image is required."
            >
              <b-media no-body ref="picture">
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
                      src="https://dk0pm9zdlq16s.cloudfront.net/8cbeb020-efb6-4a78-993c-871a94ddbbac.png"
                      @click="$refs.fileProfile.click()"
                      v-if="logoloading == false"
                      thumbnail
                      fluid
                      height="80px"
                      width="80px"
                    />

                    <!-- <img v-if= "loading==false" rounded :src="require('@/assets/images/elements/Unicorn-Cake.jpg')" @click="$refs.files.click()" style="width: 7vw; height: 7vw; padding-left:20px; padding-top:20px;" alt="imgAdd"/>  -->
                  </b-link>

                  <b-link v-if="logoloading == 'loaded'">
                    <b-button
                      class="
                        position-absolute
                        mt-2
                        ml-2
                        rounded-circle
                        btn-icon
                      "
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-danger"
                    >
                      <feather-icon @click="deleteLogo()" icon="Trash2Icon" />
                    </b-button>

                    <b-img rounded :src="plus" height="80px" width="80px" />
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
          <b-col cols="9">
            <b-form-group
              style="margin-top:65px;"
              label=""
              invalid-feedback="City name is required."
              ref="cityname"
            >
           <b-form-input
           placeholder="Enter city name here."
           v-model="myObj.city"
           ref="cityname"
           @focusout="CheckCity"
           >

           </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <b-row>
        <b-col cols="12">
            <hr>
          </b-col>
      </b-row>
      <!-- <b-form
        ref="form"
        :style="{height: trHeight}"
        class="repeater-form"
        @submit.prevent="repeateAgain"
      >

        <b-row
          v-for="(item, index) in regions"
          :id="item.id"
          :key="item.id"
          ref="row"
        >
          <b-col cols="10">
            <b-form-group
              label="Region"
              invalid-feedback="Region name is required."
              ref="regionname"
            >
           <b-form-input
           placeholder="Enter region name here."
           v-model="item.name"
           >

           </b-form-input>
            </b-form-group>
          </b-col>
        <b-col
             cols="1"
          >
            <b-button
              style="margin-top:27px;"
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              v-if="index !== 0"
              @click="removeItem(index)"
            >
              <feather-icon
                icon="XIcon"
              />
            </b-button>
          </b-col>
        
                  <input
                    style="margin-left:17px;"
                    type="file"
                    :ref="index"
                    @change="selectlogo1($event,index)"
                    accept="image/*"
                  /> 
          
          

          
          <b-col cols="12">
            <hr>
            <small v-if="errors.regions !== false" class="text-danger">Regions are required. </small>
          </b-col>

        </b-row>

      </b-form> -->
 <!-- <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="repeateAgain"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
      <span>Add Region</span>
    </b-button> -->
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
                  <span class="text-nowrap">Add City</span>
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
          <template #cell(image)="data">
            <b-img
              :src="data.value"
              style="width: 100px; height: 100px;object-fit:cover;"
              rounded
              alt="Rounded image"
            />
          </template>
          <template #cell(regionNames)="data">
          <b-badge variant="light-primary" style="margin-left:2px;" v-for="i in data.item.regionNames" :key="i">
          {{i }}
          </b-badge>
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
  BFormFile
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
    BMedia,
    BMediaAside,
    BSpinner,
    BImg,
    BMedia,
    BFormGroup,
    //BAvatar,
    BBadge,
    BLink,
    //BFormFile,
    //BBadge,
    //BDropdown,
    //BDropdownItem,
    BPagination,
    //vSelect,
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
      myfilesss:'',
      plus1:'',
      fileProfile1:'',
      logoloading1:false,
      regions:
      [
        {
          id:0,
          name:"",
          image:"",
          zoneId:0,
        }
      ],
      nextTodoId: 2,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJPc2FtYSIsImVtYWlsIjoib3NhbWF1c21hbjU1NUBnbWFpbC5jb20iLCJqdGkiOiJjMzI0MGI0ZS1mM2NlLTQxZGUtYmRmNS1iYTE1YTFjMjkyZDIiLCJleHAiOjE2NzA1NjU2MjQsImlzcyI6ImFwcGlja3NvbHV0aW9ucy5pby5jb20iLCJhdWQiOiJhcHBpY2tzb2x1dGlvbnMuaW8uY29tIn0.0_pK3DJcXTTEAk-fFziiMOkgGUC7nUYXppJ9C7dOIic',
      plus: 'https://appick.io/u/lessons/64a03015-aaab-44a2-85c7-fc83ad9417b7.png',
      fileProfile: '',
      logoloading: false,
      errors: {
        status: false,
        regions:false,
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
        { label: ' ', key: 'image' },
        { label: 'City ', key: 'city' },
        { label: 'Regions ', key: 'regionNames' },
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
        
          id:0,
          city:"",
          image:"",
       
      },
      detailObj: {},
    };
  },
  methods: {
    CheckRegions()
    {
      if(this.regions.length == 0)
      {
        return this.errors.regions = true;
      }
      else
      {
       this.regions.forEach(elem => {
         if
         (
          elem.image == 0 ||
          elem.image == '' ||
          elem.image == undefined ||
          elem.name == 0 ||
          elem.name == '' ||
          elem.name == undefined
         )
         {
          return (this.errors.regions = true);
         }
         else
         {
          return (this.errors.regions = false);
         }
       });
      }
    },
      repeateAgain() {
       for (let index = 0; index < this.regions.length ; index++) {
          if(
          this.regions[index].image == 0 ||
          this.regions[index].image == '' ||
          this.regions[index].image == undefined ||
          this.regions[index].name == 0 ||
          this.regions[index].name == '' ||
          this.regions[index].name == undefined)
          {
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
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.regions.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    CheckCity() {
      var elem = this.$refs['cityname'];
      if (this.myObj.city == '' || this.myObj.city < 3) {
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
      this.myObj.id = 0;
      this.myObj.city = '';
      this.myObj.image = '';
      console.log(this.myObj);
      this.logoloading = false;
      this.plus = 'https://dk0pm9zdlq16s.cloudfront.net/5be0a5b2-5eaf-4090-8528-4be800d41de0.jpg';
    },
    OpenEditModal(row) {
      this.$bvModal.show('modal-login');
      this.myObj.id = row.id;
      this.myObj.city = row.city;
      this.myObj.image = row.image;
      this.plus = row.image;
      console.log(this.myObj);
      this.logoloading = 'loaded';
      console.log(this.plus);
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
            url: 'https://wishbox.fastech.pk/api/Cities/' + id,
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
          };
          console.log(config.url);
          axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 'success') {
                Swal.fire(
                  'Success!',
                  'City has been deleted.',
                  'success',
                ).then((res) => {
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
      selectlogo1(e,i) 
      {
      var myfiles = e.target.files || e.dataTransfer.files;
      console.log(myfiles[0]);
      // if (!files.length)
      //   return;
      
      // this.myfilesss.splice(i, 0, URL.createObjectURL(files[0]));
      // console.log(this.myfilesss)
       console.log("Hellloo");
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
      this.CheckImage();
      if (
        this.CheckCity() == false ||
        this.CheckImage() == false 
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
            url: 'https://wishbox.fastech.pk/api/Cities',
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

                this.$bvToast.toast('City added.', {
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
        // return console.log(this.myObj);
          // this.$store.state.userData.userID
          var config = {
            method: 'put',
            url:
              'https://wishbox.fastech.pk/api/Cities/EditZone',
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

                this.$bvToast.toast('City updated.', {
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
        url: 'https://wishbox.fastech.pk/api/Cities/GetCities',
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };

      axios(categories)
        .then((response) => {
          console.log(response.data.data);
          this.items = response.data.data;
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
