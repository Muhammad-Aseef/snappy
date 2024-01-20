<template>
  <div class="sidebar-left">
    <div class="sidebar">

      <!-- Logged In User Profile Sidebar -->
      <user-profile-sidebar
        :shall-show-user-profile-sidebar="shallShowUserProfileSidebar"
        :profile-user-data="profileUserData"
        @close-sidebar="$emit('update:shall-show-user-profile-sidebar', false)"
      />

      <!-- Sidebar Content -->
      <div
        class="sidebar-content"
        :class="{'show': mqShallShowLeftSidebar}"
      >

        <!-- Sidebar close icon -->
        <span class="sidebar-close-icon">
          <feather-icon
            icon="XIcon"
            size="16"
            @click="$emit('update:mq-shall-show-left-sidebar', false)"
          />
        </span>

        <!-- Header -->
        <div class="chat-fixed-search">
          <div class="d-flex align-items-center w-100">
            <div class="sidebar-profile-toggle">
              <b-avatar
                size="42"
                class="cursor-pointer badge-minimal avatar-border-2"
                variant="light-danger"
                badge
                badge-variant="success"
              />
                <!-- @click.native="$emit('show-user-profile')" -->

            </div>
            <!-- Search -->
            <b-input-group class="input-group-merge ml-1 w-100 round">
              <b-input-group-prepend is-text>
                <feather-icon
                  icon="SearchIcon"
                  class="text-muted"
                />
              </b-input-group-prepend>
              <b-form-input
                v-model="searchQuery"
                placeholder="Search..."
              />
            </b-input-group>
          </div>
        </div>

        <!-- ScrollArea: Chat & Contacts -->
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="chat-user-list-wrapper list-group scroll-area"
        >

          <!-- Chats Title -->
          <h4 class="chat-list-title">
            Chats
          </h4>

          <!-- Chats -->
          <ul class="chat-users-list chat-list media-list">
            <chat-contact
              v-for="contact in contacts"
              :key="contact.orderId"
              :user="contact"
              tag="li"
              @click="$emit('open-chat', contact.orderId)"
            />
          </ul>
<!-- @click="GetOrderId(contact.orderId)" -->
              <!-- :class="{'active': activeChatContactId === contact.id}"
              is-chat-contact -->


          <!-- Contacts Title -->
          <!-- <h4 class="chat-list-title">
            Contacts
          </h4>

          Contacts 
          <ul class="chat-users-list contact-list media-list">
            <chat-contact
              v-for="contact in filteredContacts"
              :key="contact.id"
              :user="contact"
              tag="li"
              @click="$emit('open-chat', contact.id)"
            />
          </ul> -->
        </vue-perfect-scrollbar>
      </div>

    </div>
  </div>
</template>

<script>
import {
  BAvatar, BInputGroup, BInputGroupPrepend, BFormInput,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { ref, computed,onMounted } from '@vue/composition-api'
import ChatContact from './ChatContact.vue'
import UserProfileSidebar from './UserProfileSidebar.vue'

export default {
  name:'Chat-Left',
  props:['id'],
  components: {

    // BSV
    BAvatar,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,

    // 3rd party
    VuePerfectScrollbar,

    // SFC
    ChatContact,
    UserProfileSidebar,
  },
  props: {
    chatsContacts: {
      type: Array,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
    shallShowUserProfileSidebar: {
      type: Boolean,
      required: true,
    },
    profileUserData: {
      type: Object,
      required: true,
    },
    profileUserMinimalData: {
      type: Object,
      required: true,
    },
    activeChatContactId: {
      type: Number,
      default: null,
    },
    mqShallShowLeftSidebar: {
      type: Boolean,
      required: true,
    },
  },
  // data()
  // {
  // return{
  // threats:[]
  
  // };
  
  // },

  // created()
  // {
  // this.LoadData();
  // },
 
//   methods:
//   {
//     GetOrderId(id)
//     {
//       console.log(id);
//       this.$emit('open-chat', id)
//     },
//    LoadData()
//    {
//        var axios = require('axios');

//   var config = {
//     method: 'get',
//     url: 'https://okaaik.fastech.pk/api/chats/GetThreatsbyvendor/'+ this.$store.state.userData.userID,
//     headers: {
//       'Authorization': 'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI'
//     }
//   };

//   axios(config)
//   .then( (response) => {
//     console.log(JSON.stringify(response.data));
   
//     //  this.data  =  response.data;
//      //console.log( response.data);
//      this.threats =[]
//      response.data.forEach(elem => {
//        elem.date = elem.date.split("T")[0];
//        this.threats.push(elem);
//      });
//    //  this.threats = ;
//    // console.log(this.threats);
// //   if(this.myProducts.data.length == 0)
// //    {
// //      this.productEmpty = true;
// //    }  
// })
//   .catch(function (error) {
//     if(error.response)
//     {

//     console.log(error.response.status);
      
//     }

//   });
//    }   
//   },
  setup(props) {
   
   
    onMounted( () => {
    
      
   console.log("myprop",props.contacts);
   })


    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    //const resolveChatContact = userId => props.contacts.find(contact => contact.id === userId)

    // Search Query
    const searchQuery = ref('')

    const matching  = computed(() => {
    return   props.contacts[0].userName.filter(name=> name.includes(searchQuery.value))
    })
    const searchFilterFunction = contact => contact.us .toLowerCase().includes(searchQuery.value.toLowerCase())
    const filteredChatsContacts = computed(() => props.contacts.filter(searchFilterFunction))
    const filteredContacts = computed(() => props.contacts.filter(searchFilterFunction))

    return {
      // Search Query
      searchQuery,
      filteredChatsContacts,
      filteredContacts,
      matching,
      // UI
      resolveChatContact,
      perfectScrollbarSettings,
    }
  },
}
</script>
