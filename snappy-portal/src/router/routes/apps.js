export default [
  {
    path: "/apps/calendar",
    name: "apps-calendar",
    component: () => import("@/views/pages/account-setting/AccountSetting.vue"),
  },

  // *===============================================---*
  // *--------- EMAIL & IT'S FILTERS N LABELS -------------------------------*
  // *=============================================---*
  {
    path: "/apps/email",
    name: "apps-email",
    component: () => import("@/views/apps/email/Email.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "email-application",
    },
  },
  {
    path: "/apps/email/:folder",
    name: "apps-email-folder",
    component: () => import("@/views/apps/email/Email.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "email-application",
      navActiveLink: "apps-email",
    },
    beforeEnter(to, _, next) {
      if (["sent", "draft", "starred", "spam", "trash"].includes(to.params.folder)) next();
      else next({ name: "error-404" });
    },
  },
  {
    path: "/apps/email/label/:label",
    name: "apps-email-label",
    component: () => import("@/views/apps/email/Email.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "email-application",
      navActiveLink: "apps-email",
    },
    beforeEnter(to, _, next) {
      if (["personal", "company", "important", "private"].includes(to.params.label)) next();
      else next({ name: "error-404" });
    },
  },

  // *===============================================---*
  // *--------- TODO & IT'S FILTERS N TAGS ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/todo",
    name: "apps-todo",
    component: () => import("@/views/pages/miscellaneous/ComingSoon.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "todo-application",
    },
  },
  {
    path: "/apps/todo/:filter",
    name: "apps-todo-filter",
    component: () => import("@/views/apps/todo/Todo.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "todo-application",
      navActiveLink: "apps-todo",
    },
    beforeEnter(to, _, next) {
      if (["important", "completed", "deleted"].includes(to.params.filter)) next();
      else next({ name: "error-404" });
    },
  },
  {
    path: "/apps/todo/tag/:tag",
    name: "apps-todo-tag",
    component: () => import("@/views/apps/todo/Todo.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "todo-application",
      navActiveLink: "apps-todo",
    },
    beforeEnter(to, _, next) {
      if (["team", "low", "medium", "high", "update"].includes(to.params.tag)) next();
      else next({ name: "error-404" });
    },
  },

  // *===============================================---*
  // *--------- CHAT  ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/chat",
    name: "apps-chat",
    component: () => import("@/views/apps/chat/Chat.vue"),
    meta: {
      contentRenderer: "sidebar-left",
      contentClass: "chat-application",
    },
  },
  {
    path: "/apps/kitchens",
    name: "apps-categories",
    component: () => import("@/views/apps/categories/Categories.vue"),
  },
  {
    path: "/apps/subscriptions/:id",
    name: "apps-subscriptions",
    component: () => import("@/views/apps/categories/subscriptions.vue"),
  },
  {
    path: "/apps/country",
    name: "apps-country",
    component: () => import("@/views/apps/zonemanagement/country.vue"),
  },

  {
    path: "/apps/regions",
    name: "apps-regions",
    component: () => import("@/views/apps/regions/regions.vue"),
  },
  {
    path: "/apps/history",
    name: "apps-banners",
    component: () => import("@/views/apps/banners/banners.vue"),
  },
  {
    path: "/apps/occasions/:id",
    name: "apps-occasions",
    component: () => import("@/views/apps/occasions/occasions.vue"),
  },
  {
    path: "/apps/gift",
    name: "apps-gift",
    component: () => import("@/views/apps/gift/gift.vue"),
  },
  {
    path: "/apps/font",
    name: "apps-font",
    component: () => import("@/views/apps/font/font.vue"),
  },
  {
    path: "/apps/promocode",
    name: "apps-promocode",
    component: () => import("@/views/apps/promocode/promocode.vue"),
  },
  {
    path: "/apps/order/:id",
    name: "apps-orderstatus",
    component: () => import("@/views/apps/orderstatus/orderstatus.vue"),
  },
  {
    path: "/apps/subcategories",
    name: "apps-subcategories",
    component: () => import("@/views/apps/subcategories/SubCategories.vue"),
  },
  {
    path: "/apps/myuser",
    name: "apps-myuser",
    component: () => import("@/views/apps/myuser/myuser.vue"),
  },
  {
    path: "/apps/vendors",
    name: "apps-vendor",
    component: () => import("@/views/apps/vendors/myvendors.vue"),
  },
  {
    path: "/apps/zonemanagement",
    name: "apps-zonemanagement",
    component: () => import("@/views/apps/zonemanagement/zonemanagement.vue"),
  },
  {
    path: "/apps/pricemanagement",
    name: "apps-pricemanagement",
    component: () => import("@/views/apps/pricemanagement/pricemanagement.vue"),
  },
  {
    path: "/apps/payout",
    name: "apps-payout",
    component: () => import("@/views/apps/payout/payout.vue"),
  },
  {
    path: "/apps/manageads",
    name: "apps-ads",
    component: () => import("@/views/apps/manageAds/ManageAds.vue"),
  },
  // *===============================================---*
  // *--------- ECOMMERCE  ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/e-commerce/shop",
    name: "apps-e-commerce-shop",
    component: () => import("@/views/apps/e-commerce/e-commerce-shop/ECommerceShop.vue"),
    meta: {
      contentRenderer: "sidebar-left-detached",
      contentClass: "ecommerce-application",
      pageTitle: "Shop",
      breadcrumb: [
        {
          text: "ECommerce",
        },
        {
          text: "Shop",
          active: true,
        },
      ],
    },
  },
  {
    path: "/apps/e-commerce/wishlist",
    name: "apps-e-commerce-wishlist",
    component: () => import("@/views/apps/e-commerce/e-commerce-wishlist/ECommerceWishlist.vue"),
    meta: {
      pageTitle: "Wishlist",
      contentClass: "ecommerce-application",
      breadcrumb: [
        {
          text: "ECommerce",
        },
        {
          text: "Wishlist",
          active: true,
        },
      ],
    },
  },
  {
    path: "/apps/e-commerce/checkout",
    name: "apps-e-commerce-checkout",
    component: () => import("@/views/apps/e-commerce/e-commerce-checkout/ECommerceCheckout.vue"),
    meta: {
      pageTitle: "Checkout",
      contentClass: "ecommerce-application",
      breadcrumb: [
        {
          text: "ECommerce",
        },
        {
          text: "Checkout",
          active: true,
        },
      ],
    },
  },
  {
    path: "/apps/e-commerce/:slug",
    name: "apps-e-commerce-product-details",
    component: () => import("@/views/apps/e-commerce/e-commerce-product-details/ECommerceProductDetails.vue"),
    meta: {
      pageTitle: "Product Details",
      contentClass: "ecommerce-application",
      breadcrumb: [
        {
          text: "ECommerce",
        },
        {
          text: "Shop",
          active: true,
        },
        {
          text: "Product Details",
          active: true,
        },
      ],
    },
  },

  // *===============================================---*
  // *--------- USER ---- ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/users/list",
    name: "apps-users-list",
    component: () => import("@/views/apps/user/users-list/UsersList.vue"),
  },
  {
    path: "/apps/users/view/:id",
    name: "apps-users-view",
    component: () => import("@/views/apps/user/users-view/UsersView.vue"),
  },
  {
    path: "/apps/users/edit/:id",
    name: "apps-users-edit",
    component: () => import("@/views/apps/user/users-edit/UsersEdit.vue"),
  },

  // Invoice
  {
    path: "/apps/invoice/list",
    name: "apps-invoice-list",
    component: () => import("@/views/apps/invoice/invoice-list/InvoiceList.vue"),
  },
  {
    path: "/apps/invoice/preview/:id",
    name: "apps-invoice-preview",
    component: () => import("@/views/apps/invoice/invoice-preview/InvoicePreview.vue"),
  },
  {
    path: "/apps/invoice/add/",
    name: "apps-invoice-add",
    component: () => import("@/views/apps/invoice/invoice-add/InvoiceAdd.vue"),
  },
  {
    path: "/apps/invoice/edit/:id",
    name: "apps-invoice-edit",
    component: () => import("@/views/apps/invoice/invoice-edit/InvoiceEdit.vue"),
  },

  // *===============================================---*
  // *--------- PRODUCT ---- ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/products/list",
    name: "apps-products-list",
    component: () => import("@/views/apps/product/products-list/ProductsList.vue"),
  },

  {
    path: "/apps/products/view/:id",
    name: "apps-products-view",
    component: () => import("@/views/apps/product/products-view/ProductsView.vue"),
  },
  {
    path: "/apps/products/edit/:id",
    name: "apps-products-edit",
    component: () => import("@/views/apps/product/products-edit/ProductsEdit.vue"),
  },
  {
    path: "/apps/products/add",
    name: "apps-products-add",
    component: () => import("@/views/apps/product/products-add/ProductAdd.vue"),
  },
  {
    path: "/apps/allproducts/list",
    name: "apps-all-products",
    component: () => import("@/views/apps/allproduct/allproducts-list/AllProductsList.vue"),
  },
  {
    path: "/apps/allvendors/list",
    name: "apps-all-vendors",
    component: () => import("@/views/apps/allvendors/allvendors-list/AllVendorsList.vue"),
  },

  // *===============================================---*
  // *--------- ORDERS ---- ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/orders/list",
    name: "apps-orders-list",
    component: () => import("@/views/apps/order/orders-list/OrdersList.vue"),
  },
  {
    path: "/apps/allorders/list",
    name: "apps-all-orders",
    component: () => import("@/views/apps/allorders/allorders-list/AllOrdersList.vue"),
  },
  {
    path: "/apps/orders/view/:id",
    name: "apps-orders-view",
    component: () => import("@/views/apps/order/orders-view/OrdersView.vue"),
  },
  // *===============================================---*
  // *--------- SELLER FORM ---- ---------------------------------------*
  // *===============================================---*
  {
    path: "/apps/seller",
    name: "form-seller",
    component: () => import("@/views/apps/seller/FormSeller.vue"),
    meta: {
      pageTitle: "Form Seller",
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
      // breadcrumb: [
      //   {
      //     text: 'Forms',
      //   },
      //   {
      //     text: 'Form Seller',
      //     active: true,
      //   },
      // ],
    },
  },
];
