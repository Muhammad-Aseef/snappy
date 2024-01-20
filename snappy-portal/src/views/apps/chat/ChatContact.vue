<template>
  <component
    :is="tag"
    v-on="$listeners"
  >
    <!-- <b-avatar
      size="42"
      :src="user.avatar"
      :badge="isChatContact"
      class="badge-minimal"
      :badge-variant="(user.status)"
      variant=""
    /> -->
       <b-avatar size="42" button @click="onClick" variant="primary" :text="user.userName.charAt(0).toUpperCase()" class="align-baseline"></b-avatar>
    <div class="chat-info flex-grow-1">
      <b-row>
      <b-col cols="6">
      <h5 class="mb-0">
        {{ user.userName }}
      </h5>  

      </b-col>
      
      <b-col cols="6" >
     
      <h5 class="card-text text-danger" >
         {{"Order Id " + user.orderId  }}
      </h5>
      
      </b-col>
      </b-row>
      <small class="chat-time">{{ user.date}}</small>

       <!-- <p class="card-text text-truncate">
        {{ isChatContact ? user.chat.lastMessage.message : user.about }}
      </p> -->

     </div>
  <!--  <div
      v-if="isChatContact"
      class="chat-meta text-nowrap"
    >
        <small class="float-right mb-25 chat-time">{{ formatDateToMonthShort(user.date, { hour: 'numeric', minute: 'numeric' }) }}</small>
     <b-badge
        v-if="user.chat.unseenMsgs"
        pill
        variant="primary"
        class="float-right"
      >
        {{ user.chat.unseenMsgs }}
      </b-badge> 
    </div> -->
  </component>
</template>

<script>
import { BAvatar, BBadge } from 'bootstrap-vue'
import { formatDateToMonthShort } from '@core/utils/filter'
import useChat from './useChat'

export default {
  components: {
    BAvatar,
    BBadge,
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    user: {
      type: Object,
      required: true,
    },
    isChatContact: {
      type: Boolean,
      dedfault: false,
    },
  },
  setup() {
    const { resolveAvatarBadgeVariant } = useChat()
    return { formatDateToMonthShort, resolveAvatarBadgeVariant }
  },
}
</script>

<style>

</style>
