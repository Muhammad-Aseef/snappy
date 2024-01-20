<template>
  <div>
    <b-row>
      <b-col xl="1" lg="1" md="0"> </b-col>
      <b-col xl="10" lg="10" md="12">
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="Back()"
        >
          <feather-icon icon="ArrowLeftIcon" class="mr-50" />
          <span class="align-middle">Back to grid</span>
        </b-button>
        <h2 class="pt-2 pb-2">Edit Venue</h2>
        <b-card>
          <b-row>
            <b-col xl="*" md="auto" cols="6">
              <b-form-group
                ref="image"
                label="Cover Image"
                invalid-feedback="Cover is required."
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
            <b-col xl="*" md="auto" cols="6">
              <b-form-group
                label="More Images"
                invalid-feedback="Image is required."
              >
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
                    src="https://dk0pm9zdlq16s.cloudfront.net/5be0a5b2-5eaf-4090-8528-4be800d41de0.jpg"
                    @click="$refs.mfile.click()"
                    v-if="moreloading == false"
                    style="height: 150px; width: 150px; object-fit: cover"
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
              </b-form-group>
            </b-col>
            <b-col
              xl="*"
              md="auto"
              cols="6"
              v-for="(img, index) in images"
              :key="img.id"
            >
              <b-form-group
                style="color: white"
                :label="index + 1"
                invalid-feedback="Image is required."
              >
                <b-link>
                  <div>
                    <i
                      style="margin-top: 70px; margin-left: 70px"
                      class="fa fa-trash fa-md text-danger position-absolute"
                      @click="removeImg(index)"
                    ></i>
                  </div>
                  <div>
                    <b-img
                      rounded
                      :src="img"
                      style="height: 150px; width: 150px; object-fit: cover"
                    />
                  </div>
                </b-link>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <small class="text-muted"
                >* Recommended pixels for cover are 850 x 950</small
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <small class="text-muted"
                >* Recommended pixels for more images are 850 x 950</small
              >
            </b-col>
          </b-row>
          <div class="text-center" v-if="this.imgerr">
            <small class="text-danger ml-1">Image is required.</small>
          </div>
          <b-form>
            <b-row>
              <b-col>
                <b-form-group
                  label="Name"
                  invalid-feedback="Venue name is required."
                >
                  <b-form-input
                    id="name-input"
                    ref="name"
                    placeholder="Enter venue name here."
                    required
                    @focusout="CheckName()"
                    v-model="myObj.name"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Business Type"
                  invalid-feedback="Business type is required."
                  ref="type"
                >
                  <v-select
                    v-model="myObj.businessType"
                    :disabled="dataloading"
                    :options="types"
                    label="businessType"
                    :reduce="(val) => val.id"
                    placeholder="Select business type"
                    required
                    @search:blur="Checktype()"
                    @option:deselecting="Checktype()"
                    ref="type"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Vendor">
                  <b-form-input
                    id="name-input"
                    disabled
                    required
                    v-model="vendorName"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Price"
                  invalid-feedback="Price is required."
                >
                  <b-form-input
                    id="name-input"
                    ref="price"
                    placeholder="Enter price here."
                    required
                    @keyup="Checkprice()"
                    v-model="myObj.price"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  label="Email Address"
                  invalid-feedback="Valid email is required."
                >
                  <b-form-input
                    id="name-input"
                    required
                    placeholder="Enter email address here."
                    v-model="myObj.email"
                    @focusout="Checkemail()"
                    ref="email"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Contact Number"
                  invalid-feedback="Contact is required."
                >
                  <b-form-input
                    id="name-input"
                    ref="phone"
                    placeholder="Enter contact number here."
                    @focusout="Checkphone()"
                    v-model="myObj.phone"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  label="License Number"
                  invalid-feedback="License number is required."
                >
                  <b-form-input
                    id="name-input"
                    ref="licenseNumber"
                    placeholder="Enter license number here."
                    required
                    @focusout="ChecklicenseNumber()"
                    v-model="myObj.licenseNumber"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Timings"
                  invalid-feedback="Timings are required."
                >
                  <b-form-input
                    id="name-input"
                    ref="timings"
                    placeholder="Enter timings here."
                    required
                    @focusout="Checktimings()"
                    v-model="myObj.timings"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  label="Days"
                  invalid-feedback="Days are required."
                >
                  <b-form-input
                    id="name-input"
                    ref="days"
                    placeholder="Enter days seperated by comma (,) here."
                    required
                    @focusout="Checkdays()"
                    v-model="myObj.days"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Location"
                  invalid-feedback="Location is required."
                >
                  <b-form-input
                    id="name-input"
                    ref="location"
                    placeholder="Enter location here."
                    required
                    @focusout="Checklocation()"
                    v-model="myObj.location"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  label="Facebook Link"
                  invalid-feedback="Facebook url is required."
                >
                  <b-form-input
                    id="name-input"
                    ref="facebook"
                    required
                    v-model="myObj.facebook"
                    @focusout="Checkfacebook()"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group
                  label="Description"
                  invalid-feedback="Description is required."
                  ref="description"
                >
                  <b-form-textarea
                    id="textarea-default"
                    placeholder="Enter venue discription here."
                    rows="3"
                    v-model="myObj.description"
                    @focusout="Checkdescription()"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <div style="">
            <b-button
              class="float-right ml-5"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="Save()"
            >
              <feather-icon icon="EditIcon" class="mr-50" />
              <span class="align-middle">Save</span>
            </b-button>
          </div>
        </b-card>
      </b-col>
      <b-col xl="1" lg="1" md="0"> </b-col>
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
  BFormTextarea,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { useInputImageRenderer } from "@core/comp-functions/forms/form-utils";
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import formValidation from "@core/comp-functions/forms/form-validation";
// import { required, alphaNum, email } from '@validations'
import Vue from "vue";
import store from "@/store";
import axios from "axios";
import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue";
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  components: {
    BFormTextarea,
    //BBadge,
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
    //BCardText,
    BMedia,
    BMediaAside,
    //BMediaBody,
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
    // return console.log(window.location.pathname.split('/')[3])

    this.LoadData(window.location.pathname.split("/")[3]);
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
      vendorName: "",
      types: [],
      logoloading: false,
      plus: "",
      userVendorId: this.$store.state.userData.userID,
      moreloading: false,
      moreFiles: [],
      addOptions: "Add Cake",
      count: 0,
      costVisible: false,
      feedback: false,
      sizeOptions: [],
      imageUrl: "https://upload.appick.io",
      fileList: undefined,
      removecostId: 0,
      sizeId: 0,
      spin: "",
      files: undefined,
      cost: "",
      file: " ",
      name: " ",
      category: "",
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
        size: "",
        cost: "",
      },
      // imgObj:{
      // pId: 0,
      // cakeFlavours: [],
      // },
      categoryOptions: [],
      getproductId: 0,
      clickedItems: [],
      moreImages: [],
      productResponse: {},
      flavorOptions: [],
      myObj: {
        id: 0,
        name: "",
        businessType: 0,
        licenseNumber: "",
        cover: "",
        images: "",
        timings: "",
        startAt: "",
        closesAt: "",
        days: "",
        description: "",
        price: 0,
        location: "",
        lat: "",
        lon: "",
        vendorID: 0,
        sequence: 0,
        status: "",
        reason: "",
        averageRating: 0,
        email: "",
        phone: "",
        facebook: "",
      },
      images: [],
      // flavourId:[],
      cakesizeList: [],
      sizes: {
        productId: 0,
        size: "",
        cost: "",
      },
      proImg: {
        pId: 0,
        images: [],
      },
    };
  },

  methods: {
    Back() {
      this.$router.replace({ name: "apps-banners" });
    },
    Save() {
      this.CheckName();
      this.Checktype();
      this.Checkprice();
      this.Checkemail();
      this.Checkphone();
      this.ChecklicenseNumber();
      this.Checktimings();
      this.Checklocation();
      this.Checkdays();
      this.Checkdescription();
      this.Checkfacebook();
      this.CheckImage();
      if (
        this.CheckName() == false ||
        this.Checktype() == false ||
        this.Checkprice() == false ||
        this.Checkemail() == false ||
        this.Checkphone() == false ||
        this.CheckImage() == false ||
        this.ChecklicenseNumber() == false ||
        this.Checktimings() == false ||
        this.Checklocation() == false ||
        this.Checkdays() == false ||
        this.Checkdescription() == false ||
        this.Checkfacebook() == false
      ) {
        return 0;
      } else {
        this.myObj.images = this.images.toString();
        //return console.log(this.myObj);
        var axios = require("axios");
        // this.$store.state.userData.userID
        var config = {
          method: "put",
          url: "https://waqta.appick.io/api/venues/" + this.myObj.id,
          headers: {
            Authorization: "bearer " + this.$store.state.userData.token,
          },
          data: this.myObj,
        };

        axios(config)
          .then((response) => {
            if (response.data.status === "success") {
              console.log(response.data);

              this.$bvToast.toast("Venue updated.", {
                title: "Success!",
                variant: "success",
                toaster: "b-toaster-bottom-center",
              });
              this.$router.replace({ name: "apps-banners" });
            } else {
              this.$bvToast.toast("Something went wrong.", {
                title: "Error!",
                variant: "danger",
                toaster: "b-toaster-bottom-center",
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
    },
    CheckImage() {
      // return console.log("Hellasasasasaooo",this.myObj.cover);
      var elem = this.$refs["image"];
      if (this.myObj.cover == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    Checkphone() {
      console.log("HEllo phone" + this.myObj.phone);
      var elem = this.$refs["phone"];
      if (this.myObj.phone == "" || this.myObj.phone == null) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    CheckName() {
      var elem = this.$refs["name"];
      if (this.myObj.name == "" || this.myObj.name.length < 3) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    Checktype() {
      var elem = this.$refs["type"];
      if (
        this.myObj.businessType == 0 ||
        this.myObj.businessType == undefined ||
        this.myObj.businessType == null
      ) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    Checkprice() {
      var elem = this.$refs["price"];
      const regex = /^\d+(,\d{1,2})?$/;
      if (parseInt(this.myObj.price) !== 0) {
        if (regex.test(this.myObj.price)) {
          this.myObj.price = parseInt(this.myObj.price);
          return (elem.state = true);
        } else {
          return (elem.state = false);
        }
      } else {
        this.myObj.price = "";
        return (elem.state = false);
      }
    },
    Checkemail() {
      var elem = this.$refs["email"];
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (
        re.test(String(this.myObj.email).toLowerCase()) &&
        this.myObj.email !== ""
      ) {
        elem.state = true;
      } else {
        elem.state = false;
      }
    },
    ChecklicenseNumber() {
      var elem = this.$refs["licenseNumber"];
      if (
        this.myObj.licenseNumber == "" ||
        this.myObj.licenseNumber.length < 3
      ) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    Checktimings() {
      var elem = this.$refs["timings"];
      if (this.myObj.timings == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    Checklocation() {
      var elem = this.$refs["location"];
      if (this.myObj.location == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    Checkdays() {
      var elem = this.$refs["days"];
      if (this.myObj.days == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    Checkdescription() {
      var elem = this.$refs["description"];
      if (this.myObj.description == "") {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    Checkfacebook() {
      var elem = this.$refs["facebook"];
      if (this.myObj.facebook == "" || this.myObj.facebook == null) {
        return (elem.state = false);
      } else {
        return (elem.state = true);
      }
    },
    RejectVenue(item) {
      this.myObj.id = item.id;
      this.$bvModal.show("modal-reject");
    },
    Rejected() {
      this.myObj.reason = this.reason;
      var axios = require("axios");
      // this.$store.state.userData.userID
      var config = {
        method: "put",
        url: "https://waqta.appick.io/api/venues/" + this.myObj.id,
        headers: {
          Authorization: "bearer " + this.$store.state.userData.token,
        },
        data: this.myObj,
      };

      axios(config)
        .then((response) => {
          if (response.data.status === "success") {
            this.$bvModal.hide("modal-reject");
            console.log(response.data);
            this.LoadData();

            this.$bvToast.toast("Reason sended.", {
              title: "Success!",
              variant: "success",
              toaster: "b-toaster-bottom-center",
            });
          } else {
            this.$bvToast.toast("Something went wrong.", {
              title: "Error!",
              variant: "danger",
              toaster: "b-toaster-bottom-center",
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
    removeImg(index) {
      console.log(index);
      this.images.splice(index, 1);
      this.$refs.mfile.value = null;
    },
    deleteLogo() {
      //console.log(0);
      this.myObj.cover = "";
      this.logoloading = false;
      this.$refs.fileProfile.value = null;
    },
    selectlogo() {
      this.fileProfile = this.$refs.fileProfile.files[0];
      var axios = require("axios");
      //console.log(this.fileProfile.name);

      //console.log(this.fileProfile, this.loading );
      //Upload cover
      if (this.fileProfile !== "") {
        this.logoloading = true;
        let formData = new FormData();
        formData.append("file", this.fileProfile);
        console.log(this.fileProfile);
        axios
          .post("https://upload.appick.io", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

          .then((e) => {
            console.log(e.data);
            // this.file = undefined;
            var fn1 = e.data.myresp[0].path;
            console.log(fn1);
            // console.log(fn);
            this.plus = fn1;
            this.myObj.cover = this.plus;
            console.log(this.plus);
            //console.log(this.myObj.coverImg);
            this.logoloading = "loaded";
            this.CheckImage();
            console.log(this.loading);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    selectMoreFile() {
      //this.moreFiles = this.$refs.mfile.files;
      if (this.$refs.mfile.files.length !== 0) {
        this.moreloading = true;
        var formdata = new FormData();
        for (var i = 0; i < this.$refs.mfile.files.length; i++) {
          formdata.append("file", this.$refs.mfile.files[i], "[PROXY]");
        }
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch("https://upload.appick.io", requestOptions)
          .then((response) => response.json()) //2
          .then((result) => {
            for (var i = 0, len = result.myresp.length; i < len; ++i) {
              this.moreloading = false;
              var fn = result.myresp[i].path;
              this.images.push(fn);
            }
          })

          .catch((error) => console.log("error", error));
      }
    },
    openModal() {
      console.log(this.sizes);
      Swal.fire({
        title: "Enter Cake Cost",
        input: "text",

        inputPlaceholder: "Enter cake cost",
        confirmButtonText: "Add",
        confirmButtonColor: "#FF5A60",
        inputAttributes: {
          maxlength: 10,
          autocapitalize: "off",
          autocorrect: "off",
        },
      }).then((result) => {
        if (result.value) {
          this.costVisible = true;
          console.log("Result: " + result.value);
          this.sizes.cost = result.value;
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
      var elem = this.$refs["title"];

      return (elem.state = this.myObj.title.length > 2 ? true : false);
    },
    checkCategory() {
      console.log("Osama");
    },
    checkDesc() {
      var elem = this.$refs["description"];
      elem.state = this.myObj.description.length > 2 ? true : false;
      console.log(elem.state);
    },
    checkCostperlayer() {
      var elem = this.$refs["Costperlayer"];
      if (this.myObj.perLayerCost <= 0) {
        elem.state = false;
        console.log(elem.state);
      } else {
        elem.state = true;
      }
    },
    checkFlavour() {
      var elem = this.$refs["flavour"];
      if (this.flvObj !== null) {
        elem.state = false;
        console.log(elem.state);
      } else {
        elem.state = true;
      }
    },
    deleteCover() {
      console.log(0);
      this.myObj.coverImg = "";
      this.loading = false;
    },
    getImageUrl() {
      return this.myObj.coverImg;
    },
    selectFile() {
      this.loading = true;
      this.file = this.$refs.file2.files[0];

      console.log(this.file.name);

      console.log(this.file, this.loading);
      //Upload cover
      if (this.file !== "") {
        let formData = new FormData();
        formData.append("file", this.file);
        console.log(this.file);
        axios
          .post("https://upload.appick.io", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((e) => {
            console.log(e.data);
            // this.file = undefined;
            var fn = e.data.myresp[0].path;
            console.log(fn);
            this.myObj.coverImg = fn;
            //console.log(this.myObj.coverImg);
            this.loading = "loaded";
            console.log(this.loading);
          });
      }
    },

    AddProduct() {
      this.checkTitle();
      this.checkDesc();
      this.checkCostperlayer();
      if (
        this.checkTitle() == false ||
        this.checkDesc() == false ||
        this.checkCostperlayer()
      ) {
        this.$notify({
          group: "foo",
          type: "error ",
          text: "Please fill the form <b> Correctly ! </b>",
        });
      } else {
        if (
          this.myObj.productId === 0 &&
          this.myObj.vendorId === this.userVendorId &&
          this.myObj.vendorId !== 0
        ) {
          //Add
          console.log(this.myObj, this.flvObj);
          this.addOptions = "Saving...";
          var axios = require("axios");
          var config = {
            method: "post",
            url: "https://waqta.appick.io/api/products/PostProduct",
            headers: {
              Authorization:
                "Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp",
              "Content-Type": "application/json",
            },
            data: this.myObj,
          };

          console.log(this.myObj);
          axios(config).then((response) => {
            if (response.data.status == "success") {
              console.log("ProductAdded");
              this.productResponse = response.data;
              this.flvObj.pId = this.productResponse.Id;
              this.sizes.productId = this.productResponse.Id;
              this.addItem(this.productResponse.Id);
              this.proImg.pId = this.productResponse.Id;
              console.log(this.flvObj);
              if (this.flvObj !== null) {
                var configflv = {
                  method: "post",
                  url:
                    "https://okaaik.fastech.pk/api/cakeFlavours/AddcakeFlavours",
                  headers: {
                    Authorization:
                      "Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp",
                    "Content-Type": "application/json",
                  },
                  data: this.flvObj,
                };
                axios(configflv).then((response) => {
                  if (response.data.status == "success") {
                    console.log(this.originalSizearr);
                    console.log("FlvAdded");
                    var configsize = {
                      method: "post",
                      url:
                        "https://okaaik.fastech.pk/api/cakeSizes/PostsizesList/",
                      headers: {
                        Authorization:
                          "Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp",
                        "Content-Type": "application/json",
                      },
                      data: this.originalSizearr,
                    };

                    axios(configsize).then((response) => {
                      if (response.data.status == "success") {
                        console.log("SizesAdded");
                        console.log(this.proImg);
                        var configimges = {
                          method: "post",
                          url:
                            "https://okaaik.fastech.pk/api/products/AddProductsImage/",
                          headers: {
                            Authorization:
                              "Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp",
                            "Content-Type": "application/json",
                          },
                          data: this.proImg,
                        };
                        axios(configimges).then((response) => {
                          if (response.data.status == "success") {
                            console.log("Images Added");
                            this.addOptions = "Add Cake";
                            this.$router.push("/apps/products/list");
                            this.$notify({
                              group: "foo",
                              type: "success ",
                              text: "cake added <b> sucess ! </b>",
                            }).then((res) => {});
                          }
                        });
                      }
                    });
                  }
                });
              }
            }
          });
        }
      }
    },
    LoadData(id) {
      var axios = require("axios");
      var config = {
        method: "get",
        url: "https://waqta.appick.io/api/business",
        headers: {
          Authorization: "Bearer " + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          this.types = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      var axios = require("axios");
      var configf = {
        method: "get",
        url: "https://waqta.appick.io/api/venues/Get?id=" + id,
        headers: {
          Authorization: "Bearer " + this.$store.state.userData.token,
        },
      };

      axios(configf)
        .then((response) => {
          this.images = response.data.venue.images.split(",");
          this.myObj = response.data.venue;
          this.logoloading = "loaded";
          this.plus = this.myObj.cover;
          this.vendorName = response.data.vendorDetails.fullName;
          console.log(this.myObj);
        })
        .catch(function(error) {
          console.log(error);
        });

      var configs = {
        method: "get",
        headers: {
          Authorization:
            "Bearer cVpBcOiMQZKBKHVwXYTOQwPI5gmbZeEodVdYqyd9cGeg90ERPem_PreUozE0oJvN_mW6FHQDSvtiYJZMrMLWjuPzs2tjbdWZ3wWvUXSed8r0ghTERCj5yW7Dumb-pyC1gGDA_j3fPydYQ8kKAF34g-CkqztFC45brtWiwRD5-N_iZNFrdSTwZEF_1hG2Bde4JfoaFcFEK4hfoa3RBe2wFdvBFYhbOan24v-LTB8ypDgvSNkT2BpIDYw5VoYx00lJ-JlWO210G-MHHMmPIKfdTfeUC1mRP2QPNysmNZKtsKe2eJ1l1wj9ThUn6NUEIV9Y",
        },
        url: "https://waqta.appick.io/api/sizes/GetAll",

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
        .catch(function(error) {
          console.log(error);
          this.dataloading = true;
        });
    },
  },
  computed: {},
};
</script>
