<template>
  <div class="chats">
    <div
      v-for="msgGrp in chatData"
     :key="msgGrp.id"
      class="chat"
      :class="{'chat-left': msgGrp.sentBy === true  }"
    >
     <!-- :key="msgGrp.senderId+String(index)" -->
    <!-- :class="{'chat-left': msgGrp.senderId === formattedChatData.contact.id}"
      -->

      <div class="chat-avatar">
       
           <b-avatar  size="36" class="avatar-border-2 box-shadow-1"   variant="light-danger" :src="msgGrp.sentBy === true ?  profileUserAvatar.charAt(0).toUpperCase() : msgGrp.logo" ></b-avatar>
      </div>
      
      <!-- :src="msgGrp.senderId === formattedChatData.contact.id ? formattedChatData.contact.avatar : profileUserAvatar" -->
      <!-- <div class="chat-body">
        <div
          v-for="msgData in msgGrp.messages"
          :key="msgData.time"
          
        >
          <p>{{ msgData.msg }}</p>
         
        </div>
      </div> -->
        <div class="chat-body">
        <div>
          <p v-if="msgGrp.type === true" class="chat-content">{{ msgGrp.message }}</p>
       <div  v-if="msgGrp.type === false" style = "background-color: #FFFFFF; border-radius: 10px; padding: 8px; width:300px; margin-left:10px; ">
         <b-img  height="300" rounded alt=" cake" :src="msgGrp.message" />
       </div> 
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import { computed , onMounted } from '@vue/composition-api'
import { BAvatar } from 'bootstrap-vue'
import { BImg } from 'bootstrap-vue'

export default {
  components: {
    BAvatar,
     BImg,
  },

  props: {
    chatData: {
      type: Array,
      required: true,
    },
    profileUserAvatar: {
      type: String,
      required: true,
    },
  },
  
  setup(props) 
  {
    onMounted( () => {
    console.log("mychatLLog", props.chatData);
  
   
    // const formattedChatData = computed(() => {
    //   const contact = {
    //     id: props.chatData.contact.id,
    //     avatar: props.chatData.contact.avatar,
    //   }

    //   let chatLog = []
    //   if (props.chatData.message) {
    //     chatLog = props.chatData.chat.chat
    //    // console.log("Osama");
    //   }

    //   const formattedChatLog = []
    //   let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : undefined
    //   let msgGroup = {
    //     sender: chatMessageSenderId,
    //     messages: [],
    //   }

    //   chatLog.forEach((msg, index) => {
    //     if (chatMessageSenderId === msg.senderId) {
    //       msgGroup.messages.push({
    //         msg: msg.message,
    //         time: msg.time,
    //       })
    //     } else {
    //       chatMessageSenderId = msg.senderId
    //       formattedChatLog.push(msgGroup)
    //       msgGroup = {
    //         senderId: msg.senderId,
    //         messages: [{
    //           msg: msg.message,
    //           time: msg.time,
    //         }],
    //       }
    //     }
    //     if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    //   })

    //   return {
    //     formattedChatLog,
    //     contact,
    //     profileUserAvatar: props.profileUserAvatar,
    //   }
    // })

   
   
   })
      
    return {
     // formattedChatData,
     profileUserAvatar : props.profileUserAvatar
    }

   
  },
}
</script>

<style>

</style>
