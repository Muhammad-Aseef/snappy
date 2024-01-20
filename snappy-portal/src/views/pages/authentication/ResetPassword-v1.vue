<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <b-col
        lg="5"
        cols="mx-auto"
        class=" auth-bg px-1 p-lg-1 mx-auto"
        style="height:400px"
      >
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Reset Password 🔒
          </b-card-title>
          <b-card-text class="mb-2">
            Your new password must be different from previously used passwords
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form class="auth-reset-password-form mt-2">
              <!-- old password -->
              <b-form-group label="Old Password" label-for="Old-password">
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="Password"
                  rules="required|password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="reset-password-new"
                      v-model="oldpassword"
                      :type="password3FieldType"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      name="reset-password-new"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password3ToggleIcon"
                        @click="togglePassword3Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- password -->
              <b-form-group label="New Password" label-for="reset-password-new">
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="Password"
                  rules="required|password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="reset-password-new"
                      v-model="password"
                      :type="password1FieldType"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      name="reset-password-new"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password1ToggleIcon"
                        @click="togglePassword1Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- confirm password -->
              <b-form-group
                label-for="reset-password-confirm"
                label="Confirm Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Confirm Password"
                  rules="required|confirmed:Password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="reset-password-confirm"
                      v-model="cPassword"
                      :type="password2FieldType"
                      class="form-control-merge"
                      :state="errors.length > 0 ? false : null"
                      name="reset-password-confirm"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password2ToggleIcon"
                        @click="togglePassword2Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit button -->
            </b-form>
            <b-button
              block
              type="submit"
              variant="primary"
              :disabled="loading"
              @click="Submit()"
            >
              <b-spinner
                v-if="loading"
                variant="light"
                type="grow"
                small
                label="Spinning"
              ></b-spinner>
              <span v-if="!loading">Set New Password</span>
            </b-button>
          </validation-observer>

          <!-- <p class="text-center mt-2">
            <b-link :to="{name:'auth-login-v2'}">
              <feather-icon icon="ChevronLeftIcon" /> Back to login
            </b-link>
          </p> -->
        </b-col>
      </b-col>
      <!-- /Reset password-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BRow,
  BCol,
  BCardTitle,
  BCardText,
  BForm,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BLink,
  BFormInput,
  BButton,
  BSpinner,
} from "bootstrap-vue";
import { required } from "@validations";
import store from "@/store/index";

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BInputGroup,
    // BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
  },
  data() {
    return {
      loading: false,
      userEmail: "",
      cPassword: "",
      password: "",
      oldpassword: "",
      sideImg: require("@/assets/images/pages/reset-password-v2.svg"),
      // validation
      required,

      // Toggle Password
      password1FieldType: "password",
      password2FieldType: "password",
      password3FieldType: "password",
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/reset-password-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
    password1ToggleIcon() {
      return this.password1FieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    password2ToggleIcon() {
      return this.password2FieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    password3ToggleIcon() {
      return this.password3FieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    Submit() {
      this.loading = true;
      console.log(this.$store.state.userData.userID);
      console.log(this.password == "", this.cPassword, this.oldpassword);
      if (
        this.password === "" ||
        this.cPassword === "" ||
        this.oldpassword === ""
      ) {
        this.$bvToast.toast("Please fill all the required fields!", {
          title: "Error!",
          variant: "danger",
          toaster: "b-toaster-top-right",
        });
        this.loading = false;
      } else {
        if (this.password !== this.cPassword) {
          this.$bvToast.toast("Password Confirmation does not match!", {
            title: "Error!",
            variant: "danger",
            toaster: "b-toaster-top-right",
          });
          this.loading = false;
        }
        // else{

        //    var axios = require('axios');
        //         var data = {
        //           Id: this.$store.state.userData.userID,
        //           oldPassword:this.oldpassword,
        //           newPassword:this.cPassword,
        //         };
        //      //  return  console.log(data);
        //         // this.$store.state.userData.userID
        //         var config = {
        //           method: 'put',
        //           url: 'https://kof.appick.io/api/Tokens/ChangePassword',
        //           headers: {
        //             Authorization: 'bearer ' + this.$store.state.userData.token,
        //           },
        //           data: data,
        //         };

        //         axios(config)
        //           .then(response => {
        //             if (response.data.status === 'error') {
        //               console.log(response.data);
        //               this.$bvToast.toast('Wrong password!', {
        //                 title: 'Error!',
        //                 variant: 'danger',
        //                 toaster: 'b-toaster-top-right',
        //               });

        //             }
        //             else if(response.data.status === 'success')
        //             {
        //               this.$bvToast.toast('Password Changed Successfully!', {
        //                 title: 'Success!',
        //                 variant: 'success',
        //                 toaster: 'b-toaster-top-right',
        //               });
        //               this.oldpassword = ""
        //               this.password = ""
        //               this.cPassword = ""
        //             }
        //             else
        //             {
        //               this.$bvToast.toast('Some thing went wrong!', {
        //                 title: 'Error!',
        //                 variant: 'error',
        //                 toaster: 'b-toaster-top-right',
        //               });
        //             }
        //           })
        //           .catch(function(error) {
        //             console.log(error);
        //           });
        // }
      }
    },
    togglePassword1Visibility() {
      this.password1FieldType =
        this.password1FieldType === "password" ? "text" : "password";
    },
    togglePassword2Visibility() {
      this.password2FieldType =
        this.password2FieldType === "password" ? "text" : "password";
    },
    togglePassword3Visibility() {
      this.password3FieldType =
        this.password3FieldType === "password" ? "text" : "password";
    },
    validationForm() {
      console.log(password, cPassword);
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Form Submitted",
              icon: "EditIcon",
              variant: "success",
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
