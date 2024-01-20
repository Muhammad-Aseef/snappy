<template>
  <b-card>
    <b-form>
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon icon="LinkIcon" size="18" />
            <h4 class="mb-0 ml-75">
              Social Links
            </h4>
          </div>
        </b-col>

        <!-- twitter -->
        <b-col md="6">
          <b-form-group label-for="account-twitter" label="Twitter">
            <b-form-input
              id="account-twitter"
              v-model="localOptions.socialLinks.twitter"
              placeholder="Add link"
            />
          </b-form-group>
        </b-col>
        <!--/ twitter -->

        <!-- facebook -->
        <b-col md="6">
          <b-form-group label-for="account-facebook" label="Facebook">
            <b-form-input
              id="account-facebook"
              v-model="localOptions.socialLinks.facebook"
              placeholder="Add link"
            />
          </b-form-group>
        </b-col>
        <!--/ facebook -->

        <!-- google+ -->
        <b-col md="6">
          <b-form-group label-for="account-google" label="Google+">
            <b-form-input
              id="account-google"
              v-model="localOptions.socialLinks.google"
              placeholder="Add link"
            />
          </b-form-group>
        </b-col>
        <!--/ google+ -->

        <!-- linkedin -->
        <b-col md="6">
          <b-form-group label-for="account-linkedin" label="LinkedIn">
            <b-form-input
              id="account-linkedin"
              v-model="localOptions.socialLinks.linkedIn"
              placeholder="Add link"
            />
          </b-form-group>
        </b-col>
        <!-- linkedin -->

        <!-- instagram -->
        <b-col md="6">
          <b-form-group label="Instagram" label-for="account-instagram">
            <b-form-input
              id="account-instagram"
              v-model="localOptions.socialLinks.instagram"
              placeholder="Add link"
            />
          </b-form-group>
        </b-col>
        <!--/ instagram -->

        <!-- quora -->
        <b-col md="6">
          <b-form-group label-for="account-quora" label="Quora">
            <b-form-input
              id="account-quora"
              v-model="localOptions.socialLinks.quora"
              placeholder="Add link"
            />
          </b-form-group>
        </b-col>
        <!--/ quora -->

        <b-col cols="12">
          <hr class="my-2" />
        </b-col>

        <!-- Profile Connections -->

        <!-- buttons -->
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            class="mt-1 ml-25"
            variant="outline-secondary"
            @click.prevent="resetForm"
          >
            Cancel
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BCardText,
  BLink,
  BAvatar,
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
  },
  directives: {
    Ripple,
  },
  props: {
    socialData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      localOptions: JSON.parse(JSON.stringify(this.socialData)),
    };
  },
  methods: {
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.socialData));
    },
  },
};
</script>
