export const asyncRoute = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'List',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCart',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'Management',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'Spu',
          icon: 'SetUp',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'Sku',
          icon: 'ScaleToOriginal',
        },
      },
    ],
  },
]

export const anyRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
  },
}

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      // 路由标题在菜单中是否隐藏
      hidden: true,
    },
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    // 当访问 / 的时候，直接重定向到 /home 路由
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
  // 数据大屏
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform',
    },
  },
  {
    path: '/stock',
    component: () => import('@/layout/index.vue'),
    name: 'Stock',
    meta: {
      title: '股票管理',
      hidden: false,
      icon: 'Present',
    },
    redirect: '/stock/home',
    children: [
      {
        path: '/stock/home',
        component: () => import('@/views/stock/home/index.vue'),
        name: 'StockHome',
        meta: {
          title: '股票首页',
          icon: 'Soccer',
        },
      },
      {
        path: '/stock/trade',
        component: () => import('@/views/stock/trade/index.vue'),
        name: 'StockTrade',
        meta: {
          title: '股票交易榜',
          icon: 'Flag',
        },
      },
      {
        path: '/stock/upDown',
        component: () => import('@/views/stock/upDown/index.vue'),
        name: 'StockUpDown',
        meta: {
          title: '涨停跌停',
          icon: 'Sunny',
        },
      },
      {
        path: '/stock/detail',
        component: () => import('@/views/stock/detail/index.vue'),
        name: 'StockDetail',
        meta: {
          title: '股票详情',
          icon: 'ReadingLamp',
        },
      },
    ],
  },
  // 权限管理 和 商品管理 集合
  // ...asyncRoute,
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]
