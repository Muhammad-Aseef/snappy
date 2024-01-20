<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <!-- <b-link class="brand-logo">
        <vuexy-logo />
        
      </b-link>
  -->
      <!-- /Brand logo-->

      <!-- Left Text-->

      <!-- style="background-image: url('https://dk0pm9zdlq16s.cloudfront.net/862a7c99-cee2-44d7-a2db-a2c146250d70.png');"
       -->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            style="width: 25vw;"
            fluid
            src="https://cdn.cloudious.net/file-1671448500761-651485634.svg"
            alt="Login"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Login
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to explore snappy kitchen.
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider #default="{ errors }" name="Email" rules="required|email">
                  <b-form-input
                    id="login-email"
                    v-model="ulogin.email"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="hammad@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                </div>
                <validation-provider #default="{ errors }" name="Password" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-form-input
                      id="login-password"
                      v-model="ulogin.password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
                <b-link hidden :to="{ name: 'auth-forgot-password-v2' }" class="float-right">
                  <small>Forgot Password?</small>
                </b-link>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group hidden>
                <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">
                  Remember Me
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block :disabled="loading" @click="mylogin()">
                <b-spinner v-if="loading" variant="light" type="grow" small label="Spinning"></b-spinner>

                <span v-if="!loading">Sign in</span>
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>New to the platform?</span>
            <b-link :to="{ name: 'auth-register' }">
              <span>&nbsp;Click here to Sign up</span>
            </b-link>
          </p>

          <!-- <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{ name: 'form-seller' }" >
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text> -->
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import useJwt from "@/auth/jwt/useJwt";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import logo from "@/assets/images/logo/Geo-Talent logo.png";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    //VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      logo,
      loading: false,
      username: "",
      role: "",
      vendorId: 0,
      status: "",
      password: "",
      userEmail: "",
      sideImg: require("@/assets/images/pages/logo_large.png"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      ulogin: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    mylogin() {
      if (this.ulogin.email !== "" && this.ulogin.password !== "") {
        this.loading = true;
        var axios = require("axios");
        var data = this.ulogin;
        var mydata = {
          email: this.ulogin.email,
          password: this.ulogin.password,
        };
        var config = {
          method: "post",
          url: "http://localhost:3000/auth/login",
          data: mydata,
        };

        axios(config)
          .then((response) => {
            this.loading = false;
            //console.log(response.data);
            if (response.data.success) {
              this.$store.state.userData.userID = response.data.user.id;
              this.$store.state.userData.token = response.data.token;
              this.$store.commit("setSnappyUser", response.data.user);
              console.log(this.$store.state.snappyUser);

              useJwt
                .login({
                  email: "admin@demo.com",
                  password: "admin",
                })
                .then((response) => {
                  // console.log(response);
                  const { userData } = response.data;
                  useJwt.setToken(response.data.accessToken);
                  useJwt.setRefreshToken(response.data.refreshToken);
                  localStorage.setItem("userData", JSON.stringify(userData));

                  this.$ability.update(userData.ability);

                  this.$store.commit("app-ecommerce/UPDATE_CART_ITEMS_COUNT", userData.extras.eCommerceCartItemsCount);

                  this.$router.replace(getHomeRouteForLoggedInUser(userData.role)).then(() => {
                    this.$toast({
                      component: ToastificationContent,
                      position: "top-right",
                      props: {
                        title: `Welcome!`,
                        icon: "CoffeeIcon",
                        variant: "success",
                        text: `You have successfully logged in. Now you can start to explore!`,
                      },
                    });
                  });
                })
                .catch((error) => {
                  this.$refs.registerForm.setErrors(error.response.data.error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      } else {
        this.$bvToast.toast("Please fill the form correctly.", {
          title: "Error!",
          variant: "danger",
          solid: true,
        });
      }
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
