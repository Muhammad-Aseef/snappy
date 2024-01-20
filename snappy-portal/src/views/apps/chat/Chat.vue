<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit">
    <div
      class="body-content-overlay"
      :class="{'show': shallShowUserProfileSidebar || shallShowActiveChatContactSidebar || mqShallShowLeftSidebar}"
      @click="mqShallShowLeftSidebar=shallShowActiveChatContactSidebar=shallShowUserProfileSidebar=false"
    />

    <!-- Main Area -->


    <!-- Active Chat Contact Details Sidebar -->
    <!-- <chat-active-chat-content-details-sidedbar
      :shall-show-active-chat-contact-sidebar.sync="shallShowActiveChatContactSidebar"
      :contact="activeChat.contact || {}"
    /> -->

  <section class="chat-app-window">

      <!-- Start Chat Logo -->
      <div
        v-if="!Name"
        class="start-chat-area"
      >
        <div class="mb-1 start-chat-icon">
          <feather-icon
            icon="MessageSquareIcon"
            size="56"
          />
        </div>
        <h4
          class="sidebar-toggle start-chat-text"
          @click="startConversation"
        >
          View Conversation
        </h4>
      </div>

      <!-- Chat Content -->
      <div
        v-else
        class="active-chat"
      >
        <!-- Chat Navbar -->
        <div class="chat-navbar">
          <header class="chat-header">

            <!-- Avatar & Name -->
            <div class="d-flex align-items-center">

              <!-- Toggle Icon -->
              <div class="sidebar-toggle d-block d-lg-none mr-1">
                <feather-icon
                  icon="MenuIcon"
                  class="cursor-pointer"
                  size="21"
                  @click="mqShallShowLeftSidebar = true"
                />
              </div>

           <!-- <b-avatar size="42" button  variant="primary" :text="Name.charAt(0).toUpperCase()" class="align-baseline"></b-avatar>
               <h6 class="mb-0 ml-1">
                {{ Name }}
              </h6> -->
          <b-avatar size="42" button @click="onClick" variant="primary" :text="Name.charAt(0).toUpperCase()" class="align-baseline"></b-avatar>
    <div class="chat-info flex-grow-1 ml-1">
      <b-row>
      <b-col cols="6">
      <h5 class="mb-0 ">
        {{ Name }}
      </h5>

      </b-col>

      <b-col cols="6" >

      <h5 class="card-text text-danger" >
         {{"Order Id " + OrderId}}
      </h5>

      </b-col>
      </b-row>


       <!-- <p class="card-text text-truncate">
        {{ isChatContact ? user.chat.lastMessage.message : user.about }}
      </p> -->

     </div>


            </div>


            <!-- Contact Actions -->

            <div class="d-flex align-items-center float-right">
  <div>
    <div class="ml-1">
      <b-row>
      <b-col cols="12">
      <h5 class="mb-0 ">
        {{ Bakery }}
      </h5>

      </b-col>


      </b-row>

     </div>
     </div>

              <!-- <feather-icon
                icon="PhoneCallIcon"
                size="17"
                class="cursor-pointer d-sm-block d-none mr-1"
              />
              <feather-icon
                icon="ImageIcon"
                size="17"
                class="cursor-pointer d-sm-block d-none mr-1"
              />
              <feather-icon
                icon="SearchIcon"
                size="17"
                class="cursor-pointer d-sm-block d-none mr-50"
              />
              <div class="dropdown">
                <b-dropdown
                  variant="link"
                  no-caret
                  toggle-class="p-0"
                  right
                >
                  <template #button-content>
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="17"
                      class="align-middle text-body"
                    />
                  </template>
                  <b-dropdown-item>
                    View Contact
                  </b-dropdown-item>
                  <b-dropdown-item>
                    Mute Notifications
                  </b-dropdown-item>
                  <b-dropdown-item>
                    Block Contact
                  </b-dropdown-item>
                  <b-dropdown-item>
                    Clear Chat
                  </b-dropdown-item>
                  <b-dropdown-item>
                    Report
                  </b-dropdown-item>
                </b-dropdown>
              </div> -->
            </div>

          </header>
        </div>

        <!-- User Chat Area -->
        <vue-perfect-scrollbar
          ref="refChatLogPS"
          :settings="perfectScrollbarSettings"
          class=" user-chats scroll-area"
        >
          <chat-log
            :chatData="activeChat"
            :profile-user-avatar="Name"
          />


        </vue-perfect-scrollbar>

        <!-- Message Input -->
      <div>

        </div>
        <b-form
          class="chat-app-form"

        >
          <!-- <b-input-group class="input-group-merge form-send-message mr-1">
            <b-form-input
              v-model="chatInputMessage"
              placeholder="Enter your message"
            />
          </b-input-group>
          <b-button
            variant="primary"
            :disabled="check"
            @click="sendMessage()"
          >
            Send
          </b-button> -->
        </b-form>
      </div>
    </section>
    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <chat-left-sidebar
        :contacts="contacts"
        @open-chat="openChatOfContact"
      />
    </portal>
    <!-- :chats-contacts="chatsContacts"
        :contacts="contacts"
        :active-chat-contact-id="activeChat.contact ? activeChat.contact.id : null"
        :shall-show-user-profile-sidebar.sync="shallShowUserProfileSidebar"
        :profile-user-data="profileUserData"
        :profile-user-minimal-data="profileUserDataMinimal"
        :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
        @show-user-profile="showUserProfileSidebar"
         -->
  </div>
</template>

<script>
import store from '@/store'
import {
  ref, onUnmounted, nextTick,onMounted, computed
} from '@vue/composition-api'
import  { useStore } from 'vuex'
import {
  BAvatar, BDropdown, BDropdownItem, BForm, BInputGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import axios from 'axios'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
// import { formatDate } from '@core/utils/filter'
import { $themeBreakpoints } from '@themeConfig'
import { getCurrentInstance } from 'vue'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import ChatLeftSidebar from './ChatLeftSidebar.vue'
import chatStoreModule from './chatStoreModule'
import ChatActiveChatContentDetailsSidedbar from './ChatActiveChatContentDetailsSidedbar.vue'
import ChatLog from './ChatLog.vue'
import useChat from './useChat'

export default {
  components: {

    // BSV
    BAvatar,
    //BDropdown,
    //BDropdownItem,
    //BForm,
    //BInputGroup,
   // BFormInput,
    //BButton,

    // 3rd Party
    VuePerfectScrollbar,

    // SFC
    ChatLeftSidebar,
    //ChatActiveChatContentDetailsSidedbar,
    ChatLog,
  },
  // data:function()
  // {

  //   chats:[]
  //   //showchat:false,
  // },
//   created()
//   {
//   alert("Osama");
//   },

//   methods:
//   {
//     openChatOfOrder(e)
//     {
//       //console.log("Osama");
//        console.log(e);

//       var axios = require('axios');

//   var config = {
//     method: 'get',
//     url: 'https://okaaik.fastech.pk/api/chats/Getchatbyorder/'+ e,
//     headers: {
//       'Authorization': 'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI'
//     }
//   };
//   console.log(url);
//   axios(config)
//   .then( (response) => {
//     //console.log(JSON.stringify(response.data));
//   // console.log(this.chats);
//       this.chats  =  response.data;
//      console.log(this.chats);
//   //  this.threats = response.data;
//     //console.log(this.threats);
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
//     }
//   },
  setup(props,context)
  {
       //const store = useStore();
       //const id = computed(()=>  store.state.userData.userID );


    const CHAT_APP_STORE_MODULE_NAME = 'app-chat'

    // Register module
    if (!store.hasModule(CHAT_APP_STORE_MODULE_NAME)) store.registerModule(CHAT_APP_STORE_MODULE_NAME, chatStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CHAT_APP_STORE_MODULE_NAME)) store.unregisterModule(CHAT_APP_STORE_MODULE_NAME)
    })

  //   onMounted( () => {

  //    return console.log("Osama");

  //   //  let res = await axios.get(`https://okaaik.fastech.pk/api/chats/GetThreatsbyvendor/`+ id.value)
  //   //  console.log(res.data);
  //  });

    //const { resolveAvatarBadgeVariant } = useChat()

    // Scroll to Bottom ChatLog
    // const refChatLogPS = ref(null)
    // const scrollToBottomInChatLog = () => {
    //   const scrollEl = refChatLogPS.value.$el || refChatLogPS.value
    //   scrollEl.scrollTop = scrollEl.scrollHeight
    // }

    // ------------------------------------------------
    // Chats & Contacts
    // ------------------------------------------------
    const chatsContacts = ref([])
    const contacts = ref([])
    const mycontacts = ref([])



    const load  = async () => {
        try
        {
          console.log(context.root.$store.state.userData.userID);
          let data = await fetch('https://okaaik.fastech.pk/api/chats/GetAllThreats/')
          if(!data.ok)
          {

          }
          let mydata  = await data.json();
          mydata.forEach(elem => {
            elem.date = elem.date.split("T")[0];
            contacts.value.push(elem);
          });
          //contacts.value = mydata;
          console.log("OsamaCi",contacts.value);
          //console.log(contacts.value);


        }
        catch(err)
        {
          console.log(err)
        }




    }

load()
//openChatOfContact()
    // ------------------------------------------------
    // Single Chat
    // ------------------------------------------------
    const activeChat = ref({})
    const Name = ref('')
    const OrderId = ref('')
    const Bakery = ref('')
    const Logo = ref('')

    const chatInputMessage = ref('')
    const   openChatOfContact  = async orderId => {
      try
        {


          let data = await fetch('https://okaaik.fastech.pk/api/chats/Getchatbyorder/'+ orderId)
          if(!data.ok)
          {

          }
          let mydata  = await data.json()
          //contacts.value = mydata;
          activeChat.value = mydata;
          //console.log("OsamaCi",contacts.value);
          console.log(activeChat.value );
          Name.value = activeChat.value[0].userName ;
          OrderId.value = activeChat.value[0].orderId;
          Bakery.value =  activeChat.value[0].bakeryName;
          Logo.value =  activeChat.value[0].logo;

          console.log("---------",Name.value );

        }
        catch(err)
        {
          console.log(err)
        }

      // console.log(orderId);
      // Reset send message input value
      chatInputMessage.value = ''

      // store.dispatch('app-chat/getChat/')
      //   .then(response => {
      //    // activeChat.value = response.data
      //     console.log(response.data);
      //     // Set unseenMsgs to 0
      //     // const contact = chatsContacts.value.find(c => c.id === userId)
      //     // if (contact) contact.chat.unseenMsgs = 0

      //     // // Scroll to bottom
      //     // nextTick(() => { scrollToBottomInChatLog() })
      //   })

      // // if SM device =>  Close Chat & Contacts left sidebar
      // // eslint-disable-next-line no-use-before-define
       mqShallShowLeftSidebar.value = false
    }
    const check = ref(false)
    const sendMessage = () => {
          if(chatInputMessage.value == '')
          {
            return 0;
          }
      check.value = true;
      const payload = {
        orderId: activeChat.value[0].orderId,
        userId: activeChat.value[0].userId,
        vendorId: activeChat.value[0].vendorId,
        type:true,
        // eslint-disable-next-line no-use-before-define
        sentBy : false,
        message: chatInputMessage.value,
      }
       console.log("send",payload)
  try
        {
          //  main.js

          // POST request using fetch()
          fetch("https://okaaik.fastech.pk/api/chats/Postchat/", {

              // Adding method type
              method: "POST",

              // Adding body or contents to send
              body: JSON.stringify({
              orderId: activeChat.value[0].orderId,
              userId: activeChat.value[0].userId,
              vendorId: activeChat.value[0].vendorId,
              type:true,
              // eslint-disable-next-line no-use-before-define
              sentBy : false,
              message: chatInputMessage.value,
                }),

              // Adding headers to the request
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
          }).then(response => response.json() )

            // Displaying results to console
            .then(json => {

              if(json.status == "success")
              {
              check.value = false;
              console.log(json);
              chatInputMessage.value = '';
              openChatOfContact(activeChat.value[0].orderId);

              }
            });

        }
        catch(err)
        {
          console.log(err)
        }



    }

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    // User Profile Sidebar
    // ? Will contain all details of profile user (e.g. settings, about etc.)
    // const profileUserData = ref({})
    // // ? Will contain id, name and avatar & status
    // const profileUserDataMinimal = ref({})

    // const shallShowUserProfileSidebar = ref(false)
    // const showUserProfileSidebar = () => {
    //   store.dispatch('app-chat/getProfileUser')
    //     .then(response => {
    //       profileUserData.value = response.data
    //       shallShowUserProfileSidebar.value = true
    //     })
    // }

    // Active Chat Contact Details
    // const shallShowActiveChatContactSidebar = ref(false)

    // UI + SM Devices
    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()
    const startConversation = () => {
      if (store.state.app.windowWidth < $themeBreakpoints.lg) {
        mqShallShowLeftSidebar.value = true
      }
    }

    return {
      // Filters
      // formatDate,

      // useChat
      //resolveAvatarBadgeVariant,

      // Chat & Contacts
     // chatsContacts,
      contacts,
     Bakery,
     Logo,
      // Single Chat
     // refChatLogPS,
      activeChat,
      chatInputMessage,
      openChatOfContact,
      sendMessage,
      Name,
      OrderId,
      check,
      // Profile User Minimal Data
      ///profileUserDataMinimal,

      // User Profile Sidebar
      //profileUserData,
     // shallShowUserProfileSidebar,
      //showUserProfileSidebar,

      // Active Chat Contact Details
    //  shallShowActiveChatContactSidebar,

      // UI
     perfectScrollbarSettings,

      // UI + SM Devices
     startConversation,
     mqShallShowLeftSidebar,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";
</style>
