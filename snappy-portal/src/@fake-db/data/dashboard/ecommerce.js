import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  congratulations: {
    name: 'John',
    saleToday: '48900',
  },
  statisticsItems: [
    {
      icon: 'TrendingUpIcon',
      color: 'light-primary',
      title: '230k',
      subtitle: 'Sales',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      icon: 'UserIcon',
      color: 'light-info',
      title: '8.549k',
      subtitle: 'Customers',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      icon: 'BoxIcon',
      color: 'light-danger',
      title: '1.423k',
      subtitle: 'Products',
      customClass: 'mb-2 mb-sm-0',
    },
    {
      icon: 'DollarSignIcon',
      color: 'light-success',
      title: '$9745',
      subtitle: 'Revenue',
      customClass: '',
    },
  ],
  statisticsOrder: {
    series: [
      {
        name: '2020',
        data: [45, 85, 65, 45, 65],
      },
    ],
  },
  statisticsProfit: {
    series: [
      {
        data: [0, 20, 5, 30, 15, 45],
      },
    ],
  },
  earningsChart: {
    series: [53, 16, 31],
  },
  revenue: {
    years: ['2020', '2019', '2018'],
    price: '25,852',
    budget: '56,800',
    revenueReport: {
      series: [
        {
          name: 'Earning',
          data: [95, 177, 284, 256, 105, 63, 168, 218, 72],
        },
        {
          name: 'Expense',
          data: [-145, -80, -60, -180, -100, -60, -85, -75, -100],
        },
      ],
    },
    budgetChart: {
      series: [
        {
          data: [61, 48, 69, 52, 60, 40, 79, 60, 59, 43, 62],
        },
        {
          data: [20, 10, 30, 15, 23, 0, 25, 15, 20, 5, 27],
        },
      ],
    },
  },
  companyTable: [
    {
      P_avatar: "https://dk0pm9zdlq16s.cloudfront.net/ac270385-146d-4301-b3df-5c73298cba3a.png",
      title: 'Al-Maktoum Stadium',
      category: 'Jumerah JBR',
      viewTitle: '23.4k',
      viewsub: 'in 24 hours',
      revenue: '891.2',
      sales: 'AED 50',
      loss: true,
    },
    {
      P_avatar: "https://dk0pm9zdlq16s.cloudfront.net/ac270385-146d-4301-b3df-5c73298cba3a.png",
      title: 'Iconic Fitness',
      category: 'Sharjah',
      viewTitle: '78k',
      viewsub: 'in 2 days',
      revenue: '668.51',
      sales: 'AED 97',
      loss: false,
    },
    {
      P_avatar: "https://dk0pm9zdlq16s.cloudfront.net/ac270385-146d-4301-b3df-5c73298cba3a.png",
      title: 'Padel Pro UAE',
      category: 'Abu Dhabi',
      viewTitle: '162',
      viewsub: 'in 5 days',
      revenue: '522.29',
      sales: 'AED 97',
      loss: false,
    },
    {
      P_avatar: "https://dk0pm9zdlq16s.cloudfront.net/ac270385-146d-4301-b3df-5c73298cba3a.png",
      title: 'Al-Maktoum Stadium',
      category: 'Jumerah JBR',
      viewTitle: '23.4k',
      viewsub: 'in 24 hours',
      revenue: '891.2',
      sales: 'AED 50',
      loss: true,
    },
  ],
  meetup: {
    mediaData: [
      { avatar: 'CalendarIcon', title: 'Sat, May 25, 2020', subtitle: '10:AM to 6:PM' },
      { avatar: 'MapPinIcon', title: 'Central Park', subtitle: 'Manhattan, New york City' },
    ],
    avatars: [
      { avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'), fullName: 'Billy Hopkins' },
      { avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'), fullName: 'Amy Carson' },
      { avatar: require('@/assets/images/portrait/small/avatar-s-8.jpg'), fullName: 'Brandon Miles' },
      { avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'), fullName: 'Daisy Weber' },
      { avatar: require('@/assets/images/portrait/small/avatar-s-20.jpg'), fullName: 'Jenny Looper' },
    ],
  },
  goalOverview: {
    completed: '786,617',
    inProgress: '13,561',
    series: [83],
  },
  transactionData: [
    {
      mode: 'Wallet',
      types: 'Starbucks',
      avatar: 'PocketIcon',
      avatarVariant: 'light-primary',
      payment: '-$74',
      deduction: true,
    },
    {
      mode: 'Bank Transfer',
      types: 'Add Money',
      avatar: 'CheckIcon',
      avatarVariant: 'light-success',
      payment: '+$480',
      deduction: false,
    },
    {
      mode: 'Paypal',
      types: 'Add Money',
      avatar: 'DollarSignIcon',
      avatarVariant: 'light-danger',
      payment: '+$480',
      deduction: false,
    },
    {
      mode: 'Mastercard',
      types: 'Ordered Food',
      avatar: 'CreditCardIcon',
      avatarVariant: 'light-warning',
      payment: '-$23',
      deduction: true,
    },
    {
      mode: 'Transfer',
      types: 'Refund',
      avatar: 'TrendingUpIcon',
      avatarVariant: 'light-info',
      payment: '+$98',
      deduction: false,
    },
  ],
  dashboardOrders: [
    {
      name: 'Abdul Rehman',
      amount: 'AED 554.5',
      avatarOrder: require('@/assets/images/avatars/Arabi.png'),
      deduction: true,
    },
    {
      name: 'Hamad Hasan',
      amount: 'AED 87.32',
      avatarOrder: require('@/assets/images/avatars/2.png'),
      deduction: true,
    },
    {
      name: 'Ebad Ali',
      amount: 'AED 126.4',
      avatarOrder: require('@/assets/images/avatars/13.png'),
      deduction: true,
    },
    {
      name: 'Ahmed Khan',
      amount: 'AED 87.32',
      avatarOrder: require('@/assets/images/avatars/12.png'),
      deduction: true,
    },
    {
      name: 'Hamad Hasan',
      amount: 'AED 87.32',
      avatarOrder: require('@/assets/images/avatars/2.png'),
      deduction: true,
    },
  ],
  orderStatistics: {
    completed: '786,617',
    inProgress: '13,561',
    series: [78],
  },
  newCustomers: [
    {
      avatar: require('@/assets/images/avatars/Arabi.png'),
      title: 'Ebad Ali',
      address: 'Abu Dhabi, P.O.Box 9966, Al Qouz, Dubai, UAE ',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      avatar: require('@/assets/images/avatars/2.png'),
      title: 'Hamad Qasam',
      address: 'Abu Dhabi, P.O.Box 9966, Al Qouz, Dubai, UAE ',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      avatar: require('@/assets/images/avatars/2.png'),
      title: 'Hamad Qasam',
      address: 'Abu Dhabi, P.O.Box 9966, Al Qouz, Dubai, UAE ',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      avatar: require('@/assets/images/avatars/2.png'),
      title: 'Hamad Qasam',
      address: 'Abu Dhabi, P.O.Box 9966, Al Qouz, Dubai, UAE ',
      customClass: 'mb-2 mb-xl-0',
    },
  ],
}
/* eslint-disable global-require */
mock.onGet('/ecommerce/data').reply(() => [200, data])
