import axios from '@axios'

export default {
  namespaced: true,
  state: {
  },
  getters: {},
  mutations: {},
  actions: {

    fetchMyOrders(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        // axios
        //   .get('/apps/order/orders', { params: queryParams })
        //   .then(response => resolve(response))
        //   .catch(error => reject(error))
        var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://okaaik.fastech.pk//api/oOrders/getoOrders',
    headers: {
      'Authorization': 'bearer 56EeZXfkyt2E4yYawlxCo3FFMZiFmhDs2VZbA9jLIfTs70L_z5gC9yAMCchwnNRUcicotXJNc3GcSB8M-T9i8PLd-HUMk4KXom3Uu_kC4kbFhSk02Z9YQRwZqVdXjECBVCA0gOhnVoRLztCFQxNgVJbeWEMubqzh8dFpvnkIoC_2FF0kyCzKbwj4SYtF1fMMyhy2CO8DOIWUTZtdpwpI-IjGB0CyHhav_I_ag72apOUtKKhAoshLdYfcFz3QBYC0Pj-FIyEbzz_S5Rcp9fiIG3y5UM6RtSf8zP08M42rVjkLHwOb5cc8YafdfFExhGFI'
    }
  };

  axios(config)
  .then( (response) => resolve(response))
    // console.log(JSON.stringify(response.data));
   
    //  this.data  =  response.data;
    // console.log( response.data);
 
  .catch(function (error) {
    console.log(error);
  });
      })
    },
    fetchMyOrder(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/order/orders/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  }
}
