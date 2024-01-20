<template>
 <div>
   <account-info :username="user.username" />
 </div>
</template>
 
<script>
import AccountInfo from "@/components/AccountInfo.vue";
 
export default {
 components: {
   AccountInfo
 },
 data() {
   return {
     user: {
       username: 'matt'
     }
   }
 }
}
</script>