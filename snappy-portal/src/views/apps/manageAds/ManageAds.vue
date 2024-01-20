<template>
  <div>
    <b-modal
      id="modal-login"
      no-close-on-backdrop
      centered
      ok-only
      size="md"
      hide-footer="true"
      title="Add Ad"
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
          label="URL"
          invalid-feedback="URL is required."
          ref="url"
        >
          <b-form-input
            v-model="myObj.url"
            ref="url"
            placeholder="Enter url here"
          />
        </b-form-group>
        <b-form-group
          label="Active Till"
          invalid-feedback="Select valid date."
          ref="activeTill"

        >
          <flat-pickr
            v-model="myObj.activeTill"
            class="form-control"
            placeholder="Select to date."
            @on-change="checkActiveTill()"
          />
        </b-form-group>

        <b-form-group
          label="Discount"
          invalid-feedback="Discount percentage is required."
          ref="discount"
        >
          <b-form-input
            v-model="myObj.discount"
            ref="discount"
            placeholder="Enter discount percentage here"
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

    <b-form-group label="Search Ads" invalid-feedback="Search field">
      <b-form-input
        id="name-input"
        ref="name"
        placeholder="Enter Ad title to search"
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
                <div style="padding-right: 15px">
                    <b-button @click="OpenAddModal(0)" variant="primary">
                        <feather-icon icon="PlusIcon" class="mr-50" />
                        <span class="text-nowrap">Add Ads</span>
                    </b-button>
                </div>
            </div>
          </b-col>
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
        plus: 'https://dk0pm9zdlq16s.cloudfront.net/5be0a5b2-5eaf-4090-8528-4be800d41de0.jpg',
        fileProfile: '',
        logoloading: false,
        currentDate: moment().format('YYYY-MM-DD'),
        myObj: {
            id: 0,
            title: "",
            subtitle: "",
            discount: "",
            url: "",
            cover: "",
            sequence: 0,
            status: "active",
            activeTill: ""
        },
        items: [],
        searchQuery: '',
        fields: [
            { label: 'Cover', key: 'cover' },
            { label: 'Title', key: 'title' },
            { label: 'Subtitle', key: 'subtitle' },
            { label: 'Discount', key: 'discount' },
            { label: 'URL', key: 'url' },
            { label: 'Active Till', key: 'activeTill' },
            'actions',
        ],
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
    checkActiveTill() {
      var elem = this.$refs['activeTill'];
      console.log(this.currentDate);
      if (
        this.myObj.activeTill <= this.currentDate ||
        this.myObj.activeTill == null
      ) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    checkTitle() {
      var elem = this.$refs['title'];

      if (this.myObj.title == '' || this.myObj.title.length < 2) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    LoadData() {
      var axios = require('axios');
      var config = {
        method: 'get',
        url: 'https://waqta.appick.io/api/Ads',
        headers: {
          Authorization: 'bearer ' + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then(response => {
          console.log("data:",response.data.data)
          this.items = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    OpenAddModal(id) {
      this.$bvModal.show('modal-login');
      if (id == 0){
        this.myObj = {
            id: 0,
            title: "",
            subtitle: "",
            discount: "",
            url: "",
            cover: "",
            sequence: 0,
            status: "active",
            activeTill: ""
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
            url: 'https://waqta.appick.io/api/Ads/'+id,
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
    AddFlavour(){
        this.checkImage();
        this.checkTitle();
        this.checkActiveTill();
        if (
            this.checkImage() == false ||
            this.checkTitle() == false ||
            this.checkActiveTill() == false
        ) {
            return this.$bvToast.toast('Please fill the form correctly.', {
            title: 'Error!',
            variant: 'danger',
            toaster: 'b-toaster-bottom-center',
            });
        } else {
            if (this.myObj.id == 0) {
            var axios = require('axios');
            var config = {
                method: 'post',
                url: 'https://waqta.appick.io/api/Ads',
                headers: {
                    Authorization: 'bearer ' + this.$store.state.userData.token,
                },
                data: this.myObj,
            };

            axios(config)
                .then(response => {
                if (response.data.status === 'success') {
                    console.log("res:",response.data);
                    this.$bvModal.hide('modal-login');
                    this.LoadData();
                    Swal.fire(
                        'Success!',
                        'Ad Added Successfully.',
                        'success',
                    )
                }
                })
                .catch(function(error) {
                    console.log(error);
                });
            } 
            else {
                var axios = require('axios');
                var config = {
                    method: 'put',
                    url: 'https://waqta.appick.io/api/Ads/' + this.myObj.id,
                    headers: {
                        Authorization: 'bearer ' + this.$store.state.userData.token,
                    },
                    data: this.myObj,
                };
                axios(config)
                    .then(response => {
                    if (response.data.status === 'success') {
                        this.$bvModal.hide('modal-login');
                        console.log("put res:",response.data);
                        this.LoadData();

                        this.$bvToast.toast('Ads updated.', {
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
            url: 'https://waqta.appick.io/api/Ads/' + id,
            headers: {
              Authorization: 'bearer ' + this.$store.state.userData.token,
            },
          };
          console.log(config);
          axios(config)
            .then(response => {
              if (response.data.status === 'success') {
                Swal.fire(
                  'Success!',
                  'Ad has been deleted.',
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