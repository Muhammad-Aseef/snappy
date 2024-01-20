<template>

  <section id="dashboard-ecommerce">
      <div class="mt-1 mr-1" style="margin-bottom: -10px">
          <b-row align-h="end">
            <b-col class="pl-2" cols="*" lg="*" md="*" sm="*">
              <div>
                <b-button variant="secondary">
                  <span class="text-nowrap"
                    >Pending
                    <b-badge variant="danger" class="badge-glow">
                      1
                    </b-badge></span
                  >
                </b-button>
              </div>
            </b-col>

            <b-col class="pl-2" cols="*" lg="*" md="*" sm="*">
              <div>
                <b-button variant="warning">
                  <span style="padding-left: 10px" class="text-nowrap">
                   Scheduled
                    <b-badge variant="danger" class="badge-glow">
                    2
                    </b-badge></span
                  >
                </b-button>
              </div>
            </b-col>

            <b-col class="pl-2" cols="*" lg="*" md="*" sm="*">
              <div>
                <b-button variant="success">
                  <span class="text-nowrap"
                    >Completed
                    <b-badge variant="danger" class="badge-glow">
                  3
                  </b-badge></span
                  >
                </b-button>
              </div>
            </b-col>
             <b-col class="pl-2" cols="*" lg="*" md="*" sm="*">
              <div>
                <b-button variant="danger">
                  <span class="text-nowrap"
                    >Cancelled
                    <b-badge variant="danger" class="badge-glow">
                   4
                   </b-badge></span
                  >
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
   <!-- default -->
  <!-- <b-row>
    <b-col
      xl="4"
      md="4"
    >
    <b-form-group>
      <flat-pickr
        placeholder="Select date range"
        class="form-control"
        :config="{ mode: 'range'}"
      />
    </b-form-group>
    </b-col>
  </b-row> -->
    <br>
      
    <b-row class="match-height">
      <b-col lg="8">
   <chartjs-bar-chart />
      </b-col>
      <!-- <b-col lg="4">
        <b-row class="match-height">
          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-order-chart :data="data.statisticsOrder" />
          </b-col>

          <b-col
            lg="6"
            md="3"
            cols="6"
            
          >
            <ecommerce-profit-chart :data="data.statisticsProfit" />
          </b-col>
        <b-col
          lg="12"
          md="6"
        >
          <ecommerce-earnings-chart :data="data.earningsChart" />
        </b-col>
        </b-row>
      </b-col>
      <b-col lg="4">
        <orderStatistics :data="data.orderStatistics" />
      </b-col> -->
      <!--/  order stats Card -->
      <!-- Orders Card -->
      <b-col lg="4">
        <dashboardOrders :data="data.dashboardOrders" />
      </b-col>
      <!--/ Orders Card -->
    </b-row>
    
    <b-row class="match-height">
      <b-col lg="6">
        <ecommerce-company-table :table-data="data.companyTable" />
      </b-col>
      <b-col lg="6">
        <ecommerce-company-table2 :table-data="data.companyTable" />
      </b-col>
      <!-- Top Selling Card -->
      
      <!--/ Top Selling Card -->

      <!-- Customer Leaderboard Card -->
      <!-- <b-col
       lg="4"
      >
        <ecommerce-browser-states />
      </b-col> -->
      <!--/ Customer Leaderboard Card -->

     
    </b-row>
    <b-row>
     <!-- New customers Card -->
      <b-col
       lg="12"
      >
        <newCustomers :data="data.newCustomers" />
      </b-col>
      <!--/  New customers Card-->
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol,BButton,BBadge } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import EcommerceBrowserStates from './EcommerceBrowserStates.vue'
//import EcommerceTransactions from './EcommerceTransactions.vue'
import EcommerceEarningsChart from './EcommerceEarningsChart.vue'
import EcommerceProfitChart from './EcommerceProfitChart.vue'
import EcommerceOrderChart from './EcommerceOrderChart.vue'
import EcommerceCompanyTable from './EcommerceCompanyTable.vue'
import DashboardOrders from './DashboardOrders.vue'
import OrderStatistics from './OrderStatistics.vue'
import NewCustomers from './NewCustomers.vue'
import flatPickr from 'vue-flatpickr-component'
import EcommerceCompanyTable2 from './EcommerceCompanyTable2.vue'
import ChartjsBarChart from './ChartjsBarChart.vue';

export default {
  components: {
    BRow,
    BCol,
    //EcommerceBrowserStates,
   // EcommerceEarningsChart,
    //EcommerceProfitChart,
    //EcommerceOrderChart,
    EcommerceCompanyTable,
    ChartjsBarChart,
    DashboardOrders,
    BButton,
    BBadge,
    EcommerceCompanyTable2,
    //OrderStatistics,
    NewCustomers,
    //flatPickr,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
    this.$http.get('/ecommerce/data')
      .then(response => {
        this.data = response.data

        // ? Your API will return name of logged in user or you might just directly get name of logged in user
        // ? This is just for demo purpose
        const userData = getUserData()
        this.data.congratulations.name = userData.fullName.split(' ')[0] || userData.username
      })
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
