import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useAllOrdersList() {
  // Use toast
  const toast = useToast()

  const refOrderListTable = ref(null)

  // Table Handlers
 
  const tableColumns = [
    { key: 'orderId', sortable: true },
    { key: 'customerId', sortable: true },
    { key: 'bill',  },
    { key: 'discount', },
    { key: 'modeOfpayment ',  },
    { key: 'date' },
    { key: 'netBill' },
    { key: 'totalBill' },
    
  ]
  const perPage = ref(10)
  const totalOrders = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('orderId')
  const isSortDirDesc = ref(true)

  // const dataMeta = computed(() => {
  //   const localItemsCount = refOrderListTable.value ? refOrderListTable.value.localItems.length : 0
  //   return {
  //     from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
  //     to: perPage.value * (currentPage.value - 1) + localItemsCount,
  //     of: totalOrders.value,
  //   }
  // })

  // const refetchData = () => {
  //   refOrderListTable.value.refresh()
  // }

  // watch([currentPage, perPage, searchQuery], () => {
  //   refetchData()
  // })

  // const fetchMyOrders = (ctx, callback) => {
  //   store
  //     .dispatch('app-order/fetchMyOrders', {
  //       q: searchQuery.value,
  //       perPage: perPage.value,
  //       page: currentPage.value,
  //       sortBy: sortBy.value,
  //       sortDesc: isSortDirDesc.value,
  //     })
  //     .then(response => {
  //       const { orders, total } = response.data;
  //       console.log(response.data);
  //       callback(orders)
  //       totalOrders.value = total
  //     })
  //     .catch(() => {
  //       toast({
  //         component: ToastificationContent,
  //         props: {
  //           title: 'Error fetching order list',
  //           icon: 'AlertTriangleIcon',
  //           variant: 'danger',
  //         },
  //       })
  //     })
  // }

  return {
    fetchMyOrders,
    tableColumns,
    perPage,
    currentPage,
    totalOrders,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refOrderListTable,

    refetchData,
  }
}
