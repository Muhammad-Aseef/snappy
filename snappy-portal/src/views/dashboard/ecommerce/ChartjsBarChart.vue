<template>
  <b-card no-body>
    <b-container v-if="loading">
      <b-row style="margin-top: 200px" class="text-center" align-v="center">
        <b-col>
          <b-spinner class="p-2" type="grow" variant="danger"></b-spinner>
        </b-col>
      </b-row>
    </b-container>
    <!-- <div  class="text-center">
<div  class="d-block">
          <b-spinner class="p-2" type="grow" variant="danger"></b-spinner>
</div>
 </div> -->
    <div v-if="loading == false">
      <b-card-header>
        <b-card-title>Sales Statistics</b-card-title>
        <b-button-group class="mt-1 mt-sm-0">
          <b-button
            @click="Buttons('week')"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-primary"
          >
            This week
          </b-button>
          <b-button
            @click="Buttons('month')"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-primary"
          >
            This month
          </b-button>
          <b-button
            @click="Buttons('3month')"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-primary"
          >
            3 months
          </b-button>
          <b-button
            @click="Buttons('year')"
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-primary"
          >
            Last year
          </b-button>
        </b-button-group>
        <!-- datepicker -->
        <div class="d-flex align-items-center">
          <feather-icon icon="CalendarIcon" size="16" />
          <flat-pickr
            v-model="rangePicker"
            :config="{ mode: 'range' }"
            class="form-control flat-picker bg-transparent border-0 shadow-none"
            placeholder="YYYY-MM-DD"
            @on-change="GetData()"
            @on-open="Clear()"
          />
        </div>
        <!-- datepicker -->
      </b-card-header>

      <!-- chart -->
      <b-card-body>
        <chartjs-component-bar-chart
          :height="400"
          :data="chartjsData.latestBarChart.data"
          :options="chartjsData.latestBarChart.options"
        />
      </b-card-body>
    </div>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BSpinner,
  BRow,
  BCol,
  BContainer,
  BButton,
} from 'bootstrap-vue';
import flatPickr from 'vue-flatpickr-component';
import ChartjsComponentBarChart from './charts-components/ChartjsComponentBarChart.vue';
import chartjsData from './chartjsData';
import { $themeColors } from '@themeConfig';
import { methods } from 'vue-echarts';
export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    flatPickr,
    BButton,
    BRow,
    BCol,
    ChartjsComponentBarChart,
    BSpinner,
    BContainer,
  },
  data() {
    return {
      loading: false,
      // rangePicker:'',
      maxVal: 0,
      minVal: 0,
      from: '',
      to: '',
      primaryColorShade: '#FF5A60',
      chartjsData,
      rangePicker: [],
    };
  },
  created() {
    cosnole.log('Helooo');

    //  cosnole.log( "Helooo",this.chartjsData.latestBarChart.data);
  },
  methods: {
    Buttons(dayOrWeek) {
      this.loading = true;

      console.log(dayOrWeek);
      var myObj = {
        vendorId: this.$store.state.userData.userID,
        type: this.$store.state.userData.typeC,
        from: '0001-01-01',
        to: '0001-01-01',
        MonthOrWeek: dayOrWeek,
      };
      console.log(myObj);
      var axios = require('axios');

      var config = {
        method: 'post',
        url: 'https://brandaway.fastech.pk/api/Dashboard/BarChart',
        headers: {
          Authorization: this.$store.state.userData.token,
        },
        data: myObj,
      };

      axios(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));

          //  this.data  =  response.data;
          console.log(response.data);
          if (response.data.status === 'success') {
            console.log('Hello', response.data.sales);
            var max = 0;
            max = Math.max.apply(null, response.data.sales);
            console.log(max);
            this.chartjsData.latestBarChart.options.scales.yAxes[0].ticks.max = 0;
            this.chartjsData.latestBarChart.options.scales.yAxes[0].ticks.max =
              max;

            console.log(
              'MyMaximum',
              this.chartjsData.latestBarChart.options.scales.yAxes[0].ticks.max,
            );
            //  response.data.sales.forEach(item => {
            //     this.maxVal = Math.max.apply(Math, item);
            //     this.minVal = Math.min.apply(Math, item);
            //  });
            // console.log(this.maxVal,this.minVal);
            //this.data = response.data;
            this.chartjsData.latestBarChart.data.labels = [];
            this.chartjsData.latestBarChart.data.labels = response.data.mydays;
            this.chartjsData.latestBarChart.data.datasets[0].data = [];
            this.chartjsData.latestBarChart.data.datasets[0].data =
              response.data.sales;
            //console.log( "Null",this.chartjsData.latestBarChart.data.datasets[0].data);
            this.loading = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    Clear() {
      this.rangePicker = [];
    },
    GetData() {
      if (this.rangePicker.length > 0) {
        this.loading = true;

        var splited = this.rangePicker.split(' to ');
        this.from = splited[0];
        this.to = splited[1];
        var myObj = {
          vendorId: this.$store.state.userData.userID,
          type: this.$store.state.userData.typeC,
          from: this.from,
          to: this.to,
        };

        var axios = require('axios');

        var config = {
          method: 'post',
          url: 'https://brandaway.fastech.pk/api/Dashboard/BarChart',
          headers: {
            Authorization: this.$store.state.userData.token,
          },
          data: myObj,
        };

        axios(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));

            //  this.data  =  response.data;
            console.log(response.data);
            if (response.data.status === 'success') {
              var max = 0;
              max = Math.max.apply(null, response.data.sales);
              console.log(max);
              this.chartjsData.latestBarChart.options.scales.yAxes[0].ticks.max = 0;
              this.chartjsData.latestBarChart.options.scales.yAxes[0].ticks.max =
                max;

              console.log(
                'MyMaximum',
                this.chartjsData.latestBarChart.options.scales.yAxes[0].ticks
                  .max,
              );
              //  response.data.sales.forEach(item => {
              //     this.maxVal = Math.max.apply(Math, item);
              //     this.minVal = Math.min.apply(Math, item);
              //  });
              // console.log(this.maxVal,this.minVal);
              //this.data = response.data;
              this.chartjsData.latestBarChart.data.labels = [];
              this.chartjsData.latestBarChart.data.labels =
                response.data.mydays;
              this.chartjsData.latestBarChart.data.datasets[0].data = [];
              this.chartjsData.latestBarChart.data.datasets[0].data =
                response.data.sales;
              //console.log( "Null",this.chartjsData.latestBarChart.data.datasets[0].data);
              this.loading = false;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
