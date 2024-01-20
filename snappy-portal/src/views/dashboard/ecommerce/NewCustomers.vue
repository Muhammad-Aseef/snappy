<template>
  <b-card
    v-if="data"
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>New Customers</b-card-title>
      <b-card-text class="font-small-2 mr-25 mb-0">
       Approvel all
      </b-card-text>
    </b-card-header>
    <b-card-body class="">
      <b-row>
        <b-col
          v-for="item in data"
          :key="item.avatar"
          xl="3"
          sm="6"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="35"
                :src="item.avatar"
              >
               
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h6 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h6>
              <b-card-text class="font-small-3 mb-0">
                {{ item.address }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
