<template>
  <div>
    <!-- <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="Back()"
        >
          <feather-icon icon="ArrowLeftIcon" class="mr-50" />
          <span class="align-middle">Back to grid</span>
        </b-button> -->

    <b-card no-body class="mb-0 ">
      <b-row class="ml-1 mr-1"><h2 class="pt-2 pb-2">User Details</h2></b-row>
      <b-row class="ml-1 mr-1">
        <b-col md="">
          <div style=" width: 100%;">
            <b-row>
              <b-col>
                <b-img
                  :src="user.picture"
                  style="width: 150px; height: 150px; object-fit: cover;"
                  rounded
                  alt="picture"
                />
              </b-col>
              <b-col>
                <h4>Name</h4>
                <p>{{ user.name }}</p>
              </b-col>
              <b-col>
                <h4>Address</h4>
                <p>{{ us.address }}</p>
              </b-col>
              <b-col>
                <h4>Email</h4>
                <p>{{ user.email }}</p>
              </b-col>
              <b-col>
                <h4>Phone</h4>
                <p>{{ user.phone }}</p>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="ml-1 mr-1"><h2 class="pt-2 pb-2">Vendor Details</h2></b-row>
      <b-row class="ml-1 mr-1">
        <b-col md="">
          <div style=" width: 100%;">
            <b-row>
              <b-col>
                <b-img
                  :src="vendor.vendorLogo"
                  style="width: 150px; height: 150px; object-fit: cover; "
                  rounded
                  alt="picture"
                />
              </b-col>
              <b-col>
                <h4>Name</h4>
                <p>{{ vendor.vendorName }}</p>
              </b-col>
              <b-col>
                <h4>Address</h4>
                <p>{{ vendor.vendorAddress }}</p>
              </b-col>
              <b-col>
                <h4>Type</h4>
                <p>{{ vendor.vendorType }}</p>
              </b-col>
              <b-col>
                <h4>Status</h4>
                <p>{{ vendor.status }}</p>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="ml-1 mr-1"><h2 class="pt-2 pb-2">Bank Details</h2></b-row>
      <b-row class="ml-1 mr-1">
        <b-col>
          <h4>Title</h4>
          <p>{{ bank.title }}</p>
        </b-col>
        <b-col>
          <h4>Bank Name</h4>
          <p>{{ bank.bankName }}</p>
        </b-col>
        <b-col>
          <h4>Account Number</h4>
          <p>{{ bank.accountNumber }}</p>
        </b-col>
      </b-row>
      <b-row class="ml-1 mr-1"><h2 class="pt-2 pb-2">Order Details</h2></b-row>
      <b-table :items="myObj" :fields="fields" striped>
        <template #cell(#)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(productID)="data">
          {{ product[data.index].name }}
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import {
  BFormFile,
  BButton,
  BTable,
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
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
Vue.use(VueViewer);
export default {
  components: {
    BFormTextarea,
    //BBadge,
    BButton,
    BTable,
    //BForm,
    BImg,
    //BFormFile,
    //BFormGroup,
    //BFormInput,
    BRow,
    BCol,
    //BAlert,
    BCard,
    //BCardText,
    BMedia,
    BMediaAside,
    //BMediaBody,
    BLink,
    //vSelect,
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
      reason: "",
      facilities: [],
      reviews: [],
      memberships: [],
      types: [],
      logoloading: false,
      plus: [],
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
      myObj: [],
      product: [],
      fields: [
        "#",
        { label: "product", key: "productID" },
        { label: "quantity", key: "qty" },
        { label: "discount", key: "discount" },
        { label: "amount", key: "netAmount" },
        { label: "status", key: "status" },
      ],
      bank: {},
      order: {},
      vendor: {},
      user: {},
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
    Rejected() {
      this.myObj.reason = this.reason;
      var axios = require("axios");
      // this.$store.state.userData.userID
      var config = {
        method: "put",
        url: "https://waqta.appick.io/api/venues/Reject",
        headers: {
          Authorization: "bearer " + this.$store.state.userData.token,
        },
        data: { id: this.myObj.id, reason: this.myObj.reason },
      };

      axios(config)
        .then((response) => {
          if (response.data.status === "success") {
            this.$bvModal.hide("modal-reject");
            if (
              this.myObj.status == "active" ||
              this.myObj.status == "Active"
            ) {
              Swal.fire("Success!", "Supended.", "success").then((res) => {
                this.Back();
              });
            } else {
              Swal.fire("Success!", "Rejected.", "success").then((res) => {
                this.Back();
              });
            }
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
    RejectVenue() {
      this.$bvModal.show("modal-reject");
    },
    Approve() {
      var axios = require("axios");
      // this.$store.state.userData.userID
      var config = {
        method: "put",
        url: "https://waqta.appick.io/api/venues/Approve?id=" + this.myObj.id,
        headers: {
          Authorization: "bearer " + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then((response) => {
          if (response.data.status === "success") {
            if (
              this.myObj.status == "Inactive" ||
              this.myObj.status == "inactive"
            ) {
              Swal.fire("Success!", "Activate.", "success").then((res) => {
                this.Back();
              });
            } else {
              Swal.fire("Success!", "Approved.", "success").then((res) => {
                this.Back();
              });
            }
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
              var fn = result.myresp[i].filename;
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
            var fn = "https://appick.io/u/lessons/" + e.data.myresp[0].filename;
            console.log(fn);
            this.myObj.coverImg = fn;
            //console.log(this.myObj.coverImg);
            this.loading = "loaded";
            console.log(this.loading);
          });
      }
    },

    LoadData(id) {
      var axios = require("axios");
      var config = {
        method: "get",
        url: "https://kof.appick.io/api/orders/LoadOrderDetails?id=" + id,
        headers: {
          Authorization: "bearer " + this.$store.state.userData.token,
        },
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          this.myObj = [];
          this.product = []; // to display product name instead of product id
          response.data.data.forEach((el) => {
            this.myObj.push(el.detail);
            this.product.push(el.product);
          });
          this.bank = response.data.bank;
          this.order = response.data.order;
          this.vendor = this.order.vn;
          // console.log("ven", this.vendor);
          this.user = this.order.usr;
          // console.log("user", this.user);
          this.us = this.order.us;
          // console.log("us", this.us);

          console.log("Obj", this.myObj);
          console.log("pro", this.product);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  computed: {},
};
</script>
