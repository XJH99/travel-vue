import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

const Product = () => import('../pages/product/Product.vue')
const Editor = () => import('../pages/product/Editor.vue')
const Order = () => import('../pages/order/Order.vue')
const Detail = () => import('../pages/order/Detail.vue')
const User = () => import('../pages/user/User.vue')
const Role = () => import('../pages/role/Role.vue')
const Test = () => import('../pages/role/Test.vue')
const Permission = () => import('../pages/permission/Permission.vue')
/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes = [
  {
    path: '/product',
    component: Layout,
    //meta: {title: '产品管理',icon: 'message', affix: true},
    children: [
      {
        path: 'main',
        component: Product,
        name: 'product_list',
        meta: { title: '产品管理', icon: 'component', affix: true }
      },
      {
        hidden: true, //将导航隐藏起来
        path: 'editor',
        component: Editor,
        name: 'product_editor',
        meta: { title: '产品新增', icon: 'edit', affix: true }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'main',
        component: Order,
        name: 'order_list',
        meta: { title: '订单管理', icon: 'list', affix: true }
      },
      {
        hidden: true, //将导航隐藏起来
        path: 'detail',
        component: Detail,
        name: 'order_detail',
        meta: { title: '订单详情', icon: 'edit', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'main',
        component: User,
        name: 'user_list',
        meta: { title: '用户管理', icon: 'user', affix: true }
      },
      // {
      //   hidden: true, //将导航隐藏起来
      //   path: 'detail',
      //   component: Detail,
      //   name: 'order_detail',
      //   meta: { title: '订单详情', icon: 'edit', affix: true }
      // }
    ]
  },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'main',
        component: Role,
        name: 'role_list',
        meta: { title: '角色管理', icon: 'peoples', affix: true }
      },
      // {
      //   hidden: true, //将导航隐藏起来
      //   path: 'detail',
      //   component: Detail,
      //   name: 'order_detail',
      //   meta: { title: '订单详情', icon: 'edit', affix: true }
      // }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    children: [
      {
        path: 'main',
        component: Permission,
        name: 'permission_list',
        meta: { title: '权限管理', icon: 'list', affix: true }
      },
      // {
      //   hidden: true, //将导航隐藏起来
      //   path: 'detail',
      //   component: Detail,
      //   name: 'order_detail',
      //   meta: { title: '订单详情', icon: 'edit', affix: true }
      // }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'main',
        component: Test,
        name: 'test_list',
        meta: { title: '测试数据', icon: 'list', affix: true }
      },
      // {
      //   hidden: true, //将导航隐藏起来
      //   path: 'detail',
      //   component: Detail,
      //   name: 'order_detail',
      //   meta: { title: '订单详情', icon: 'edit', affix: true }
      // }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
