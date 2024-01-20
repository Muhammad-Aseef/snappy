<template>
  <b-card
    v-if="data"
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>Orders</b-card-title>
      <b-button
      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
      variant="flat-secondary"
    >
      View all
    </b-button>
    </b-card-header>

    <b-card-body>
      <div
        v-for="dashboardOrders in data"
        :key="dashboardOrders.name"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-avatar
              circle
              size="40"
              :src="dashboardOrders.avatarOrder"
            >
             
            </b-avatar>
          </b-media-aside>
          <b-media-body>
            <h6 class="transaction-title">
                {{ dashboardOrders.name }}
            </h6>
            <small>{{ dashboardOrders.amount }}</small>
          </b-media-body>
         
        </b-media>
         <b-dropdown
            variant="link"
            no-caret
            class="chart-dropdown"
            toggle-class="p-0"
            right
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="18"
                class="text-body cursor-pointer"
              />
            </template>
            <b-dropdown-item href="#">
              Accept
            </b-dropdown-item>
            <b-dropdown-item href="#">
              Decline
            </b-dropdown-item>
          </b-dropdown>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BMediaBody, BMedia, BMediaAside, BAvatar, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { BButton } from 'bootstrap-vue'
export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
