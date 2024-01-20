import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

/* eslint-disable global-require */

  const data = {
  orders: [


    ],
}
    // ------------------------------------------------
// GET: Return Orders
// ------------------------------------------------
mock.onGet('https://okaaik.fastech.pk//api/oOrders/getoOrders').reply(config => {
  

  
  
  // // eslint-disable-next-line object-curly-newline
    const {
      q = '',
      perPage = 10,
      page = 1,
      sortBy = 'orderId',
      sortDesc = false,
    } = config.params
    /* eslint-enable */


    const queryLowered = q.toLowerCase()
    const filteredData = data.orders
    /* eslint-enable  */

    const sortedData = filteredData.sort(sortCompare(sortBy))
    if (sortDesc) sortedData.reverse()
  


    return  [
      200,
      {
        orders: paginateArray(sortedData, perPage, page),
        total: filteredData.length,

      },

    ]

  })

  // ------------------------------------------------
  // POST: Add new order
  // ------------------------------------------------
  mock.onPost('/apps/order/orders').reply(config => {
    // Get event from post data
    const { order } = JSON.parse(config.data)

    // Assign Status

    const { length } = data.orders
    let lastIndex = 0
    if (length) {
      lastIndex = data.orders[length - 1].id
    }
    order.id = lastIndex + 1

    data.orders.push(order)

    return [201, { order }]
  })

  // ------------------------------------------------
  // GET: Return Single order
  // ------------------------------------------------
  mock.onGet(/\/apps\/order\/orders\/\d+/).reply(config => {
    // Get event id from URL
    let orderID = config.url.substring(config.url.lastIndexOf('/') + 1)

    // Convert Id to number
    orderID = Number(orderID)

    const orderIndex = data.orders.findIndex(e => e.id === orderID)
    const order = data.orders[orderIndex]

    if (order) return [200, order]
    return [404]
  })
