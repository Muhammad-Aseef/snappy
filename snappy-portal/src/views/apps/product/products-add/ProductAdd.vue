<template>
  <div>
    <b-row>
      <b-col cols="8" order="3">
        <b-card>
          <!-- media -->
          <b-media no-body>

            <div v-if="loading == true">
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
                  :src="require('@/assets/images/elements/Untitled-3 copy.png')"
                  @click="$refs.file2.click()"
                  v-if="loading == false"
                  height="120"
                  width="120"
                />

                <!-- <img v-if= "loading==false" rounded :src="require('@/assets/images/elements/Unicorn-Cake.jpg')" @click="$refs.files.click()" style="width: 7vw; height: 7vw; padding-left:20px; padding-top:20px;" alt="imgAdd"/>  -->
              </b-link>

              <b-link v-if="loading == 'loaded'">
                <div>
                  <i
                    @click="deleteCover()"
                    class="fa fa-trash fa-sm position-absolute m-5"
                  ></i>
                </div>
                <b-img rounded :src="getImageUrl()" height="120" width="120" />
                <br />
                <!-- <img v-if= "loading==false" rounded :src="require('@/assets/images/elements/Unicorn-Cake.jpg')" @click="$refs.files.click()" style="width: 7vw; height: 7vw; padding-left:20px; padding-top:20px;" alt="imgAdd"/>  -->
              </b-link>

              <input
                type="file"
                id="file2"
                hidden
                ref="file2"
                @change="selectFile()"
                accept="image/*"
              />
            </b-media-aside>
            <b-card-text class="mt-5"
              >Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text
            >
            <b-media-body class="mt-75 ml-75"> </b-media-body>
          </b-media>
          <!--/ media -->
          <!-- form -->
          <b-form class="mt-2">
            <b-row>
              <b-col sm="6">
                <!-- <div >
              {{username.username}}
              </div>    -->
                <b-form-group label="Name">
                  <b-form-input
                    v-model="myObj.title"
                    placeholder="Enter product name"
                    @focusout="checkTitle()"
                    id="product-add"
                    ref="title"
                  />
                  <!-- <b-form-invalid-feedback v-if="this.myObj.title.length < 2 == false " style="color:red;" id="input-live-feedback">
                  Enter at least 3 letter cake name.
                 </b-form-invalid-feedback> -->
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                  label="Category"
                  label-for="category"
                  style="margin-top: 7px"
                >
                  <v-select
                    v-model="myObj.categoryId"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="(val) => val.categoryId"
                    :options="categoryOptions"
                    label="Name"
                    :clearable="false"
                    input-id="categoryId"
                    ref="category"
                    @change="checkCategory()"
                    :disabled="dataloading"
                    placeholder="Select category"
                  />
                </b-form-group>
              </b-col>

              <b-col sm="12">
                <b-form-group label="Description" label-for="description">
                  <b-form-input
                    v-model="myObj.description"
                    name="description"
                    placeholder="Description"
                    @focusout="checkDesc()"
                    ref="description"
                  />
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Flavor">
                  <v-select
                    v-model="flvObj.cakeFlavours"
                    :closeOnSelect="false"
                    :multiple="true"
                    :disabled="dataloading"
                    :options="flavorOptions"
                    label="Name"
                    :reduce="(val) => val.flavourId"
                    :clearable="true"
                    input-id="flavourId"
                    placeholder="Select flavor"
                    required
                    @focusout="checkFlavour()"
                    ref="flavour"
                  />
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                  label="Cost per layer"
                  label-for="perlayer"
                  style="margin-top: 7px"
                >
                  <b-form-input
                    v-model="myObj.perLayerCost"
                    name="Per Layer Cost"
                    placeholder="Cost Per Layer"
                    @focusout="checkCostperlayer()"
                    ref="Costperlayer"
                  />
                </b-form-group>
              </b-col>

              <b-col sm="6">
                <b-form-group
                  label="Sizes (Servings)"
                  label-for="sizes"
                  style="margin-top: 7px"
                >
                  <v-select
                    @input="openModal()"
                    v-model="sizes.size"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="(val) => val.name"
                    :options="sizeOptions"
                    label="name"
                    :clearable="false"
                    :disabled="dataloading"
                    input-id="sizeId"
                    :closeOnSelect="false"
                    ref="category"
                    placeholder="Select Sizes"
                  />
                </b-form-group>
              </b-col>

              <b-col sm="12">
                <label
                  v-if="costVisible == true"
                  style="margin-left: 0px; font-size: 15px"
                  >Cost</label
                >
              </b-col>

              <b-col
                md="auto"
                class="mt-1"
                v-for="(mysize, index) in this.cakesizeList"
                :key="mysize.id"
              >
                <b-badge style="background-color: #ff5a60; padding: 12px">
                  {{
                    'Serving : ' +
                    mysize.size +
                    ' ' +
                    'Cost :' +
                    ' ' +
                    mysize.cost +
                    ' AED'
                  }}
                  <i
                    class="fa fa-trash fa-sm ml-2"
                    @click="removeCost(index)"
                  ></i>
                </b-badge>
              </b-col>

              <b-col cols="12">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="mt-2 mr-1"
                  @click="AddProduct()"
                >
                  {{ addOptions }}
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>

      <b-col cols="4" order="3">
        <b-card>
          <h5 class="text-nowrap">More Images</h5>

          <b-row>
            <div v-if="moreloading == true">
              <b-spinner
                variant="primary"
                type="grow"
                class="m-5"
                label="Spinning"
              ></b-spinner>
            </div>

            <b-link>
              <b-img
                ref="previewEl"
                rounded
                :src="require('@/assets/images/elements/Untitled-3 copy.png')"
                @click="$refs.mfile.click()"
                v-if="moreloading == false"
                height="120"
                width="120"
              />

              <!-- <img v-if= "loading==false" rounded :src="require('@/assets/images/elements/Unicorn-Cake.jpg')" @click="$refs.files.click()" style="width: 7vw; height: 7vw; padding-left:20px; padding-top:20px;" alt="imgAdd"/>  -->
            </b-link>

            <input
              type="file"
              id="mfile"
              hidden
              ref="mfile"
              multiple="multiple"
              @change="selectMoreFile()"
              accept="image/*"
            />

            <b-link v-for="img in proImg.images" :key="img.id">
              <div>
                <i
                  class="fa fa-trash fa-sm position-absolute m-5"
                  @click="removeImg(index)"
                ></i>
              </div>
              <b-img rounded :src="img" height="120" width="120" />
              <!-- <img v-if= "loading==false" rounded :src="require('@/assets/images/elements/Unicorn-Cake.jpg')" @click="$refs.files.click()" style="width: 7vw; height: 7vw; padding-left:20px; padding-top:20px;" alt="imgAdd"/>  -->
            </b-link>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import {
  BFormFile,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BAlert,
  BCard,
  BCardText,
  BMedia,
  BMediaAside,
  BMediaBody,
  BLink,
  BImg,
  BFormInvalidFeedback,
  BSpinner,
  BBadge,
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils';
import { ref } from '@vue/composition-api';
import vSelect from 'vue-select';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import formValidation from '@core/comp-functions/forms/form-validation';
// import { required, alphaNum, email } from '@validations'
import Vue from 'vue';
import store from '@/store';
import productStoreModule from '../productStoreModule';
import axios from 'axios';
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue';
import { required, minLength, between } from 'vuelidate/lib/validators';
import fs from 'fs';
import qs from 'qs';

export default {
  components: {
    BBadge,
    BButton,
    BForm,
    BImg,
    //BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    //BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    vSelect,
    BSpinner,

    //mixins: [validationMixin],

    //FeatherIcon,
    //BFormInvalidFeedback,
    //FormValidation
    //ValidationProvider,
    // ValidationObserver,
  },
  created() {
    this.LoadData();
  },
  directives: {
    Ripple,
  },
  // props: {
  //    priceCard: {
  //     type: Boolean,
  //     required: true,
  //   },

  // },
  // props:['username'],
  mounted() {},
  data() {
    return {
      userVendorId: this.$store.state.userData.userID,
      moreloading: false,
      moreFiles: [],
      addOptions: 'Add Cake',
      count: 0,
      costVisible: false,
      feedback: false,
      sizeOptions: [],
      imageUrl: 'https://upload.appick.io',
      fileList: undefined,
      removecostId: 0,
      sizeId: 0,
      spin: '',
      files: undefined,
      cost: '',
      file: ' ',
      name: ' ',
      category: '',
      flvObj: {
        cakeFlavours: [],
        pId: 0,
      },
      originalSizearr: [],
      size: 0.0,
      loading: false,
      dataloading: false,
      selectedFiles: undefined,
      selectedFlavours: [],

      cakeFlavours: [],

      sizeObj: {
        size: '',
        cost: '',
      },
      // imgObj:{
      // pId: 0,
      // cakeFlavours: [],
      // },
      categoryOptions: [],
      getproductId: 0,
      clickedItems: [
        //   {
        //   id: '1', weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
        // },
        // {
        //   id: '2', weight: '7 lb', size: '12"', serving: '7', price: 'AED 24.4',
        // },
        // {
        //   id: '3', weight: '8 lb', size: '13"', serving: '8', price: 'AED 25.4',
        // },
      ],
      moreImages: [
        // { img: require('@/assets/images/elements/Unicorn-Cake.jpg')},
        // { img: "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"},
        // { img: require('@/assets/images/elements/Unicorn-Cake.jpg')},
        // { img: "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg"},
        // { img: require('@/assets/images/elements/Unicorn-Cake.jpg')},
        // { img: require('@/assets/images/elements/Unicorn-Cake.jpg')},
      ],
      productResponse: {
        // Id : 0,
        // data:'',
        // status:''
      },
      //    categoryOptions : [

      //    {categoryId: null , Name: null , productId:null,Image:null}
      //   // { label: 'Wedding Cake', value: 'wedding' },
      //   // { label: 'Party Cake', value: 'party' },
      // ],

      flavorOptions: [
        // { label: 'All', value: 'all' },
        // { label: 'Chocolate', value: 'Chocolate' },
        // { label: 'Oreo', value: 'oreo' },
        // { label: 'Cheese', value: 'cheese' },
        // { label: 'Banana', value: 'banana' },
      ],

      myObj: {
        productId: 0,
        title: '',
        price: 0,
        categoryId: 0,
        description: '',
        vendorId: 0,
        approvedOn: null,
        isApproved: false,
        coverImg: '',
        minimumTime: 0,
        perLayerCost: 0,
      },
      // images:[],
      // flavourId:[],
      cakesizeList: [],
      sizes: {
        productId: 0,
        size: '',
        cost: '',
      },
      proImg: {
        pId: 0,
        images: [],
      },

      // //      profileData: { },
      //       items: [
      //         {
      //           weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
      //         },
      //         {
      //           weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
      //         },
      //         {
      //           weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
      //         },
      //         {
      //           weight: '6 lb', size: '11"', serving: '6', price: 'AED 23.4',
      //         },
      //       ],

      //priceTableShow: true
    };
  },

  methods: {
    removeImg(index) {
      console.log(index);
      this.proImg.images.splice(index, 1);
    },
    selectMoreFile() {
      //this.moreFiles = this.$refs.mfile.files;
      if (this.$refs.mfile.files.length !== 0) {
        this.moreloading = true;
        var formdata = new FormData();
        for (var i = 0; i < this.$refs.mfile.files.length; i++) {
          formdata.append('file', this.$refs.mfile.files[i], '[PROXY]');
        }

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };

        fetch('https://upload.appick.io', requestOptions)
          .then((response) => response.json()) //2
          .then((result) => {
            console.log();
            //this.moreImages.push(result.myresp);

            for (var i = 0, len = result.myresp.length; i < len; ++i) {
              this.moreloading = false;
              var fn =
                'https://appick.io/u/lessons/' + result.myresp[i].filename;
              this.proImg.images.push(fn);
            }
            console.log(this.proImg.images);
          })

          .catch((error) => console.log('error', error));
      }

      // this.loading = true;
      //this.moreFiles = this.$refs.mfile.files;

      // console.log(this.moreFiles);

      //console.log(this.file, this.loading );
      //Upload cover

      //       if (this.moreFiles !== [])
      //       {

      //        let formData = new FormData();
      //       for( var i = 0; i < this.$refs.mfile.files.length; i++)
      //       {
      //       let file = this.$refs.mfile.files[i];
      //       console.log(file);
      //       formData.append('files[' + i + ']', file);
      //       }

      //     axios
      //    .post("https://upload.appick.io", formData,
      //    {
      //     headers: {
      //               "Content-Type": "multipart/form-data",
      //              },
      //             })
      //     .then((e) => {

      //  return console.log(e.data);

      //     for (var i = 0, len = e.data.myresp.length; i < len; ++i)
      //  {
      //    var fn = "https://appick.io/u/lessons/" + e.data.myresp[i].filename;
      //    this.moreImages.push(fn);

      //  }
      //     console.log(this.moreImages);

      //                   //console.log(this.myObj.coverImg);
      //                  // this.loading = 'loaded';
      //                   console.log(this.loading);
      //                 });
      //             }
    },
    addItem(productId) {
      for (var i = 0, len = this.cakesizeList.length; i < len; ++i) {
        this.cakesizeList[i].productId = productId;

        this.originalSizearr.push(this.cakesizeList[i]);
      }
    },
    // if(this.myObj.cakesizeList.length > 0)
    // {
    //   this.myObj.cakesizeList[0].productId = productId;
    //   this.originalSizearr.push(this.myObj.cakesizeList[0])
    //   this.myObj.cakesizeList.shift();
    // }
    //      if(this.count < this.myObj.cakesizeList.length)
    //      {
    //     this.myObj.cakesizeList[this.count].productId = productId;
    //     let addItem = this.myObj.cakesizeList.slice(this.count, this.count + 1);
    //     this.originalSizearr.push(addItem[this.count]);
    //     this.count++
    // } else {
    //    console.log('all items are added');
    //    return true;
    // }
    // },

    removeCost(index) {
      console.log(index);
      this.cakesizeList.splice(index, 1);
      this.costVisible = false;
    },
    openModal() {
      console.log(this.sizes);

      // var cost = this.cakeSize.cost
      Swal.fire({
        title: 'Enter Cake Cost',
        input: 'text',

        inputPlaceholder: 'Enter cake cost',
        confirmButtonText: 'Add',
        confirmButtonColor: '#FF5A60',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off',
        },
      }).then((result) => {
        if (result.value) {
          this.costVisible = true;
          console.log('Result: ' + result.value);
          this.sizes.cost = result.value;

          // const p = this.sizes;
          this.cakesizeList.push({
            productId: this.sizes.productId,
            cost: this.sizes.cost,
            size: this.sizes.size,
          });
          console.log(this.cakesizeList);
        }
      });
    },

    checkTitle() {
      var elem = this.$refs['title'];

      return (elem.state = this.myObj.title.length > 2 ? true : false);

      //  return this.myObj.title.length > 2 ? true : false
    },
    checkCategory() {
      console.log('Osama');
    },
    checkDesc() {
      var elem = this.$refs['description'];
      elem.state = this.myObj.description.length > 2 ? true : false;
      console.log(elem.state);
    },
    checkCostperlayer() {
      var elem = this.$refs['Costperlayer'];
      if (this.myObj.perLayerCost <= 0) {
        elem.state = false;
        console.log(elem.state);
      } else {
        elem.state = true;
      }
    },
    checkFlavour() {
      var elem = this.$refs['flavour'];
      if (this.flvObj !== null) {
        elem.state = false;
        console.log(elem.state);
      } else {
        elem.state = true;
      }
    },
    deleteCover() {
      console.log(0);
      this.myObj.coverImg = '';
      this.loading = false;
    },
    // AddMoreImage()
    // {
    // //console.log(this.$refs.filee.files[0]);
    // this.fileList = this.$refs.filee.files[0]
    // console.log(this.fileList);
    //   if (this.fileList !== undefined) {
    //   // console.log(fileList);
    //       let formData = new FormData();
    //       for (let index = 0; index < this.fileList.length; index++) {

    //       const element = this.fileList[index];
    //         console.log("elem", element);
    //         formData.append("file", element);
    //       }

    //       axios
    //         .post("https://upload.appick.io", formData, {
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //           }.then((response)=>{

    //             console.log(response);
    //           })
    //         })
    //   }

    // },

    // submit() {
    //       const formData = new FormData();
    //       formData.append("file", fileList[0].blob);
    //       fetch
    //         .post("https://upload.appick.io", formData)
    //         .then((response) => {

    //           console.log(this.fileList[0]);
    //         })
    //         .catch(() => {});
    //     },

    getImageUrl() {
      return this.myObj.coverImg;
    },
    selectFile() {
      this.loading = true;
      this.file = this.$refs.file2.files[0];

      console.log(this.file.name);

      console.log(this.file, this.loading);
      //Upload cover
      if (this.file !== '') {
        let formData = new FormData();
        formData.append('file', this.file);
        console.log(this.file);
        axios
          .post('https://upload.appick.io', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((e) => {
            console.log(e.data);
            // this.file = undefined;
            var fn = 'https://appick.io/u/lessons/' + e.data.myresp[0].filename;
            console.log(fn);
            this.myObj.coverImg = fn;
            //console.log(this.myObj.coverImg);
            this.loading = 'loaded';
            console.log(this.loading);
          });
      }
    },
    //  Addflavour()
    //  {
    //    console.log("Osama");
    //    console.log(this.flvObj.flavourId);
    //  },
    // moreImages()
    // {

    // },
    AddProduct() {
      //console.log(this.selectedFlavours)

      this.checkTitle();
      this.checkDesc();
      this.checkCostperlayer();
      if (
        this.checkTitle() == false ||
        this.checkDesc() == false ||
        this.checkCostperlayer()
      ) {
        this.$notify({
          group: 'foo',
          type: 'error ',
          text: 'Please fill the form <b> Correctly ! </b>',
        });
      } else {
        if (
          this.myObj.productId === 0 &&
          this.myObj.vendorId === this.userVendorId &&
          this.myObj.vendorId !== 0
        ) {
          //Add
          console.log(this.myObj, this.flvObj);
          this.addOptions = 'Saving...';
          var axios = require('axios');
          var config = {
            method: 'post',
            url: 'https://okaaik.fastech.pk//api/products/PostProduct',
            headers: {
              Authorization:
                'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp',
              'Content-Type': 'application/json',
            },
            data: this.myObj,
          };

          console.log(this.myObj);
          axios(config).then((response) => {
            if (response.data.status == 'success') {
              console.log('ProductAdded');
              this.productResponse = response.data;
              this.flvObj.pId = this.productResponse.Id;
              this.sizes.productId = this.productResponse.Id;
              this.addItem(this.productResponse.Id);
              this.proImg.pId = this.productResponse.Id;
              console.log(this.flvObj);
              if (this.flvObj !== null) {
                var configflv = {
                  method: 'post',
                  url: 'https://okaaik.fastech.pk/api/cakeFlavours/AddcakeFlavours',
                  headers: {
                    Authorization:
                      'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp',
                    'Content-Type': 'application/json',
                  },
                  data: this.flvObj,
                };
                axios(configflv).then((response) => {
                  if (response.data.status == 'success') {
                    console.log(this.originalSizearr);
                    console.log('FlvAdded');
                    var configsize = {
                      method: 'post',
                      url: 'https://okaaik.fastech.pk/api/cakeSizes/PostsizesList/',
                      headers: {
                        Authorization:
                          'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp',
                        'Content-Type': 'application/json',
                      },
                      data: this.originalSizearr,
                    };

                    axios(configsize).then((response) => {
                      if (response.data.status == 'success') {
                        console.log('SizesAdded');
                        console.log(this.proImg);
                        var configimges = {
                          method: 'post',
                          url: 'https://okaaik.fastech.pk/api/products/AddProductsImage/',
                          headers: {
                            Authorization:
                              'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp',
                            'Content-Type': 'application/json',
                          },
                          data: this.proImg,
                        };
                        axios(configimges).then((response) => {
                          if (response.data.status == 'success') {
                            console.log('Images Added');
                            this.addOptions = 'Add Cake';
                            this.$router.push('/apps/products/list');
                            this.$notify({
                              group: 'foo',
                              type: 'success ',
                              text: 'cake added <b> sucess ! </b>',
                            }).then((res) => {});
                          }
                        });
                      }
                    });
                  }
                });
              }
            }

            //  console.log(this.cakesizeList);

            //  this.cakeFlavours.forEach(element => {
            //    this.myObj.flavourId.push(element);
            //  });

            //  this.moreImages.forEach(element => {
            //    this.myObj.images.push(element);
            //  });

            //  var myHeaders = new Headers();
            //       myHeaders.append("Content-Type", "application/json");

            //var raw = qs.stringify(this.myObj);
            // console.log("####### data ########", raw);
            // "approvedOn": "",
            // "categoryId": 4,
            // "description": "-",
            // "coverImg": "abc",
            // "isApproved": "false",
            // "minimumTime": "12",
            // "perLayerCost": "12",
            // "price": "12",
            // "title": "abvc",
            // "vendorId": 10006,
            // "flavourId": [
            //   12,
            //   13
            // ],
            // "images": [
            //   "a",
            //   "b"
            // ],
            // "cakesizeList": [
            //   {
            //     "size": "2-4people",
            //     "cost": 45,
            //     "productId": 0
            //   },
            //   {
            //     "size": "2-4people",
            //     "cost": 45,
            //     "productId": 0
            //   }
            // ]

            // var requestOptions = {
            //   method: 'POST',
            //   headers: myHeaders,
            //   body: raw,
            //   redirect: 'follow'
            // };

            // this.myObj.perLayerCost = parseFloat(this.myObj.perLayerCost);
            // console.log(this.myObj);
            //   fetch('http://localhost:52736/api/products/AddMyProduct/' + this.myObj.vendorId, {
            //     method: 'post',
            //     headers: {
            //       'Accept': 'application/json, text/plain, */*',
            //       'Content-Type': 'application/json'
            //     },

            //     }).then(res => res.json())
            //     .then(res => console.log(res))
            //     .catch(error => console.log('error', error));

            // fetch("http://localhost:52736/api/products/AddMyProduct/", requestOptions)
            //   .then(response => response.text())
            //   .then(result => console.log(result))
            //   .catch(error => console.log('error', error));
          });

          //console.log(files[0]);

          // console.log(this.filesObj);
          // if (this.myObj.productid === 0 && this.myObj.vendorId === this.userVendorId && this.myObj.vendorId  !== 0)
          // {

          //   //Add
          //    console.log( this.myObj);
          //   this.addOptions = "Saving..."
          //   var axios = require('axios');
          //   var config = {
          //   method: 'post',
          //   url: 'https://okaaik.fastech.pk//api/products/PostProduct',
          //   headers: {
          //     'Authorization': 'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp',
          //     'Content-Type': 'application/json'
          //   },
          //   data : this.myObj
          //   };

          //   console.log(this.myObj);
          //   axios(config)

          //     .then((response) => {
          //       // console.log(response);
          //       if(response.data.status == "success")
          //       {
          //         console.log("ProductAdded");
          //         this.productResponse =  response.data;
          //         this.flvObj.pId  = this.productResponse.Id
          //         this.sizes.productId  = this.productResponse.Id
          //         console.log(this.flvObj);
          //         this.proImg.pId = this.productResponse.Id;
          //         this.proImg.images.push(this.moreImages);
          //         this.addItem(this.productResponse.Id);
          //         console.log(this.originalSizearr);

          //          console.log("Osama",this.proImg);
          //   //     if(this.moreImages !== [])
          //   //     {

          //   //   var configimg = {
          //   //   method: 'post',
          //   //   url: 'https://okaaik.fastech.pk/api/products/AddProductsImage/',
          //   //   headers: {
          //   //     'Authorization': 'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp',
          //   //     'Content-Type': 'application/json'
          //   //   },
          //   //   data : this.proImg
          //   // };

          //   // axios(configimg).then((response)=>{
          //   //   if(response.data.status == "success")
          //   //   {
          //   //     console.log(response.data);
          //   //     console.log("Image Added");

          //   //   }
          //   //   })
          //   //     }

          //       if(this.flvObj !== null)
          //       {

          //     var configflv = {
          //     method: 'post',
          //     url: 'https://okaaik.fastech.pk/api/cakeFlavours/AddcakeFlavours',
          //     headers: {
          //       'Authorization': 'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp',
          //       'Content-Type': 'application/json'
          //     },
          //     data : this.flvObj
          //   };

          //   axios(configflv).then((response)=>{
          //     if(response.data.status == "success")
          //     {
          //       console.log(response.data);
          //       console.log("Flavour Added");

          //        var configsize = {
          //        method: 'post',
          //        url: 'https://okaaik.fastech.pk/api/this.myObj.cakesizeList/PostsizesList',
          //       headers: {
          //       'Authorization': 'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp',
          //       'Content-Type': 'application/json'
          //         },
          //     data : this.originalSizearr
          //   };
          //   axios(configsize).then((response)=>{
          //       if(response.data.status == "success")
          //       {
          //             console.log("Finnally Added");

          //             this.addOptions = "Add Cake"
          //             this.myObj.productid = 0;
          //             this.myObj.title = '';
          //             this.myObj.isApproved = false;
          //             this.myObj.coverImg = '';
          //             this.myObj.minimumTime = '';
          //             this.myObj.price = '';
          //             this.myObj.description = '';
          //             this.myObj.perLayerCost= 0;
          //             this.sizes.size = '';
          //             this.sizes.cost = 0;
          //             this.flvObj.pId = 0;
          //             this.flvObj.cakeFlavours = null;
          //             this.myObj.cakesizeList = null;
          //             this.originalSizearr = null;
          //             this.myObj.categoryId = 0;
          //             var title = this.$refs["title"]
          //             var desc = this.$refs["description"]
          //             var layer = this.$refs["Costperlayer"]
          //             title.state = null;
          //             desc.state = null;
          //             layer.state = null;
          //              this.loading = false;
          //              this.$router.push('/apps/products/list');
          //            this.$notify({
          //            group: 'foo',
          //            type: "success ",
          //           text: 'cake added <b> sucess ! </b>',

          //         }).then((res)=>{

          //         })
          //       }
          //   })
          //     }
          //     })
          //       }
          //       }
          //    else
          //    {
          //      console.log("something went wrong!");
          //    }

          //     });

          // }
        }
      }
    },
    // onSelect() {
    //   const p = this.myObj
    //   this.clickedItems.push(p)
    //   //p=null
    //   console.log(this.clickedItems)
    // },
    //  isValid() {
    //     return this.name.length > 2 ? true : false;
    //   },
    //    isValidSize() {
    //     return this.size.type = number ? true : false;
    //   },
    LoadData() {
      this.dataloading = true;

      this.myObj.vendorId = this.userVendorId;
      console.log(this.myObj.vendorId);
      var axios = require('axios');
      var qs = require('qs');

      var config = {
        method: 'get',
        url: 'https://okaaik.fastech.pk//api/categories/getcategories',
        headers: {
          Authorization:
            'Bearer cVpBcOiMQZKBKHVwXYTOQwPI5gmbZeEodVdYqyd9cGeg90ERPem_PreUozE0oJvN_mW6FHQDSvtiYJZMrMLWjuPzs2tjbdWZ3wWvUXSed8r0ghTERCj5yW7Dumb-pyC1gGDA_j3fPydYQ8kKAF34g-CkqztFC45brtWiwRD5-N_iZNFrdSTwZEF_1hG2Bde4JfoaFcFEK4hfoa3RBe2wFdvBFYhbOan24v-LTB8ypDgvSNkT2BpIDYw5VoYx00lJ-JlWO210G-MHHMmPIKfdTfeUC1mRP2QPNysmNZKtsKe2eJ1l1wj9ThUn6NUEIV9Y',
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          //  console.log(JSON.stringify(response.data));
          console.log(response.data);
          this.categoryOptions = response.data;
          this.dataloading = false;

          // console.log(this.categoryOptions);

          //  this.categoryOptions.Name = response.data[0].Name;
        })
        .catch(function (error) {
          console.log(error);
          this.dataloading = true;
        });
      var axios = require('axios');
      var qs = require('qs');
      var data = qs.stringify({});
      var configf = {
        method: 'get',
        url: 'https://okaaik.fastech.pk/api/flavours/getallFlavours',
        headers: {
          Authorization:
            'Bearer cVpBcOiMQZKBKHVwXYTOQwPI5gmbZeEodVdYqyd9cGeg90ERPem_PreUozE0oJvN_mW6FHQDSvtiYJZMrMLWjuPzs2tjbdWZ3wWvUXSed8r0ghTERCj5yW7Dumb-pyC1gGDA_j3fPydYQ8kKAF34g-CkqztFC45brtWiwRD5-N_iZNFrdSTwZEF_1hG2Bde4JfoaFcFEK4hfoa3RBe2wFdvBFYhbOan24v-LTB8ypDgvSNkT2BpIDYw5VoYx00lJ-JlWO210G-MHHMmPIKfdTfeUC1mRP2QPNysmNZKtsKe2eJ1l1wj9ThUn6NUEIV9Y',
        },
        data: data,
      };

      axios(configf)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.flavorOptions = response.data;
          this.dataloading = false;
          console.log(response.data);

          //  this.categoryOptions.Name = response.data[0].Name;
        })
        .catch(function (error) {
          console.log(error);
          this.dataloading = true;
        });

      var configs = {
        method: 'get',
        headers: {
          Authorization:
            'Bearer cVpBcOiMQZKBKHVwXYTOQwPI5gmbZeEodVdYqyd9cGeg90ERPem_PreUozE0oJvN_mW6FHQDSvtiYJZMrMLWjuPzs2tjbdWZ3wWvUXSed8r0ghTERCj5yW7Dumb-pyC1gGDA_j3fPydYQ8kKAF34g-CkqztFC45brtWiwRD5-N_iZNFrdSTwZEF_1hG2Bde4JfoaFcFEK4hfoa3RBe2wFdvBFYhbOan24v-LTB8ypDgvSNkT2BpIDYw5VoYx00lJ-JlWO210G-MHHMmPIKfdTfeUC1mRP2QPNysmNZKtsKe2eJ1l1wj9ThUn6NUEIV9Y',
        },
        url: 'https://okaaik.fastech.pk//api/sizes/GetAll',

        data: data,
      };

      axios(configs)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          console.log(response.data);

          this.sizeOptions = response.data;
          this.dataloading = false;
          // console.log(this.categoryOptions);

          //  this.categoryOptions.Name = response.data[0].Name;
        })
        .catch(function (error) {
          console.log(error);
          this.dataloading = true;
        });
    },
  },
  computed: {},
  setup() {
    const priceCard = ref(true);

    const onSubmit = () => {
      store.dispatch('app-product/addMyProduct', productData.value).then(() => {
        //emit('refetch-data')
        $router.push({ name: 'apps-products-list' });
      });
    };

    // const {
    //   priceTableColumns,
    //   refFormObserver,
    //   getValidationState,
    //   resetForm,
    // } = formValidation(resetproductData)

    //  const refInputEl = ref(null)
    // const previewEl = ref(null)

    // const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      priceCard,
      onSubmit,
      //productData,
      //onSubmit,
      //inputImageRenderer,
      // categoryOptions,
      // flavorOptions,
    };
  },
};
</script>

            <style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-product-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>