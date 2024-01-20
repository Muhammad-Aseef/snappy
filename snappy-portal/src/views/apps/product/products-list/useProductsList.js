import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useProductsList() {
  // Use toast
  const toast = useToast()

  const refProductListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'name', sortable: true },
    { key: 'category', sortable: true },
    { key: 'description', sortable: true },
    { key: 'flavor', sortable: true },
    { key: 'size', sortable: true },
    { key: 'weight', sortable: true },
    { key: 'price', sortable: true },
    { key: 'serving', sortable: true },
    { key: 'actions' },
  ]
  const priceTableColumns = [
    {key: 'weight'},
    {key: 'size'},
    {key: 'serving'},
    {key: 'price'},
    {key: 'actions'},
  ]
  const perPage = ref(10)
  const totalProducts = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const dataMeta = computed(() => {
    const localItemsCount = refProductListTable.value ? refProductListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalProducts.value,
    }
  })

  const refetchData = () => {
    refProductListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchMyProducts = (ctx, callback) => {
    store
      .dispatch('app-product/fetchMyProducts', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
      })
      .then(response => {
        const { products, total } = response.data

        callback(products)
        totalProducts.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching product list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  return {
    fetchMyProducts,
    tableColumns,
    perPage,
    currentPage,
    totalProducts,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refProductListTable,

    refetchData,
  }
}
