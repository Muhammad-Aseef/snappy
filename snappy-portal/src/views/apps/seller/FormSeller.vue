<template>
  <b-row>
    <b-col cols="12">
      <div style="padding:40px">
      <registration-form />    
      </div> 
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import RegistrationForm from './RegistrationForm.vue'

export default {
  components: {
    BRow,
    BCol,
    RegistrationForm,
   
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
