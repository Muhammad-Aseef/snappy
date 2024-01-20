import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

/* eslint-disable global-require */

const data = {
    products: [
      {
        id: 1,
        name: 'Product1',
        image_url: require('@/assets/images/elements/Unicorn-Cake.jpg'),
        description: 'Chocolate cake gingerbread cookie pastry lemon drops.',
        flavor: 'chocolate',
        size: '9"',
        weight: '1.12 kg',
        price: 'AED 11.83',
        serving: '11',
        category: 'category1',
      },
      {
        id: 2,
        name: 'Product2',
        image_url: require('@/assets/images/elements/Unicorn-Cake.jpg'),
        description: 'Oreo cake gingerbread cookie pastry lemon drops.',
        flavor: 'oreo',
        size: '9"',
        weight: '1.9 kg',
        price: 'AED 17.54',
        serving: '11',
        category: 'category2',
      },
      {
        id: 2,
        name: 'Product3',
        image_url: require('@/assets/images/elements/Unicorn-Cake.jpg'),
        description: 'Coffee cake gingerbread cookie pastry lemon drops.',
        flavor: 'coffee',
        size: '10"',
        weight: '2.1 kg',
        price: 'AED 12.43',
        serving: '11',
        category: 'category2',
      },
    ],
}
    // ------------------------------------------------
// GET: Return Products
// ------------------------------------------------
mock.onGet('/apps/product/products').reply(config => {
    // eslint-disable-next-line object-curly-newline
    const {
      q = '',
      perPage = 10,
      page = 1,
      sortBy = 'id',
      sortDesc = false,
      category  = null,
    } = config.params
    /* eslint-enable */
  
    const queryLowered = q.toLowerCase()
    const filteredData = data.products
    /* eslint-enable  */
  
    const sortedData = filteredData.sort(sortCompare(sortBy))
    if (sortDesc) sortedData.reverse()
  
    return [
      200,
      {
        products: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      },
    ]
  })
  
  // ------------------------------------------------
  // POST: Add new product
  // ------------------------------------------------
  mock.onPost('/apps/product/products').reply(config => {
    // Get event from post data
    const { product } = JSON.parse(config.data)
  
    // Assign Status
  
    const { length } = data.products
    let lastIndex = 0
    if (length) {
      lastIndex = data.products[length - 1].id
    }
    product.id = lastIndex + 1
  
    data.products.push(product)
  
    return [201, { product }]
  })
  
  // ------------------------------------------------
  // GET: Return Single product
  // ------------------------------------------------
  mock.onGet(/\/apps\/product\/products\/\d+/).reply(config => {
    // Get event id from URL
    let productID = config.url.substring(config.url.lastIndexOf('/') + 1)
  
    // Convert Id to number
    productID = Number(productID)
  
    const productIndex = data.products.findIndex(e => e.id === productID)
    const product = data.products[productIndex]
  
    if (product) return [200, product]
    return [404]
  })
  